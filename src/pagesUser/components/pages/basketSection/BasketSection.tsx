/* eslint-disable prefer-const */
/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import scss from './BasketPage.module.scss';
import CustomPromoInput from '@/src/ui/customInpute/CustomPromoInput';
import {
	IconMinusIcon,
	IconPlus,
	IconSuccess,
	IconX
} from '@/src/assets/icons';
import CustomAuthButton from '@/src/ui/customButton/CustomAuthButton';
import { Modal, Skeleton, Tooltip, message } from 'antd';
import {
	useActivedBookPromocodeMutation,
	useCountBookBasketMutation,
	useDeleteBasketBookIdMutation,
	useDeleteClearBasketMutation,
	useGetCountInBasketQuery,
	useTotalCostQuery
} from '@/src/redux/api/basket';
import { ToastContainer, toast, Bounce } from 'react-toastify';
import { usePostFavoriteUnFavoriteMutation } from '@/src/redux/api/favorite';
import { IconInfoCircle } from '@tabler/icons-react';
import Payment from '@/src/payment/Payment';

const BasketPage = () => {
	const [isPromo, setIsPromo] = useState(false);
	const { data, refetch } = useGetCountInBasketQuery();
	const [clearBookPage] = useDeleteClearBasketMutation();
	const [deleteBook] = useDeleteBasketBookIdMutation();
	const [addToFavorite] = usePostFavoriteUnFavoriteMutation();
	const [countBookBasket] = useCountBookBasketMutation();
	const [activePromo] = useActivedBookPromocodeMutation();
	const { data: TotalCost, isLoading } = useTotalCostQuery();
	const [isModalVisible, setIsModalVisible] = useState(false);
	const [promoCode, setPromoValue] = useState<string>('');
	const [bookId, setBookId] = useState<null | number>(null);
	const [isPayment, setIsPayment] = useState(false);
	const [amount, setAmount] = useState<number | undefined>(0);
	const [test, setTest] = useState<Record<string, string>>({});
	const [messageApi, contextMessage] = message.useMessage();

	const hadnleOpenModalPromo = () => {
		setIsPromo(!isPromo);
	};

	const handleDeleteBookId = async (id: number) => {
		await deleteBook(id);
	};

	const handleClearPage = async () => {
		if (data?.books.length === 0) {
			message.open({
				type: 'warning',
				content: 'Корзина пуста'
			});
		} else {
			await clearBookPage();
		}
	};

	const handleCountBookDec = async (bookId: number) => {
		const addOrMinus = true;
		const result = (await countBookBasket({
			bookId,
			addOrMinus
		})) as BASKET.CountBookBasketResponse;
		if (result.error) {
			messageApi.open({
				type: 'warning',
				content: result.error.data.message
			});
		}
	};

	const handleCountBookInc = async (bookId: number) => {
		const addOrMinus = false;
		const result = (await countBookBasket({
			bookId,
			addOrMinus
		})) as BASKET.CountBookBasketResponse;
		if (result.error) {
			messageApi.open({
				type: 'warning',
				content: result.error.data.message
			});
		}
	};

	const func = (price: number, discount: number, amount: number) => {
		const amountDiscount = price * (discount / 100);
		const discountPrice = price - amountDiscount;
		const totalPrice = discountPrice * amount;
		return totalPrice.toFixed();
	};

	const handlePromoCode = async () => {
		const response = (await activePromo({
			promoCode,
			id: bookId!
		})) as BASKET.ActivedPromoResponse;
		if ('data' in response) {
			if (response.data) {
				setIsPromo(false);
				setBookId(null);
				setIsModalVisible(true);
				let result: Record<string, string> = {};
				const bookId = response.data.bookId;
				result[bookId] = response.data.getPromoCode;
				setTest((prevState) => {
					return { ...prevState, ...result };
				});
			}
		}
		if (response.error) {
			messageApi.open({
				type: 'warning',
				content: response.error.data.message
			});
		}
	};

	const handleAddToFavorite = async (id: number) => {
		const result = await addToFavorite(id);
		console.log(result);
		if ('data' in result) {
			if (result.data!.httpStatus === 'OK') {
				toast(`${result.data!.message}`, {
					position: 'top-right',
					autoClose: 5000,
					hideProgressBar: false,
					closeOnClick: true,
					pauseOnHover: false,
					draggable: true,
					progress: undefined,
					theme: 'light',
					transition: Bounce
				});
			} else if (result.data!.httpStatus === 'CREATED') {
				toast(`${result.data!.message}`, {
					position: 'top-right',
					autoClose: 5000,
					hideProgressBar: false,
					closeOnClick: true,
					pauseOnHover: false,
					draggable: true,
					progress: undefined,
					theme: 'light',
					transition: Bounce
				});
			}
		}
	};
	useEffect(() => {
		if (isModalVisible) {
			setTimeout(() => {
				setIsModalVisible(false);
			}, 3000);
		}
	}, [isModalVisible]);

	useEffect(() => {
		setAmount(TotalCost?.totalAmount);
	}, [TotalCost]);

	const amountTotalDiscountPrice = (price: number, amount: number) => {
		const totalDiscount = price * amount;
		return totalDiscount;
	};

	return (
		<section className={scss.BasketSection}>
			<div className="container">
				<div className={scss.content}>
					{contextMessage}
					<ToastContainer />
					<div className={scss.links}>
						<Link
							to={'/'}
							className={`${scss.link_to_home} ${location.pathname === '/' ? scss.link_to_home_active : ''}`}
						>
							Главная
						</Link>
						/
						<Link
							to={'/basket'}
							className={`${scss.link_to_basket} ${location.pathname === 'basket' ? scss.link_to_basket_active : ''}`}
						>
							Корзина
						</Link>
					</div>
					<div className={scss.content}>
						<div className={scss.left_content}>
							<div className={scss.title}>
								<h2>Ваши книги</h2>
								<p>
									Всего:
									{data?.books.length}
									шт
								</p>
							</div>
							<hr />
							<div className={scss.delete_all}>
								<p
									onClick={() => {
										handleClearPage();
									}}
								>
									Очистить корзину
								</p>
							</div>
							<div className={scss.all_books_in_basket}>
								{data?.books.map((book) => (
									<>
										<hr key={book.id} />
										{isLoading ? (
											<>
												<Skeleton />
											</>
										) : (
											<>
												<div key={book.id} className={scss.card_container}>
													<div
														onClick={() => {
															handleDeleteBookId(book.id);
														}}
														className={scss.delete_x}
														key={book.id}
													>
														<IconX />
													</div>
													<div className={scss.book} key={book.id}>
														<div className={scss.book_img}>
															<img src={book.cover} alt={book.title} />
														</div>
														<div className={scss.more_info_book}>
															<div className={scss.book_info}>
																<h3>{book.title}</h3>
																<p>{book.authorsFullName}</p>
																<div className={scss.prices}>
																	<div>
																		{book.amount === 1 ? (
																			<>
																				{book.discountFromPromoCode !== 0 ? (
																					<>
																						<p>
																							Промокод{' '}
																							{book.discountFromPromoCode}%
																						</p>
																					</>
																				) : null}
																			</>
																		) : (
																			<>
																				{book.bookDisCount !== 0 ? (
																					<>
																						<p>Скидка {book.bookDisCount}%</p>
																					</>
																				) : null}
																			</>
																		)}
																	</div>
																	<div className={scss.prices_with_sale}>
																		<Modal
																			onCancel={() => {
																				setIsModalVisible(false);
																			}}
																			footer={false}
																			open={isModalVisible}
																		>
																			<div className={scss.hover_content}>
																				<div className={scss.info_price}>
																					<div className={scss.icon}>
																						<IconSuccess />
																					</div>
																					<div className={scss.countBook}>
																						<p>
																							Промокод успешно активирован на
																							одну книгу
																						</p>
																					</div>
																					<div
																						className={scss.discountBook}
																					></div>
																				</div>
																			</div>
																		</Modal>
																		{book.bookDisCount !== 0 ? (
																			<>
																				<p className={scss.first_price}>
																					{book.amount !== 1 ? (
																						<>
																							{amountTotalDiscountPrice(
																								book.price,
																								book.amount
																							)}
																						</>
																					) : null}
																				</p>
																			</>
																		) : null}
																		<p className={scss.sale_price}>
																			{book.amount !== 1 ? (
																				<>
																					{func(
																						book.price,
																						book.bookDisCount,
																						book.amount
																					)}
																				</>
																			) : (
																				book.price
																			)}{' '}
																			c
																		</p>
																	</div>
																</div>
																<div className={scss.book_quantity}>
																	{}
																	<button
																		onClick={() => {
																			handleCountBookInc(book.id);
																		}}
																	>
																		<IconMinusIcon />
																	</button>
																	<span>{book.amount}</span>
																	<button
																		onClick={() => {
																			handleCountBookDec(book.id);
																		}}
																	>
																		<IconPlus />
																	</button>
																</div>
															</div>
														</div>
													</div>
													<div className={scss.add_to_basket}>
														{book.discountFromPromoCode !== null ||
														book.discountFromPromoCode !== undefined ? (
															<>
																{book.amount >= 2 ? null : (
																	<>
																		<p
																			onClick={() => {
																				hadnleOpenModalPromo();
																				setBookId(book.id);
																			}}
																		>
																			Промокод
																		</p>
																	</>
																)}
															</>
														) : null}
														<Modal
															open={isPromo}
															onCancel={() => {
																setIsPromo(false);
															}}
															footer={false}
														>
															<div className={scss.modal_promo}>
																<div className={scss.promo_form}>
																	<label>
																		<div className={scss.info}>
																			<p>Напишите промокод</p>
																			<Tooltip
																				className={scss.info_hover}
																				title="Промокод работает только на одну книгу"
																				placement="right"
																			>
																				<span>
																					<IconInfoCircle />
																				</span>
																			</Tooltip>{' '}
																		</div>
																		<div className={scss.position_container}>
																			<CustomPromoInput
																				keyDownFunction={handlePromoCode}
																				placeholder="Введите промокод"
																				setValue={setPromoValue}
																				value={promoCode}
																			/>
																		</div>
																	</label>
																</div>
																<div className={scss.promo_btns}>
																	<button onClick={() => setIsPromo(false)}>
																		Отмена
																	</button>
																	<button
																		onClick={() => {
																			handlePromoCode();
																		}}
																	>
																		Активировать
																	</button>
																</div>
															</div>
														</Modal>
														<button
															onClick={() => {
																handleAddToFavorite(book.id);
															}}
														>
															<p>Добавить в избранное</p>
														</button>
													</div>
												</div>
											</>
										)}
									</>
								))}
							</div>
						</div>
						<div className={scss.right_content}>
							<div className={scss.total_price_content}>
								<p className={scss.title}>Общая стоимость</p>
								<div className={scss.purchases}>
									<div className={scss.purchase}>
										<p>Количество книг:</p>
										<p>
											{TotalCost?.numberOfBooks}
											шт
										</p>
									</div>
									<div className={scss.purchase}>
										<p>Скидка:</p>
										<p>{TotalCost?.disCount}с</p>
									</div>
									<div className={scss.purchase}>
										<p>Сумма:</p>
										<p>{TotalCost?.totalAmount}с</p>
									</div>
								</div>
								<div className={scss.promo_input}></div>
								<div className={scss.total_price}>
									<p>Итого:</p>
									<p>{TotalCost?.totalAmount} с</p>
								</div>
							</div>
							<CustomAuthButton
								onClick={() => {
									if (data?.books.length === 0) {
										message.open({
											type: 'warning',
											content: 'Корзина пуста'
										});
									} else {
										setIsPayment(true);
									}
								}}
							>
								Оформить заказ
							</CustomAuthButton>
						</div>
					</div>
					<Payment
						openModal={isPayment}
						setOpenModal={setIsPayment}
						totalAmount={amount}
						test={test}
						messageApi={messageApi}
						refetch={refetch}
					/>
				</div>
			</div>
		</section>
	);
};
export default BasketPage;
