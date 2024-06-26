import { FC, useState } from 'react';
import scss from './VendorsBooks.module.scss';
import { IconPencil } from '@tabler/icons-react';
import girl_img from '../../../../assets/img/Knowledgecuate.png';

import { useNavigate } from 'react-router-dom';
import { IconArrowBottom, IconDelete, IconWhiteLike } from '@/src/assets/icons';
import ThreeDotIcon from '@/src/assets/icons/icon-threeDot';
import {
	useDeleteBookMutation,
	useGetFindAllBookVedorQuery
} from '@/src/redux/api/book';
import CustomSeeMoreButton from '@/src/ui/customButton/CustomSeeMoreButton';
import { Modal, Tooltip } from 'antd';
// interface Book {
// 	id: number;
// 	bookName: string;
// 	publishedYear: number;
// 	price: number;
// 	imageLink: string;
// 	quantityOfFavorite: number;
// 	quantityOfBasket: number;
// }

const VendorsBooks: FC = () => {
	const [isOpen, setIsOpen] = useState<boolean>(false);
	const [bookId, setBookId] = useState<null | number>(null);
	const navigate = useNavigate();
	const [sortSelected, setSortSelected] = useState('ALL');
	const [isOpenBooksType, setIsOpenBooksType] = useState(false);
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [sizePage, setSizePage] = useState(12);
	const [sortBookData] = useState([
		{
			id: 1,
			sort: 'ALL',
			sortName: 'Все'
		},
		{
			id: 2,
			sort: 'IN_FAVORITE',
			sortName: 'В избранном'
		},
		{
			id: 3,
			sort: 'IN_BASKET',
			sortName: 'В корзине'
		},
		{
			id: 4,
			sort: 'SOLD',
			sortName: 'Проданы'
		},
		{
			id: 5,
			sort: 'WITH_DISCOUNT',
			sortName: 'Со скидками'
		}
	]);

	const { data: booksData, isLoading } = useGetFindAllBookVedorQuery({
		bookOperationType: sortSelected,
		page: 1,
		pageSize: sizePage
	});

	const [deleteBook] = useDeleteBookMutation();

	const deleteBookChange = async (id: number) => {
		await deleteBook(id);
	};

	const handleCancel = () => {
		setIsModalOpen(false);
	};
	const hadnlePageSizeBook = () => {
		return setSizePage(sizePage + 12);
	};

	// const [style, setStyle] = useState({ width: 268, height: 409 });

	// const updateStyle = () => {
	// 	const width = window.innerWidth;
	// 	if (width <= 390) {
	// 		setStyle({ width: 250, height: 350 });
	// 	} else if (width <= 576) {
	// 		setStyle({ width: 200, height: 350 });
	// 	} else if (width <= 768) {
	// 		setStyle({ width: 200, height: 350 });
	// 	} else if (width <= 992) {
	// 		setStyle({ width: 270, height: 390 });
	// 	} else if (width <= 1200) {
	// 		setStyle({ width: 230, height: 360 });
	// 	} else {
	// 		setStyle({ width: 268, height: 409 });
	// 	}
	// };

	// useEffect(() => {
	// 	window.addEventListener('resize', updateStyle);
	// 	updateStyle();

	// 	return () => window.removeEventListener('resize', updateStyle);
	// }, []);

	// const hadnleTest = (id: number) => {
	// 	if (id === bookId) {
	// 		setIsOpen(!isOpen);
	// 	}
	// };

	return (
		<>
			{isLoading ? (
				<>
					<div className={scss.skeleton}>
						{/* 
						{booksData.map((item:Book) => (
							
							<>
								<Skeleton.Button key={item.id} style={style} />
							</>
						))} */}
					</div>
				</>
			) : (
				<>
					<section className={scss.VendorsBooks}>
						<div className="container">
							<div className={scss.content}>
								<>
									<div className={scss.books_quantity}>
										<p>Всего {booksData?.length} книг</p>
										<div className={scss.all_books}>
											<div className={scss.click}>
												<p
													className={scss.all}
													onClick={() => setIsOpenBooksType(!isOpenBooksType)}
												>
													<span>
														{
															sortBookData.find(
																(sort) => sort.sort === sortSelected
															)?.sortName
														}
													</span>
													<span>
														<div
															className={
																isOpenBooksType
																	? scss.arrow_bottom
																	: scss.arrow_top
															}
														>
															<IconArrowBottom />
														</div>
													</span>
												</p>
												<div
													className={
														isOpenBooksType
															? scss.type_list
															: scss.none_books_type
													}
												>
													{sortBookData.map((sort) => (
														<div key={sort.id}>
															<p
																onClick={() => {
																	setSortSelected(sort.sort);

																	setIsOpenBooksType(false);
																}}
															>
																{sort.sortName}
															</p>
															<hr />
														</div>
													))}
												</div>
											</div>
										</div>
									</div>
									<hr className={scss.title_hr} />
									<div className={scss.test}>
										{booksData?.length && booksData.length > 0 ? (
											<>
												<div className={scss.books_content}>
													{booksData?.map((book) => (
														<div key={book.id} className={scss.book}>
															<div className={scss.book_header}>
																<div className={scss.hearts}>
																	<IconWhiteLike />
																	<p>({book.quantityOfFavorite})</p>
																</div>
																<div className={scss.in_basket}>
																	<p>В корзине ({book.quantityOfBasket})</p>
																</div>
															</div>
															<div
																className={scss.extra}
																onClick={() => {
																	setIsOpen(!isOpen);
																	setBookId(book.id);
																}}
															>
																<ThreeDotIcon />
															</div>
															<div
																className={` ${book.id === bookId ? (isOpen ? scss.is_open : scss.close) : scss.close}`}
															>
																<ul>
																	<li
																		onClick={() => {
																			setIsOpen(false);
																			navigate(
																				`/vendor/home/editBook/${book.id}`
																			);
																		}}
																	>
																		<span>
																			<IconPencil />
																		</span>
																		Редактировать
																	</li>
																	<hr />
																	<li
																		onClick={() => {
																			setIsOpen(false);
																			setIsModalOpen(true);
																		}}
																	>
																		<span>
																			<IconDelete />
																		</span>
																		Удалить
																	</li>
																</ul>
																<Modal
																	open={isModalOpen}
																	onCancel={handleCancel}
																	footer={null}
																	className={scss.delete_modal}
																>
																	<div className={scss.delete_modal}>
																		<p>Вы уверены, что хотите удалить?</p>
																		<div className={scss.bt_modal}>
																			<button onClick={handleCancel}>
																				Отменить
																			</button>
																			<button
																				onClick={() => {
																					deleteBookChange(book.id);
																				}}
																			>
																				Удалить
																			</button>
																		</div>
																	</div>
																</Modal>
															</div>
															<div
																onClick={() => navigate(`${book.id}`)}
																className={scss.book_content}
															>
																<div className={scss.book_img}>
																	<img
																		src={book.imageLink}
																		alt={book.imageLink}
																	/>
																</div>
																<div className={scss.info_book}>
																	{book.bookName.length > 12 ? (
																		<>
																			<Tooltip
																				className={scss.info_hover}
																				title={book.bookName}
																				color="orangered"
																				placement="bottomLeft"
																			>
																				<h3>{book.bookName}</h3>
																			</Tooltip>
																		</>
																	) : (
																		book.bookName
																	)}

																	<div className={scss.date_and_price}>
																		<p>{book.publishedYear}</p>
																		<p className={scss.price}>{book.price} c</p>
																	</div>
																</div>
															</div>
														</div>
													))}
												</div>
											</>
										) : (
											<div className={scss.noBooksYet}>
												<div className={scss.noBooksYetContent}>
													<img src={girl_img} alt="Girl with books" />
													<h1>Здесь появятся добавленные вами книги.</h1>
												</div>
											</div>
										)}
									</div>

									{booksData?.length === 12 ? (
										<>
											<div className={scss.see_more_button}>
												<CustomSeeMoreButton
													children="Смотреть больше"
													onClick={() => {
														hadnlePageSizeBook();
													}}
												/>
											</div>
										</>
									) : null}
								</>
							</div>
						</div>
					</section>
				</>
			)}
			<></>
		</>
	);
};

export default VendorsBooks;
