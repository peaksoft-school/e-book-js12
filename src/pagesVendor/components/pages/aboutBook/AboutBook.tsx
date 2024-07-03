/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from 'react';
import { Modal, Tooltip } from 'antd';
import scss from './AboutBook.module.scss';
import CustomBasketButton from '@/src/ui/customButton/CustomBasketButton';
import CustomPersonalAreaButton from '@/src/ui/customButton/CustomPersonalArea';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { IconWhiteLike } from '@/src/assets/icons';
import {
	useDeleteBookMutation,
	useGetByIdVendorQuery
} from '@/src/redux/api/book';

const AboutBook = () => {
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [aboutBook, setAboutBook] = useState(false);
	const [, setSelectedVendor] = useState(null);

	const navigate = useNavigate();

	const { id } = useParams();
	const bookId = Number(id);
	const { data: book, isLoading } = useGetByIdVendorQuery(bookId);
	console.log(book);

	const showModal = (book: any) => {
		setSelectedVendor(book);
		setIsModalOpen(true);
	};

	const [deleteBook] = useDeleteBookMutation();

	const handleDeleteBook = async (id: number) => {
		const result = (await deleteBook(id)) as BOOK.DeleteProductResponse;
		if ('data' in result) {
			if (result.data?.httpStatus === 'OK') {
				setIsModalOpen(false);
				navigate('/vendor/home');
			}
		}
	};
	if (isLoading) return <p>Загрузка...</p>;
	if (!book) return <p>Ошибка загрузки данных книги</p>;

	const language = [
		{
			id: 1,
			name: 'ENGLISH',
			nameRus: 'Английский язык'
		},
		{
			id: 2,
			name: 'RUSSIAN',
			nameRus: 'Русский язык'
		},
		{
			id: 3,
			name: 'KYRGYZ',
			nameRus: 'Кыргызский язык'
		}
	];

	const genreBook = [
		{
			genreId: 1,
			genreName: 'Художественная литература',
			englishName: 'ARTISTIC_LITERATURE',
			isChecked: false
		},
		{
			genreId: 2,
			genreName: 'Образование',
			englishName: 'EDUCATION',
			isChecked: false
		},
		{
			genreId: 3,
			genreName: 'Книги для детей',
			englishName: 'BOOKS_FOR_CHILDREN',
			isChecked: false
		},
		{
			genreId: 4,
			genreName: 'Наука и технология',
			englishName: 'SCIENCE_AND_TECHNOLOGY',
			isChecked: false
		},
		{
			genreId: 5,
			genreName: 'Сообщество',
			englishName: 'COMMUNITY',
			isChecked: false
		},
		{
			genreId: 6,
			genreName: 'Бизнес литература',
			englishName: 'BUSINESS_LITERATURE',
			isChecked: false
		},
		{
			genreId: 7,
			genreName: 'Красота, здоровье, спорт',
			englishName: 'BEAUTY_HEALTH_SPORT',
			isChecked: false
		},
		{
			genreId: 8,
			genreName: 'Увлечения',
			englishName: 'HOBBIES',
			isChecked: false
		},
		{
			genreId: 9,
			genreName: 'Психология',
			englishName: 'PSYCHOLOGY',
			isChecked: false
		}
	];



	return (
		<section className={scss.AboutBook}>
			<div className="container">
				<div className={scss.content}>
					<div className={scss.links}>
						<Link
							to="/vendor/home"
							className={`${scss.link_to_home} ${
								location.pathname === '/vendor/' ? scss.link_to_home_active : ''
							}`}
						>
							{/* {locationFunction()} */}
							Главная
						</Link>
						/
						<Tooltip
							title={book.title.length > 20 ? book.title : ''}
							color="black"
							placement="bottomLeft"
						>
							<span className={scss.link_to_vendor_page}>{book.title}</span>
						</Tooltip>
					</div>
					<div className={scss.contents_book}>
						<div className={scss.section_about_book}>
							<div className={scss.woman_book}>
								<img src={book.imageUrlFirst} alt={book.title} />
							</div>
						</div>
						<div className={scss.section_content_text}>
							<div className={scss.section_title}>
								<div className={scss.book_header}>
									<div className={scss.hearts}>
										<IconWhiteLike />
										<p>({book.countFavorite > 0 ? book.countFavorite : 0})</p>
									</div>
									<div className={scss.in_basket}>
										<p>
											В корзине ({book.countBasket > 0 ? book.countBasket : 0})
										</p>
									</div>
								</div>
								<Tooltip
									title={book.title.length > 20 ? book.title : ''}
									color="black"
									placement="bottomLeft"
								>
									<h3>{book.title}</h3>
								</Tooltip>
							</div>
							<div className={scss.section_mony}>
								<p>365 c</p>
								{book.bookType === 'AUDIO_BOOK' ? (
									<div className={scss.audioBook}>
										<audio id="audioPlayer" controls>
											<source src={book.fragmentAudUrl} type="audio/mpeg" />
										</audio>
									</div>
								) : null}
							</div>
							<div className={scss.section_info}>
								<div className={scss.section_info_name}>
									<p>Автор</p>
									<p>Жанр</p>
									<p>Язык</p>
									{book.bookType === 'AUDIO_BOOK' ? null : (
										<>
											<p>Издательство</p>
										</>
									)}
									<p>Год выпуска</p>
									{book.bookType === 'AUDIO_BOOK' ? (
										<>
											<p>Длительность</p>
										</>
									) : (
										<>
											<p>Объем</p>
										</>
									)}
								</div>
								<div className={scss.section_info_two}>
									<Tooltip
										title={
											book.authorsFullName.length > 20
												? book.authorsFullName
												: ''
										}
										color="black"
										placement="bottomLeft"
									>
										<p className={scss.authorsFullName}>
											{book.authorsFullName}
										</p>
									</Tooltip>
									<p>
										{genreBook.find((genre) => genre.englishName === book.genre)
											?.genreName || book.genre}
									</p>
									<p>
										{language.find((lang) => lang.name === book.language)
											?.nameRus || book.language}
									</p>
									{book.bookType === 'AUDIO_BOOK' ? null : (
										<>
											<p>{book.publishingHouse}</p>
										</>
									)}
									<p>{book.publishedYear}</p>
									{book.bookType === 'AUDIO_BOOK' ? (
										<>
											<p>{book.duration}</p>
										</>
									) : (
										<>
											<p>{book.volume}</p>
										</>
									)}
								</div>
							</div>
							<div className={scss.section_book}>
								<CustomPersonalAreaButton
									nameClass={`${scss.favorite_btn}`}
									onClick={() => {
										setIsModalOpen(true);
									}}
								>
									<p className={scss.boot1} onClick={showModal}>
										Удалить
									</p>
								</CustomPersonalAreaButton>
								<Modal
									visible={isModalOpen}
									onCancel={() => {
										setIsModalOpen(false);
									}}
									footer={false}
									closable={false}
									className={scss.modal_delete}
								>
									<div className={scss.modal_delete_content}>
										<p>
											Вы уверены, что хотите удалить <br />
											<span>{book.title}?</span>
										</p>
										<div className={scss.modal_delete_btn}>
											<button
												onClick={() => {
													setIsModalOpen(false);
												}}
											>
												Отменить
											</button>
											<button
												onClick={() => {
													handleDeleteBook(bookId);
												}}
											>
												Удалить
											</button>
										</div>
									</div>
								</Modal>
								<CustomBasketButton
									nameClass={scss.basket_btn}
									onClick={() => {
										navigate(`/vendor/home/editBook/${book.bookId}`);
									}}
								>
									<p className={scss.boot1}>Редактировать</p>
								</CustomBasketButton>
							</div>
						</div>
					</div>
					<div className={scss.section_text_books}>
						<div className={scss.section_show_info}>
							<div className={scss.show_info_book}>
								{book.bookType === 'AUDIO_BOOK' ? (
									<>
										<p
											className={!aboutBook ? scss.color_text : ''}
											onClick={() => setAboutBook(false)}
										>
											О книге
										</p>
									</>
								) : (
									<>
										<p
											className={!aboutBook ? scss.color_text : ''}
											onClick={() => setAboutBook(false)}
										>
											О книге
										</p>
										<p
											className={aboutBook ? scss.color_text : ''}
											onClick={() => setAboutBook(true)}
										>
											Читать фрагмент
										</p>
									</>
								)}
							</div>
							{aboutBook ? (
								<p className={scss.book_info}>{book.fragment}</p>
							) : (
								<p className={scss.book_info}>{book.description}</p>
							)}
						</div>
						<div className={scss.info_img}>
							<img src={book.imageUrlLast} alt="Book List" />
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};

export default AboutBook;
