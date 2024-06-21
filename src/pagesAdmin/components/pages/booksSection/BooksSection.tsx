/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import scss from './BooksSection.module.scss';
import { IconPencil, IconX } from '@tabler/icons-react';
import CustomAddBookButton from '@/src/ui/customButton/CustomAddBook';
import ThreeDotIcon from '@/src/assets/icons/icon-threeDot';
import { IconArrowBottom } from '@/src/assets/icons';
import {
	useDeleteBookMutation,
	useFilterBooksMutation
} from '@/src/redux/api/book';
import { Modal } from 'antd';

type Book = {
	bookId: number;
	imageUrl: string;
	title: string;
	authorFullName: string;
	dataOfDate: string;
	price: number;
	discount: number;
};

const BooksSection: React.FC = () => {
	const [openState, setOpenState] = useState(false);
	const [isOpenBooksType, setIsOpenBooksType] = useState<boolean>(false);
	const [selectedType, setSelectedType] = useState<string | null>(null);
	const [isOpenBooksGenre, setIsOpenBooksGenre] = useState<boolean>(false);
	const [selectedGenre, setSelectedGenre] = useState<string[]>([]);
	const [genre, setGenre] = useState<string>('Все');
	const [books, setBooks] = useState<Book[]>([]);
	const navigate = useNavigate();
	const [filterBooks] = useFilterBooksMutation();
	const [idBook, setIdBook] = useState<null | number>(null);
	const [deleteBookById] = useDeleteBookMutation();
	console.log(genre);

	const bookType = [
		{
			typeId: 1,
			typeName: 'Электронные книги',
			typeNameEnglish: 'ONLINE_BOOK'
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

	const genreBook = [
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

	const handleDeleteBook = (id: number) => {
		deleteBookById(id);
		setOpenState(false);
	};

	const handleBookClick = (id: number) => {
		navigate(`/admin/books/${id}`);
	};

	const handlePostRequest = async () => {
		const filteredBookTypes = selectedType !== null ? [selectedType] : [];
		const filters = {
			genres: [...selectedGenre],
			bookTypes: filteredBookTypes
		};

		const result = await filterBooks(filters);
		if ('data' in result) {
			const { books } = result.data!;
			setBooks(books);
		}
	};

	useEffect(() => {
		handlePostRequest();
	}, [selectedGenre, selectedType, openState]);

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
			setGenre(genre);
		}
		setIsOpenBooksGenre(false);
	};

	const bookTypeText = selectedType
		? bookType.find((bt) => bt.typeNameEnglish === selectedType)?.typeName
		: 'Все';

	const genreText =
		selectedGenre.length > 0
			? genreBook.find((g) => g.englishName === selectedGenre[0])?.genreName
			: 'Жанры';

	const [selectedBook, setSelectedBook] = useState<number | null>(null);
	const [isModalOpen, setIsModalOpen] = useState(false);

	const showModal = (bookId: number) => {
		setSelectedBook(bookId);
		setIsModalOpen(true);
	};

	const handleOk = async () => {
		if (selectedBook !== null) {
			await handleDeleteBook(selectedBook);
		}
		setIsModalOpen(false);
		setSelectedBook(null);
	};

	const handleCancel = () => {
		setIsModalOpen(false);
		setSelectedBook(null);
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
										Жанры
										<div
											className={
												isOpenBooksGenre ? scss.arrow_bottom : scss.arrow_top
											}
										>
											<IconArrowBottom />
										</div>
										<></>
									</span>
								</p>
								<div
									className={
										isOpenBooksGenre ? scss.genre_list : scss.none_books_genre
									}
								>
									{genreBook.map((data) => (
										<div
											key={data.genreId}
											className={scss.genre_quantity}
											onClick={() => handleGenreClick(data.englishName)}
										>
											<p>{data.genreName}</p>
											<p>{books.length}</p>
										</div>
									))}
								</div>
							</div>
						</div>
						<div className={scss.types_book}>
							<div className={scss.click}>
								<p onClick={toggleTypeList}>
									<span>{bookTypeText}</span>
									<div
										className={
											isOpenBooksType ? scss.arrow_bottom : scss.arrow_top
										}
									>
										<IconArrowBottom />
									</div>
									<></>
								</p>
								{
									<div
										className={
											isOpenBooksType ? scss.type_list : scss.none_books_type
										}
									>
										{selectedType !== null ? (
											<>
												<p onClick={() => handleTypeSelect(null)}>Все</p>
												<hr />
											</>
										) : null}
										{bookType.map((bookType) => (
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
					<div className={scss.janry}>
						<span>{genreText}</span>
						<span
							onClick={() => {
								setGenre('Все');
								setSelectedGenre([]);
							}}
						>
							<IconX />
						</span>
					</div>
					<div className={scss.tipy}>
						<span>
							<span>{bookTypeText}</span>
						</span>
						<span
							onClick={() => {
								setSelectedType(null);
							}}
						>
							<IconX />
						</span>
					</div>
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
										<li onClick={() => setOpenState(!openState)}>
											<span>
												<IconPencil />
											</span>
											Редактировать
										</li>
										<li
											onClick={() => {
												showModal(book.bookId);

												setOpenState(!openState);
											}}
										>
											<span>
												<IconX />
											</span>
											Удалить
										</li>
									</ul>
								</div>
							) : null}
							<div
								className={scss.book_content}
								onClick={() => handleBookClick(book.bookId)}
							>
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

export default BooksSection;
