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
	useFilterBooksMutation,
	useGetCountBookIsGenreQuery
} from '@/src/redux/api/book';
import { Modal, Skeleton, Tooltip, message } from 'antd';

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
	const [booksData, setBooks] = useState<Book[]>([]);
	const navigate = useNavigate();
	const [filterBooks, { isLoading }] = useFilterBooksMutation();
	const { data: countIsGenreBook } = useGetCountBookIsGenreQuery();
	const [deleteBookById] = useDeleteBookMutation();
	const [deleteModal, setDeleteModal] = useState(false);
	const [messageApi, context] = message.useMessage();

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

	const handleDeleteBook = async (id: number) => {
		const result = (await deleteBookById(id)) as BOOK.DeleteProductResponse;
		if ('data' in result) {
			if (result.data) {
				handlePostRequest();
			}
		}
		if (result.error.data) {
			messageApi.open({
				type: 'warning',
				content: result.error.data.message
			});
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
		? bookType.find((bt) => bt.typeNameEnglish === selectedType)?.typeName
		: 'Все';

	const handlefindGenre = () => {
		const genreText =
			selectedGenre.length > 0
				? genreBook.find((g) => g.englishName === selectedGenre[0])?.genreName
				: 'Жанры';
		return genreText;
	};

	const [style, setStyle] = useState({ width: 268, height: 409 });
	console.log(countIsGenreBook);

	const updateStyle = () => {
		const width = window.innerWidth;
		if (width <= 576) {
			setStyle({ width: 100, height: 200 });
		} else if (width <= 768) {
			setStyle({ width: 150, height: 250 });
		} else if (width <= 992) {
			setStyle({ width: 180, height: 300 });
		} else if (width <= 1200) {
			setStyle({ width: 230, height: 360 });
		} else {
			setStyle({ width: 268, height: 409 });
		}
	};

	useEffect(() => {
		window.addEventListener('resize', updateStyle);
		updateStyle();

		return () => window.removeEventListener('resize', updateStyle);
	}, []);

	return (
		<>
			{isLoading ? (
				<>
					<div className={scss.skeleton}>
						{booksData.map((item) => (
							<>
								<Skeleton.Button key={item.bookId} active block style={style} />
							</>
						))}
					</div>
				</>
			) : (
				<section className={scss.BooksSection}>
					<div className={scss.container}>
						{context}
						<div className={scss.books_page_content}>
							<div className={scss.books_filter}>
								<div className={scss.books_genre}>
									<div className={scss.click}>
										<p onClick={toggleGenreList}>
											<span>
												Жанры
												<div
													className={
														isOpenBooksGenre
															? scss.arrow_bottom
															: scss.arrow_top
													}
												>
													<IconArrowBottom />
												</div>
												<></>
											</span>
										</p>
										<div
											className={
												isOpenBooksGenre
													? scss.genre_list
													: scss.none_books_genre
											}
										>
											{genreBook.map((data) => (
												<div
													key={data.genreId}
													className={scss.genre_quantity}
													onClick={() => handleGenreClick(data.englishName)}
												>
													<p>{data.genreName}</p>
													<p>
														{countIsGenreBook &&
														(countIsGenreBook as { [key: string]: number })[
															data.englishName
														]
															? (countIsGenreBook as { [key: string]: number })[
																	data.englishName
																]
															: 0}
													</p>
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
													isOpenBooksType
														? scss.type_list
														: scss.none_books_type
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
							<p>Всего: {booksData.length}</p>
							<div className={scss.janry}>
								<span>{handlefindGenre()}</span>
								<span
									onClick={() => {
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
							{booksData.map((book) => (
								<div key={book.bookId} className={scss.book}>
									<div
										className={scss.extra}
										onClick={() => {
											setOpenState(!openState);
										}}
									>
										<ThreeDotIcon />
									</div>
									<div className={openState ? scss.is_open : scss.on_close}>
										<ul>
											<li
												onClick={() => {
													setOpenState(false);
													navigate(`/admin/edit/${book.bookId}`);
												}}
											>
												<span>
													<IconPencil />
												</span>
												Редактировать
											</li>
											<li
												onClick={() => {
													setOpenState(false);
													setDeleteModal(true);
												}}
											>
												<span>
													<IconX />
												</span>
												Удалить
											</li>
										</ul>
									</div>
									<div
										className={scss.book_content}
										onClick={() => handleBookClick(book.bookId)}
									>
										<div className={scss.book_img}>
											<img src={book.imageUrl} alt="" />
										</div>
										<div className={scss.info_book}>
											<Tooltip
												className={`${scss.info_hover}/${scss.custom_tooltip}`}
												title={book.title.length > 20 ? book.title : ''}
												color="black"
												placement="bottomLeft"
											>
												<h3>{book.title}</h3>
											</Tooltip>
											<div className={scss.date_and_price}>
												<p>{book.dataOfDate}</p>
												<p className={scss.price}>{book.price} c</p>
											</div>
										</div>
									</div>
									<Modal
										open={deleteModal}
										onCancel={() => {
											setDeleteModal(false);
										}}
										footer={false}
										className={scss.delete_modal}
									>
										<div className={scss.delete_modal}>
											<p>Вы уверены, что хотите удалить?</p>
											<div className={scss.bt_modal}>
												<button
													onClick={() => {
														setDeleteModal(false);
													}}
												>
													Отменить
												</button>
												<button
													onClick={() => {
														handleDeleteBook(book.bookId);
													}}
												>
													Удалить
												</button>
											</div>
										</div>
									</Modal>
								</div>
							))}
						</div>
					</div>
				</section>
			)}
		</>
	);
};

export default BooksSection;
