/* eslint-disable @typescript-eslint/no-explicit-any */
import { FC,  useState } from 'react';
import scss from './VendorsBooks.module.scss';
import { IconPencil } from '@tabler/icons-react';

import { useNavigate } from 'react-router-dom';
import { IconArrowBottom, IconDelete, IconWhiteLike } from '@/src/assets/icons';
import ThreeDotIcon from '@/src/assets/icons/icon-threeDot';
import {
	useDeleteBookMutation,
	useGetAllBookVedorQuery
} from '@/src/redux/api/book';
import CustomSeeMoreButton from '@/src/ui/customButton/CustomSeeMoreButton';
import { Modal } from 'antd';

const VendorsBooks: FC = () => {
	const [isOpen, setIsOpen] = useState<boolean>(false);
	const [bookId, setBookId] = useState<null | number>(null); // Исправлено: было bookoId
	const navigate = useNavigate();
	const [sortSelected, setSortSelected] = useState('ALL');
	const [isOpenBooksType, setIsOpenBooksType] = useState(false);
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [selectedBook, setSelectedBook] = useState<number | null>(null);
	const [allBooks, setAllBooks] = useState<any[]>([]);
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

	const [currentPage, setCurrentPage] = useState<number>(1);
	const { data, isLoading } = useGetAllBookVedorQuery({
		bookOperationType: sortSelected,
		page: currentPage,
		pageSize: 12
	});

	const [deleteBook] = useDeleteBookMutation();

	const deleteBookChange = async (id: number) => {
		await deleteBook(id);
	};


	const handleOk = async () => {
		if (selectedBook !== null) {
			await deleteBookChange(selectedBook);
		}
		setIsModalOpen(false);
		setSelectedBook(null);
	};

	const handleCancel = () => {
		setIsModalOpen(false);
		setSelectedBook(null);
	};
	const hadnlePageSizeBook = () => {
		return setSizePage(sizePage + 12);
	};



	if (isLoading) {
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
									onClick={() => setIsOpenBooksType(!isOpenBooksType)}
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
									</span>
								</p>
								<div
									className={
										isOpenBooksType ? scss.type_list : scss.none_books_type
									}
								>
									{sortBookData.map((sort) => (
										<div key={sort.id}>
											<p
												onClick={() => {
													setSortSelected(sort.sort);

													setCurrentPage(1);
													setAllBooks([]);
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
								<img src="" alt="Girl with books" />
							</div>
						</div>
					)}
					{data?.length === 12 ? (
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
				</div>
			</div>
			<Modal
				visible={isModalOpen}
				onOk={handleOk}
				onCancel={handleCancel}
				footer={null}
				className={scss.delete_modal}
			>
				<div className={scss.delete_modal}>
					<p>Вы уверены, что хотите удалить?</p>
					<div className={scss.bt_modal}>
						<button onClick={handleCancel}>Отменить</button>
						<button onClick={handleOk}>Удалить</button>
					</div>
				</div>
			</Modal>
		</section>
	);
};

export default VendorsBooks;
