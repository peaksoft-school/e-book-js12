import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import scss from './BooksSection.module.scss';
import { IconPencil, IconX } from '@tabler/icons-react';
import CustomAddBookButton from '@/src/ui/customButton/CustomAddBook';
import ThreeDotIcon from '@/src/assets/icons/icon-threeDot';
import { IconArrowBottom } from '@/src/assets/icons';
import UpIcon from '@/src/assets/icons/icon-upIcon';
import {
	useDeleteBookMutation,
	useFilterBooksMutation
} from '@/src/redux/api/book';

type Book = {
	bookId: number;
	imageUrl: string;
	title: string;
	dataOfDate: string;
	price: number;
	type: string;
	genre: string;
};

const genreData = [
	{
		genreId: 1,
		genreName: 'ХУДОЖЕСТВЕННАЯ ЛИТЕРАТУРА',
		englishName: 'ARTISTIC_LITERATURE',
		isChecked: false
	},
	{
		genreId: 2,
		genreName: 'ОБРАЗОВАНИЕ',
		englishName: 'EDUCATION',
		isChecked: false
	},
	{
		genreId: 3,
		genreName: 'КНИГИ ДЛЯ ДЕТЕЙ',
		englishName: 'BOOKS_FOR_CHILDREN',
		isChecked: false
	},
	{
		genreId: 4,
		genreName: 'НАУКА И ТЕХНОЛОГИЯ',
		englishName: 'SCIENCE_AND_TECHNOLOGY',
		isChecked: false
	},
	{
		genreId: 5,
		genreName: 'СООБЩЕСТВО',
		englishName: 'COMMUNITY',
		isChecked: false
	},
	{
		genreId: 6,
		genreName: 'БИЗНЕС ЛИТЕРАТУРА',
		englishName: 'BUSINESS_LITERATURE',
		isChecked: false
	},
	{
		genreId: 7,
		genreName: 'КРАСОТА, ЗДОРОВЬЕ, СПОРТ',
		englishName: 'BEAUTY_HEALTH_SPORT',
		isChecked: false
	},
	{
		genreId: 8,
		genreName: 'УВЛЕЧЕНИЯ',
		englishName: 'HOBBIES',
		isChecked: false
	},
	{
		genreId: 9,
		genreName: 'ПСИХОЛОГИЯ',
		englishName: 'PSYCHOLOGY',
		isChecked: false
	}
];

const bookTypes = [
	{
		typeId: 1,
		typeName: 'Электронные книги',
		typeNameEnglish: 'ELECTRONIC_BOOK'
	},
	{
		typeId: 2,
		typeName: 'Аудиокниги',
		typeNameEnglish: 'AUDIO_BOOK'
	},
	{
		typeId: 3,
		typeName: 'Бумажные книги',
		typeNameEnglish: 'PAPER_BOOK'
	}
];

const BooksSection: React.FC = () => {
	const [openState, setOpenState] = useState(false);
	const [isOpenBooksType, setIsOpenBooksType] = useState<boolean>(false);
	const [selectedType, setSelectedType] = useState<string | null>(null);
	const [isOpenBooksGenre, setIsOpenBooksGenre] = useState<boolean>(false);
	const [selectedGenre, setSelectedGenre] = useState<string[]>([]);
	const [books, setBooks] = useState<Book[]>([]);
	const navigate = useNavigate();
	const [filterBooks] = useFilterBooksMutation();
	const [idBook, setIdBook] = useState<null | number>(null);

	const [deleteBookById] = useDeleteBookMutation();

	const handleDeleteBook = (id: number) => {
		deleteBookById(id);
	};

	const handlePostRequest = async () => {
		const filteredBookTypes = selectedType !== null ? [selectedType] : [];
		const filters = {
			genres: [...selectedGenre],
			bookTypes: filteredBookTypes
		};
		console.log(filters);

		const result = await filterBooks(filters);
		if (result && result.data) {
			const { books } = result.data;
			setBooks(books);
		}
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

	const handleTypeSelect = (type: string | null): void => {
		setSelectedType(type);
		setIsOpenBooksType(false);
	};

	const handleGenreClick = (genre: string | null): void => {
		if (genre !== null) {
			setSelectedGenre([genre]);
		}
		setIsOpenBooksGenre(false);
	};

	const bookTypeText = selectedType
		? bookTypes.find((bt) => bt.typeNameEnglish === selectedType)?.typeName
		: 'Все';

	const genreText =
		selectedGenre.length > 0
			? genreData.find((g) => g.englishName === selectedGenre[0])?.genreName
			: 'Жанры';

	return (
		<section className={scss.BooksSection}>
			<div className={scss.container}>
				<div className={scss.books_page_content}>
					<div className={scss.books_filter}>
						<div className={scss.books_genre}>
							<div className={scss.click}>
								<p onClick={toggleGenreList}>
									<span>
										{genreText}
										{isOpenBooksGenre ? <UpIcon /> : <IconArrowBottom />}
									</span>
								</p>
								{
									<div
										className={
											isOpenBooksGenre ? scss.genre_list : scss.none_books_genre
										}
									>
										{genreData.map((data) => (
											<div
												key={data.genreId}
												className={scss.genre_quantity}
												onClick={() => handleGenreClick(data.englishName)}
											>
												<p>{data.genreName}</p>
												<p>{genreData.length}</p>
											</div>
										))}
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
											<p onClick={() => handleTypeSelect(null)}>Все</p>
											<hr />
										</>
									) : null}
									{bookTypes.map((bookType) => (
										<>
											<p
												key={bookType.typeId}
												onClick={() =>
													handleTypeSelect(bookType.typeNameEnglish)
												}
											>
												{bookType.typeName}
											</p>
											<hr />
										</>
									))}
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
						<div key={book.bookId} className={scss.book}>
							<div
								className={scss.extra}
								onClick={() => {
									setOpenState(!openState);
									setIdBook(book.bookId);
									console.log(book.bookId);
								}}
							>
								<ThreeDotIcon />
							</div>
							{idBook === book.bookId ? (
								<div className={openState ? scss.is_open : scss.on_close}>
									<ul>
										<li>
											<span>
												<IconPencil />
											</span>
											Редактировать
										</li>
										<li onClick={() => handleDeleteBook(book.bookId)}>
											<span>
												<IconX />
											</span>
											Удалить
										</li>
									</ul>
								</div>
							) : null}
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
