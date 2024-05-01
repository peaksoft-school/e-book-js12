import React, { useState } from 'react';
import scss from './BooksSection.module.scss';
import bookImage from '../../../../assets/booksImg/img-History-books.png';
import { IconPencil, IconX } from '@tabler/icons-react';
import CustomAddBookButton from '@/src/ui/customButton/CustomAddBook';
import ThreeDotIcon from '@/src/assets/icons/icon-threeDot';
import { IconArrowBottom } from '@/src/assets/icons';
import UpIcon from '@/src/assets/icons/icon-upIcon';

type Book = {
	id: number;
	img: string;
	name: string;
	date: string;
	price: number;
	type: string;
};

const BooksSection: React.FC = () => {
	const [isOpen, setIsOpen] = useState<boolean>(false);
	const [isOpenBooksType, setIsOpenBooksType] = useState<boolean>(false);
	const [selectedType, setSelectedType] = useState<string | null>(null);
	const [isOpenBooksGenre, setIsOpenBooksGenre] = useState<boolean>(false);

	const books: Book[] = [
		{
			id: 1,
			img: bookImage,
			name: 'История книги',
			date: '20 Feb 2021',
			price: 350,
			type: 'Бумажные книги'
		},
		{
			id: 2,
			img: bookImage,
			name: 'История книги',
			date: '20 Feb 2021',
			price: 350,
			type: 'Бумажные книги'
		},
		{
			id: 3,
			img: bookImage,
			name: 'История книги',
			date: '20 Feb 2021',
			price: 350,
			type: 'Бумажные книги'
		},
		{
			id: 4,
			img: bookImage,
			name: 'История книги',
			date: '20 Feb 2021',
			price: 350,
			type: 'Электронные книги'
		},
		{
			id: 5,
			img: bookImage,
			name: 'История книги',
			date: '20 Feb 2021',
			price: 350,
			type: 'Электронные книги'
		},
		{
			id: 6,
			img: bookImage,
			name: 'История книги',
			date: '20 Feb 2021',
			price: 350,
			type: 'Электронные книги'
		},
		{
			id: 7,
			img: bookImage,
			name: 'История книги',
			date: '20 Feb 2021',
			price: 350,
			type: 'Аудиокниги'
		},
		{
			id: 8,
			img: bookImage,
			name: 'История книги',
			date: '20 Feb 2021',
			price: 350,
			type: 'Аудиокниги'
		},
		{
			id: 9,
			img: bookImage,
			name: 'История книги',
			date: '20 Feb 2021',
			price: 350,
			type: 'Аудиокниги'
		},
		{
			id: 10,
			img: bookImage,
			name: 'История книги',
			date: '20 Feb 2021',
			price: 350,
			type: 'Аудиокниги'
		}
	];

	const toggleTypeList = (): void => {
		setIsOpenBooksType(!isOpenBooksType);
	};
	const toggleGenreList = (): void => {
		setIsOpenBooksGenre(!isOpenBooksGenre);
	};

	const handleGenreSelect = (type: string | null): void => {
		setSelectedType(type);
		setIsOpenBooksType(false);
	};

	const bookTypeText = selectedType ? selectedType : 'Все';

	const filteredBooks: Book[] = selectedType
		? books.filter((book) => book.type === selectedType)
		: books;

	return (
		<section className={scss.BooksSection}>
			<div className={scss.container}>
				<div className={scss.books_page_content}>
					<div className={scss.books_filter}>
						<div className={scss.click}>
							<p onClick={toggleTypeList}>
								<span onClick={() => handleGenreSelect(null)}>
									{bookTypeText}
								</span>

								{isOpenBooksType ? <UpIcon /> : <IconArrowBottom />}
							</p>
							{
								<div
									className={
										isOpenBooksType ? scss.type_list : scss.none_books_type
									}
								>
									<p onClick={() => handleGenreSelect('Электронные книги')}>
										Электронные книги
									</p>
									<hr />
									<p onClick={() => handleGenreSelect('Аудиокниги')}>
										Аудиокниги
									</p>
									<hr />
									<p onClick={() => handleGenreSelect('Бумажные книги')}>
										Бумажные книги
									</p>
								</div>
							}
						</div>

						<div className={scss.books_genre}>
							<div className={scss.click}>
								<p onClick={toggleGenreList}>
									<span>
										Жанры {isOpenBooksGenre ? <UpIcon /> : <IconArrowBottom />}
									</span>
								</p>
								{
									<div
										className={
											isOpenBooksGenre ? scss.genre_list : scss.none_books_genre
										}
									>
										<div className={scss.genre_quantity}>
											<p>Образование</p>
											<p>1232</p>
										</div>
										<div className={scss.genre_quantity}>
											<p>Художественнная лит...</p>
											<p>3453</p>
										</div>
										<div className={scss.genre_quantity}>
											<p>Книги для детей</p>
											<p>4536</p>
										</div>
										<div className={scss.genre_quantity}>
											<p>Наука и техника</p>
											<p>8976</p>
										</div>
										<div className={scss.genre_quantity}>
											<p>Общество</p>
											<p>5673</p>
										</div>
										<div className={scss.genre_quantity}>
											<p>Деловая литература</p>
											<p>675</p>
										</div>
										<div className={scss.genre_quantity}>
											<p>Красота. Здоровье.Спорт</p>
											<p>7654</p>
										</div>
										<div className={scss.genre_quantity}>
											<p>Увлечения</p>
											<p>7654</p>
										</div>
										<div className={scss.genre_quantity}>
											<p>Психология</p>
											<p>4567</p>
										</div>
									</div>
								}
							</div>
						</div>
					</div>
					<div>
						<CustomAddBookButton
							children={'+  Добавить книгу'}
							onClick={() => {}}
						/>
					</div>
				</div>
				<div className={scss.total_quantity}>
					<p>Всего: {filteredBooks.length}</p>
				</div>
				<div className={scss.content}>
					{filteredBooks.map((book) => (
						<div key={book.id} className={scss.book}>
							<div className={scss.extra} onClick={() => setIsOpen(!isOpen)}>
								<ThreeDotIcon />
							</div>
							{isOpen && (
								<div className={scss.is_open}>
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
							)}
							<div className={scss.book_content}>
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

export default BooksSection;
