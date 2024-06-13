import { FC, useState } from 'react';
import scss from './VendorsBooks.module.scss';
import { IconPencil } from '@tabler/icons-react';

import { useNavigate } from 'react-router-dom';
import { IconArrowBottom, IconDelete, IconWhiteLike } from '@/src/assets/icons';
import ThreeDotIcon from '@/src/assets/icons/icon-threeDot';
import CustomSeeMoreButton from '@/src/ui/customButton/CustomSeeMoreButton';
import UpIcon from '@/src/assets/icons/icon-upIcon';
import {
	useDeleteBookMutation,
	useGetAllBookVedorQuery
} from '@/src/redux/api/book';

const VendorsBooks: FC = () => {
	const [isOpen, setIsOpen] = useState<boolean>(false);
	const [bookoId, setBookId] = useState<null | number>(null);
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
	const { data } = useGetAllBookVedorQuery({
		bookOperationType: sortSelected,
		page: 1,
		pageSize: 12
	});

	const [deleteBook] = useDeleteBookMutation();

	const deleteBookChange = async (id: number) => {
		await deleteBook(id);
	};

	const [isOpenBooksType, setIsOpenBooksType] = useState(false);

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
									onClick={() => {
										setIsOpenBooksType(!isOpenBooksType);
									}}
								>
									<span>Все</span>
									<span className={scss.arrow}>
										{isOpenBooksType ? <UpIcon /> : <IconArrowBottom />}
									</span>
								</p>
								{
									<div
										className={`${isOpenBooksType ? scss.type_list : scss.none_books_type}`}
									>
										{sortBookData.map((sort) => (
											<>
												<p
													onClick={() => {
														setIsOpenBooksType(false);
														sort.id === 1
															? setSortSelected('ALL')
															: setSortSelected(sort.sort);
													}}
												>
													{sort.sortName}
												</p>
												<hr />
											</>
										))}
									</div>
								}
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
										setIsOpen(!isOpen);
										setBookId(book.id);
									}}
								>
									<ThreeDotIcon />
								</div>
								{bookoId === book.id ? (
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
								) : null}
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
											<p className={scss.price}>{book.price} с</p>
										</div>
									</div>
								</div>
							</div>
						))}
					</div>
					<div className={scss.see_more_button}>
						<CustomSeeMoreButton
							children="Смотреть больше"
							onClick={function (): void {}}
						/>
					</div>
				</div>
			</div>
		</section>
	);
};

export default VendorsBooks;
