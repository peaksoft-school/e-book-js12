import React, { useState } from 'react';
import scss from './BooksSection.module.scss';
import bookImage from '../../../../assets/booksImg/img-History-books.png';
import { IconPencil, IconX } from '@tabler/icons-react';
import CustomAddBookButton from '@/src/ui/customButton/CustomAddBook';
import ThreeDotIcon from '@/src/assets/icons/icon-threeDot';
import { IconArrowBottom } from '@/src/assets/icons';
import UpIcon from '@/src/assets/icons/icon-upIcon';
import { useNavigate } from 'react-router-dom';

type Book = {
	id: number;
	img: string;
	name: string;
	date: string;
	price: number;
	type: string;
};

const BooksSection: React.FC = () => {
	const [openStates, setOpenStates] = useState<{ [key: number]: boolean }>({});

	const [isOpenBooksType, setIsOpenBooksType] = useState<boolean>(false);
	const [selectedType, setSelectedType] = useState<string | null>('Все');
	const [isOpenBooksGenre, setIsOpenBooksGenre] = useState<boolean>(false);
	const navigate = useNavigate();

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
			type: 'Аудиокниги'
		},
		{
			id: 6,
			img: bookImage,
			name: 'История книги',
			date: '20 Feb 2021',
			price: 350,
			type: 'Аудиокниги'
		}
	];

	const toggleTypeList = (): void => {
		setIsOpenBooksType(!isOpenBooksType);
		setIsOpenBooksGenre(false);
	};
	const toggleGenreList = (): void => {
		setIsOpenBooksGenre(!isOpenBooksGenre);
		setIsOpenBooksType(false);
	};

	const handleGenreSelect = (type: string | null): void => {
		setSelectedType(type);
		setIsOpenBooksType(false);
	};

	const bookTypeText = selectedType ? selectedType : 'Все';

	const filteredBooks: Book[] =
		selectedType === 'Все'
			? books
			: books.filter((book) => book.type === selectedType);
	const toggleBookOptions = (id: number) => {
		setOpenStates((prevStates) => ({
			...prevStates,
			[id]: !prevStates[id]
		}));
	};

	return (
		<section className={scss.BooksSection}>
			<div className={scss.container}>
				<div className={scss.books_page_content}>
					<div className={scss.books_filter}>
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
						<div className={scss.click}>
							<p onClick={toggleTypeList}>
								<span onClick={() => {}}>{bookTypeText}</span>

								{isOpenBooksType ? <UpIcon /> : <IconArrowBottom />}
							</p>
							{
								<div
									className={
										isOpenBooksType ? scss.type_list : scss.none_books_type
									}
								>
									{selectedType !== 'Все' ? (
										<>
											<p onClick={() => handleGenreSelect('Все')}>Все</p>
											<hr />
										</>
									) : null}
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
					</div>
					<div className={scss.add_book_btn}>
						<CustomAddBookButton
							children={'+  Добавить книгу'}
							onClick={() => {
								navigate('/admin/add_book');
							}}
						/>
					</div>
				</div>
				<div className={scss.total_quantity}>
					<p>Всего: {filteredBooks.length}</p>
				</div>
				<div className={scss.content}>
					{filteredBooks.map((book) => (
						<div key={book.id} className={scss.book}>
							<div
								className={scss.extra}
								onClick={() => toggleBookOptions(book.id)}
							>
								<ThreeDotIcon />
							</div>
							<div
								className={openStates[book.id] ? scss.is_open : scss.on_close}
							>
								<ul>
									<li>
										<span>
											<IconPencil />
										</span>
										Редактировать
									</li>
									<li onClick={() => toggleBookOptions(book.id)}>
										<span>
											<IconX />
										</span>
										Отклонить
									</li>
								</ul>
							</div>
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
