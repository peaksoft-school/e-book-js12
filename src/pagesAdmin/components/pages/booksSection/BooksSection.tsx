import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import scss from './BooksSection.module.scss';
import { IconPencil, IconX } from '@tabler/icons-react';
import CustomAddBookButton from '@/src/ui/customButton/CustomAddBook';
import ThreeDotIcon from '@/src/assets/icons/icon-threeDot';
import { IconArrowBottom } from '@/src/assets/icons';
import UpIcon from '@/src/assets/icons/icon-upIcon';
import { useFilterBooksMutation } from '@/src/redux/api/book';

type Book = {
	id: number;
	imageUrl: string;
	title: string;
	dataOfDate: number;
	price: number;
	type: string;
	genre: string;
};

const BooksSection: React.FC = () => {
	const [openStates, setOpenStates] = useState<{ [key: number]: boolean }>({});
	const [isOpenBooksType, setIsOpenBooksType] = useState<boolean>(false);
	const [selectedType, setSelectedType] = useState<string | null>(null);
	const [isOpenBooksGenre, setIsOpenBooksGenre] = useState<boolean>(false);
	const [selectedGenre, setSelectedGenre] = useState<string[]>([]);
	const [books] = useState<Book[]>([]);
	const navigate = useNavigate();
	const [filterBooks] = useFilterBooksMutation();

	// const handlePostRequest = async () => {
	// 	const filters = {
	// 		genres: [...selectedGenre],
	// 		bookTypes: [selectedType]
	// 	};
	// 	console.log(filters);

	// 	await filterBooks(filters);
	// };

	const handlePostRequest = async () => {
		const filteredBookTypes = selectedType !== null ? [selectedType] : [];
		const filters = {
			genres: [...selectedGenre],
			bookTypes: filteredBookTypes
		};
		console.log(filters);

		await filterBooks(filters);
	};

	useEffect(() => {
		handlePostRequest();
	}, [selectedGenre, selectedType]);

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

	const handleGenreClick = (genre: string | null): void => {
		if (genre !== null) {
			setSelectedGenre((prevGenres) => {
				if (prevGenres.includes(genre)) {
					return prevGenres.filter((g) => g !== genre);
				} else {
					return [...prevGenres, genre];
				}
			});
		}
		setIsOpenBooksGenre(false);
	};

	const bookTypeText = selectedType ? selectedType : 'все';

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
										<div
											className={scss.genre_quantity}
											onClick={() => handleGenreClick('EDUCATION')}
										>
											<p>Образование</p>
											<p>{books.length}</p>
										</div>
										<div
											className={scss.genre_quantity}
											onClick={() => handleGenreClick('ARTISTIC_LITERATURE')}
										>
											<p>Художественная литература</p>
											<p>{books.length}</p>
										</div>
										<div
											className={scss.genre_quantity}
											onClick={() => handleGenreClick('BOOKS_FOR_CHILDREN')}
										>
											<p>Книги для детей</p>
											<p>{books.length}</p>
										</div>
										<div
											className={scss.genre_quantity}
											onClick={() => handleGenreClick('SCIENCE_AND_TECHNOLOGY')}
										>
											<p>Наука и техника</p>
											<p>{books.length}</p>
										</div>
										<div
											className={scss.genre_quantity}
											onClick={() => handleGenreClick('COMMUNITY')}
										>
											<p>Общество</p>
											<p>{books.length}</p>
										</div>
										<div
											className={scss.genre_quantity}
											onClick={() => handleGenreClick('BUSINESS_LITERATURE')}
										>
											<p>Деловая литература</p>
											<p>{books.length}</p>
										</div>
										<div
											className={scss.genre_quantity}
											onClick={() => handleGenreClick('BEAUTY_HEALTH_SPORT')}
										>
											<p>Красота. Здоровье. Спорт</p>
											<p>{books.length}</p>
										</div>
										<div
											className={scss.genre_quantity}
											onClick={() => handleGenreClick('HOBBIES')}
										>
											<p>Увлечения</p>
											<p>{books.length}</p>
										</div>
										<div
											className={scss.genre_quantity}
											onClick={() => handleGenreClick('PSYCHOLOGY')}
										>
											<p>Психология</p>
											<p>{books.length}</p>
										</div>
									</div>
								}
							</div>
						</div>
						<div className={scss.click}>
							<p onClick={toggleTypeList}>
								<span>{bookTypeText}</span>
								{isOpenBooksType ? <UpIcon /> : <IconArrowBottom />}
							</p>
							{
								<div
									className={
										isOpenBooksType ? scss.type_list : scss.none_books_type
									}
								>
									{selectedType !== '' ? (
										<>
											<p onClick={() => handleGenreSelect(null)}>Все</p>
											<hr />
										</>
									) : null}
									<p onClick={() => handleGenreSelect('ONLINE_BOOK')}>
										Электронные книги
									</p>
									<hr />
									<p onClick={() => handleGenreSelect('AUDIO_BOOK')}>
										Аудиокниги
									</p>
									<hr />
									<p onClick={() => handleGenreSelect('PAPER_BOOK')}>
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
								navigate('/admin/books/add_book');
							}}
						/>
					</div>
				</div>
				<div className={scss.total_quantity}>
					<p>Всего: {books.length}</p>
				</div>
				<div className={scss.content}>
					{books.map((book) => (
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
									<img src={book.imageUrl} alt="" />
								</div>
								<div className={scss.info_book}>
									<h3>{book.title}</h3>
									<div className={scss.date_and_price}>
										<p>{book.dataOfDate}</p>
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
