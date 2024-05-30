import scss from './innerSection.module.scss';
import ThreeDotIcon from '@/src/assets/icons/icon-threeDot';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { IconPencil, IconX } from '@tabler/icons-react';
import { useGetAllBooksQuery } from '@/src/redux/api/innerPage';

const InnerSection = () => {
	const navigate = useNavigate();
	const [isOpen, setIsOpen] = useState(false);
	const [idBook, setIdBook] = useState<null | number>(null);
	const { data: books, refetch } = useGetAllBooksQuery();

	const handleBookClick = (id: number) => {
		navigate(`/admin/inner/${id}`);
		refetch();
	};

	return (
		<section className={scss.InnerSection}>
			<div className={scss.container}>
				<div className={scss.total_quantity}>
					<p>Всего: {books?.length || 0}</p>
					<p>
						Непросмотренные:
						<span>
							{books?.filter((book) => !book.numberOfUnViewed).length || 0}
						</span>
					</p>
				</div>
				<div className={scss.content}>
					{books?.map((book) => (
						<div
							key={book.id}
							className={`${scss.book} ${book.isViewed ? '' : scss.unviewed}`}
						>
							<div
								className={scss.extra}
								onClick={() => {
									setIsOpen(!isOpen);
									setIdBook(book.id);
								}}
							>
								<ThreeDotIcon />
							</div>
							{idBook === book.id ? (
								<div className={isOpen ? scss.is_open : scss.on_close}>
									<ul>
										<li>
											<span>
												<IconPencil />
											</span>
											Редактировать
										</li>
										<hr />
										<li onClick={() => setIsOpen(false)}>
											<span>
												<IconX />
											</span>
											Отклонить
										</li>
									</ul>
								</div>
							) : null}
							<div
								onClick={() => handleBookClick(book.id)}
								className={scss.book_content}
							>
								<div className={scss.book_img}>
									<img src={book.imageUrl} alt="" />
								</div>
								<div className={scss.info_book}>
									<h3>{book.title}</h3>
									<div className={scss.date_and_price}>
										<p>{book.createdAt}</p>
										<p className={scss.price}>{book.price} c</p>
									</div>
								</div>
							</div>
						</div>
					))}
				</div>
			</div>
		</section>
	);
};

export default InnerSection;
