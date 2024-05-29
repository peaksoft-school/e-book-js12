import scss from './innerSection.module.scss';
import bookImage from '../../../../assets/booksImg/harrry-potter.png';
import ThreeDotIcon from '@/src/assets/icons/icon-threeDot';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { IconPencil, IconX } from '@tabler/icons-react';

const InnerSection = () => {
	const navigate = useNavigate();
	const [isOpen, setIsOpen] = useState(false);
	const [idBook, setIdBook] = useState<null | number>(null);

	const books = [
		{
			id: 1,
			img: bookImage,
			name: 'История книги',
			date: '20 Feb 2021',
			price: 350
		},
		{
			id: 2,
			img: bookImage,
			name: 'История книги',
			date: '20 Feb 2021',
			price: 350
		},
		{
			id: 3,
			img: bookImage,
			name: 'История книги',
			date: '20 Feb 2021',
			price: 350
		},
		{
			id: 4,
			img: bookImage,
			name: 'История книги',
			date: '20 Feb 2021',
			price: 350
		},
		{
			id: 5,
			img: bookImage,
			name: 'История книги',
			date: '20 Feb 2021',
			price: 350
		},
		{
			id: 6,
			img: bookImage,
			name: 'История книги',
			date: '20 Feb 2021',
			price: 350
		},
		{
			id: 7,
			img: bookImage,
			name: 'История книги',
			date: '20 Feb 2021',
			price: 350
		},
		{
			id: 8,
			img: bookImage,
			name: 'История книги',
			date: '20 Feb 2021',
			price: 350
		}
	];

	return (
		<section className={scss.InnerSection}>
			<div className={scss.container}>
				<div className={scss.total_quantity}>
					<p>Всего: {books.length}</p>
					<p>
						Непросмотренные: <span>4</span>
					</p>
				</div>
				<div className={scss.content}>
					{books.map((book) => (
						<div key={book.id} className={scss.book}>
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
								onClick={() => navigate(`/admin/inner/${book.id}`)}
								className={scss.book_content}
							>
								<div className={scss.book_img}>
									<img src={book.img} alt="" />
								</div>
								<div className={scss.info_book}>
									<h3>{book.name}</h3>
									<div className={scss.date_and_price}>
										<p>{book.date}</p>
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
