import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import scss from './BasketPage.module.scss';
import CustomPromoInput from '@/src/ui/customInpute/CustomPromoInput';
import { IconMinusIcon, IconPlus, IconX } from '@/src/assets/icons';
import CustomAuthButton from '@/src/ui/customButton/CustomAuthButton';
import { Modal } from 'antd';
import {
	useCountBookBasketMutation,
	useDeleteBookIdMutation,
	useDeleteClearBasketMutation,
	useGetCountInBasketQuery,
	useTotalCostQuery
} from '@/src/redux/api/basket';
import { ToastContainer, toast, Bounce } from 'react-toastify';
import { usePostFavoriteUnFavoriteMutation } from '@/src/redux/api/favorite';
// interface Book {
// 	id: number;
// 	bookName: string;
// 	author: string;
// 	image: string;
// 	promoCode: string;
// 	firstPrice: number;
// 	salePrice: number;
// 	quantity: number;
// }
const BasketPage: React.FC = () => {
	const [isPromo, setIsPromo] = useState(false);
	// const [promoValue, setPromoValue] = useState('');

	const { data } = useGetCountInBasketQuery();
	const [clearBookPage] = useDeleteClearBasketMutation();
	const [deleteBook] = useDeleteBookIdMutation();
	const [addToFavorite] = usePostFavoriteUnFavoriteMutation();
	const [countBookBasket] = useCountBookBasketMutation();
	const { data: TotalCost } = useTotalCostQuery();
	const [isModalVisible, setIsModalVisible] = useState(false);

	console.log(TotalCost);

	const showModal = () => {
		setIsModalVisible(true);
	};

	console.log(data);

	const handleDeleteBookId = async (id: number) => {
		await deleteBook(id);
	};

	const handleClearPage = async () => {
		await clearBookPage();
	};

	const handleCountBookDec = async (bookId: number) => {
		const addOrMinus = true;
		await countBookBasket({ bookId, addOrMinus });
	};
	const handleCountBookInc = async (bookId: number) => {
		const addOrMinus = false;
		await countBookBasket({ bookId, addOrMinus });
	};

	const func = (price: number, discount: number, amount: number) => {
		const amountDiscount = price * (discount / 100);
		const discountPrice = price - amountDiscount;
		const totalPrice = discountPrice * amount;
		return totalPrice.toFixed();
	};

	const handleAddToFavorite = async (id: number) => {
		const result = await addToFavorite(id);
		console.log(result);
		if ('data' in result) {
			if (result.data.httpStatus === 'OK') {
				toast(`${result.data.message}`, {
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
			} else if (result.data.httpStatus === 'CREATED') {
				toast(`${result.data.message}`, {
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

	const amountTotalDiscountPrice = (price: number, amount: number) => {
		const totalDiscount = price * amount;
		return totalDiscount;
	};

	// const totalPriceFunction = () => {};

	return (
		<section className={scss.BasketSection}>
			<div className="container">
				<div className={scss.content}>
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
							<div
								className={scss.delete_all}
								onClick={() => {
									handleClearPage();
								}}
							>
								Очистить корзину
							</div>
							<div className={scss.all_books_in_basket}>
								{data?.books.map((book) => (
									<>
										<hr />
										<div className={scss.card_container}>
											<div
												onClick={() => {
													handleDeleteBookId(book.id);
												}}
												className={scss.delete_x}
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
																					Промокод {book.discountFromPromoCode}%
																				</p>
																			</>
																		) : null}
																	</>
																) : (
																	<>
																		<p>Скидка {book.bookDisCount}%</p>
																	</>
																)}
															</div>
															<div
																className={scss.prices_with_sale}
																onMouseEnter={showModal}
															>
																{/* <div className={scss.hover_content}>
																	<div className={scss.info_price}>
																		<h1>asdasd</h1>
																	</div>
																</div> */}

																<Modal
																	onCancel={() => {
																		setIsModalVisible(false);
																	}}
																	footer={false}
																	visible={isModalVisible}
																>
																	<div className={scss.hover_content}>
																		<div className={scss.info_price}>
																			<div className={scss.countBook}>
																				<p>Количество книг</p>
																				<p>{book.amount} шт</p>
																				<p>{book.price}</p>
																				<p>{}</p>
																			</div>
																			<div className={scss.discountBook}>
																				<p>Скидка</p>
																				<p>{book.bookDisCount} %</p>
																			</div>
																		</div>
																	</div>
																</Modal>
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
														<p
															onClick={() => {
																setIsPromo(!isPromo);
															}}
														>
															промокод
														</p>
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
																<p>Напишите Промокод</p>
																<div className={scss.position_container}>
																	<CustomPromoInput placeholder="Введите промокод" />
																</div>
															</label>
														</div>
														<div className={scss.promo_btns}>
															<button>отмена</button>
															<button>Активировать</button>
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
											{/* {totalQuantity} */}
											шт
										</p>
									</div>
									<div className={scss.purchase}>
										<p>Скидка:</p>
										<p>{/* {discount} */}с</p>
									</div>
									<div className={scss.purchase}>
										<p>Сумма:</p>
										<p>{/* {totalSum} */}с</p>
									</div>
								</div>
								<div className={scss.promo_input}>
									{/* <CustomPromoInput placeholder={'Введите промокод'} /> */}
								</div>
								<div className={scss.total_price}>
									<p>Итого:</p>
									<p>{/* {overallTotal}  */}с</p>
								</div>
							</div>
							<CustomAuthButton onClick={() => {}}>
								Оформить заказ
							</CustomAuthButton>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};
export default BasketPage;
