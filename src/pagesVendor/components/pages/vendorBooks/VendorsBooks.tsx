import { FC, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Modal } from 'antd';
import { IconPencil } from '@tabler/icons-react';
import { IconArrowBottom, IconDelete, IconWhiteLike } from '@/src/assets/icons';
import ThreeDotIcon from '@/src/assets/icons/icon-threeDot';
import CustomSeeMoreButton from '@/src/ui/customButton/CustomSeeMoreButton';
import {
	useDeleteBookMutation,
	useGetAllBookVedorQuery
} from '@/src/redux/api/book';
import scss from './VendorsBooks.module.scss';

const VendorsBooks: FC = () => {
	const [isOpen, setIsOpen] = useState<boolean>(false);
	const [bookId, setBookId] = useState<number | null>(null);
	const navigate = useNavigate();
	const [sortSelected, setSortSelected] = useState('ALL');
	const [isOpenBooksType, setIsOpenBooksType] = useState(false);
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [selectedBook, setSelectedBook] = useState<number | null>(null);

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
	const { data } = useGetAllBookVedorQuery({
		bookOperationType: sortSelected,
		page: 1,
		pageSize: sizePage
	});

	const [deleteBook] = useDeleteBookMutation();

	const deleteBookChange = async (id: number) => {
		await deleteBook(id);
	};

	const showModal = (bookId: number) => {
		setSelectedBook(bookId);
		setIsModalOpen(true);
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

	return (
		<section className={scss.VendorsBooks}>
			<div className="container">
				<div className={scss.content}>
					<div className={scss.books_quantity}>
						<p>Всего {data?.length} книг</p>
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
					<div className={scss.books_content}>
						{data?.map((book) => (
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
										setIsOpen(bookId !== book.id || !isOpen);
										setBookId(book.id);
									}}
								>
									<ThreeDotIcon />
								</div>
								{bookId === book.id && isOpen && (
									<div className={scss.is_open}>
										<ul>
											<li onClick={() => setIsOpen(false)}>
												<span>
													<IconPencil />
												</span>
												Редактировать
											</li>
											<hr />
											<li onClick={() => showModal(book.id)}>
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
										<img src={book.imageLink} alt={book.bookName} />
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
