/* eslint-disable @typescript-eslint/no-explicit-any */
import { FC, useState, useEffect } from 'react';
import scss from './VendorsBooks.module.scss';
import { IconPencil } from '@tabler/icons-react';
import girl_img from '../../../../assets/img/Knowledgecuate.png';
import { useNavigate } from 'react-router-dom';
import { IconArrowBottom, IconDelete, IconWhiteLike } from '@/src/assets/icons';
import ThreeDotIcon from '@/src/assets/icons/icon-threeDot';
import {
	useDeleteBookMutation,
	useGetAllBookVedorQuery
} from '@/src/redux/api/book';

const VendorsBooks: FC = () => {
	const [isOpen, setIsOpen] = useState<boolean>(false);
	const [bookId, setBookId] = useState<null | number>(null);
	const [initialLoad, setInitialLoad] = useState<boolean>(true);
	const [allBooks, setAllBooks] = useState<any[]>([]);
	const navigate = useNavigate();
	const [sortSelected, setSortSelected] = useState('ALL');
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

	const [currentPage, setCurrentPage] = useState(1);
	const { data, isLoading } = useGetAllBookVedorQuery({
		bookOperationType: sortSelected,
		page: currentPage,
		pageSize: 8
	});

	const [deleteBook] = useDeleteBookMutation();

	const deleteBookChange = async (id: number) => {
		await deleteBook(id);
	};

	const [isOpenBooksType, setIsOpenBooksType] = useState(false);

	useEffect(() => {
		if (data) {
			setAllBooks((prevBooks) => [...prevBooks, ...data]);
			setInitialLoad(false);
		}
	}, [data]);

	if (initialLoad) {
		return <div>Loading...</div>;
	}

	return (
		<section className={scss.VendorsBooks}>
			<div className="container">
				<div className={scss.content}>
					<div className={scss.books_quantity}>
						<p>Всего {allBooks.length} книг</p>
						<div className={scss.all_books}>
							<div className={scss.click}>
								<p
									className={scss.all}
									onClick={() => {
										setIsOpenBooksType(!isOpenBooksType);
									}}
								>
									<span>
										{
											sortBookData.find((sort) => sort.sort === sortSelected)
												?.sortName
										}
									</span>
									<span>
										<div
											className={
												isOpenBooksType ? scss.arrow_bottom : scss.arrow_top
											}
										>
											<IconArrowBottom />
										</div>
										<></>
									</span>
								</p>
								<div
									className={`${isOpenBooksType ? scss.type_list : scss.none_books_type}`}
								>
									{sortBookData.map((sort) => (
										<>
											<p
												key={sort.id}
												onClick={() => {
													setIsOpenBooksType(false);
													setSortSelected(sort.sort);
													setCurrentPage(1);
													setAllBooks([]);
												}}
											>
												{sort.sortName}
											</p>
											<hr />
										</>
									))}
								</div>
							</div>
						</div>
					</div>
					<hr className={scss.title_hr} />
					{allBooks.length > 0 ? (
						<div className={scss.books_content}>
							{allBooks.map((book) => (
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
									{bookId === book.id && (
										<div className={` ${isOpen ? scss.is_open : scss.close}`}>
											<ul>
												<li onClick={() => setIsOpen(false)}>
													<span>
														<IconPencil />
													</span>
													Редактировать
												</li>
												<hr />
												<li
													onClick={() => {
														deleteBookChange(book.id);
														setIsOpen(false);
													}}
												>
													<span>
														<IconDelete />
													</span>
													Удалить
												</li>
											</ul>
										</div>
									)}
									<div
										onClick={() => navigate(`${book.id}`)}
										className={scss.book_content}
									>
										<div className={scss.book_img}>
											<img src={book.imageLink} alt={book.imageLink} />
										</div>
										<div className={scss.info_book}>
											<h3>{book.bookName}</h3>
											<div className={scss.date_and_price}>
												<p>{book.publishedYear}</p>
												<p className={scss.price}>{book.price} c</p>
											</div>
										</div>
									</div>
								</div>
							))}
						</div>
					) : (
						<div className={scss.noBooksYet}>
							<div className={scss.noBooksYetContent}>
								<h1>Здесь появятся добавленные вами книги.</h1>
								<img src={girl_img} alt="Girl with books" />
							</div>
						</div>
					)}
					{!isLoading && data && data.length >= 8 ? (
						<div className={scss.btn_morebook}>
							<button
								onClick={() => setCurrentPage((prevPage) => prevPage + 1)}
							>
								Смотреть больше
							</button>
						</div>
					) : null}
				</div>
			</div>
		</section>
	);
};

export default VendorsBooks;
