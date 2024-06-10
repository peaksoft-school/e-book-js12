/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from 'react';
import { Modal } from 'antd';
import scss from './AboutBook.module.scss';
import CustomBasketButton from '@/src/ui/customButton/CustomBasketButton';
import CustomPersonalAreaButton from '@/src/ui/customButton/CustomPersonalArea';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { IconWhiteLike } from '@/src/assets/icons';
import {
	useDeleteBookMutation,
	useGetBookByIdQuery
} from '@/src/redux/api/book';

interface GetResponse {
	data: BookData;
	isLoading: boolean;
	error: any;
}

interface BookData {
	id?: number;
	imageUrlFirst: string;
	imageUrlLast: string;
	bookType: string;
	title: string;
	authorsFullName: string;
	genre: string;
	publishingHouse: string;
	description: string;
	fragment: string;
	language: string;
	publishedYear: number;
	volume: number;
	discount: number;
	price: number;
	fragmentAudUrl: string;
	duration: string;
	statusBook: string;
	quantityOfFavorite: number;
	quantityOfBasket: number;
}

const AboutBook = () => {
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [aboutBook, setAboutBook] = useState(false);
	const [, setSelectedVendor] = useState(null);

	const navigate = useNavigate();

	const { id } = useParams();
	const bookId = Number(id);
	const { data: book, isLoading } = useGetBookByIdQuery<GetResponse>(bookId);
	console.log(book);

	const showModal = (book: any) => {
		setSelectedVendor(book);
		setIsModalOpen(true);
	};

	const [deleteBook] = useDeleteBookMutation();
	const handleDeleteBook = async (id: number) => {
		const result = await deleteBook(id);
		if ('data' in result) {
			if (result.data?.httpStatus === 'OK') {
				navigate('/vendor/home');
			}
		}
	};

	if (isLoading) return <p>Загрузка...</p>;
	if (!book) return <p>Ошибка загрузки данных книги</p>;

	return (
		<section className={scss.AboutBook}>
			<div className="container">
				<div className={scss.content}>
					<div className={scss.links}>
						<Link
							to="/vendor"
							className={`${scss.link_to_home} ${
								location.pathname === '/vendor' ? scss.link_to_home_active : ''
							}`}
						>
							Главная
						</Link>
						/<span className={scss.link_to_vendor_page}>{book.title}</span>
					</div>
					<div className={scss.contents_book}>
						<div className={scss.section_about_book}>
							<div className={scss.woman_book}>
								<img src={book.imageUrlFirst} alt="Harry Potter" />
							</div>
						</div>
						<div className={scss.section_content_text}>
							<div>
								<p></p>
							</div>
							<div className={scss.section_title}>
								<div className={scss.book_header}>
									<div className={scss.hearts}>
										<IconWhiteLike />
										<p>
											(
											{book.quantityOfFavorite > 0
												? book.quantityOfFavorite
												: 0}
											)
										</p>
									</div>
									<div className={scss.in_basket}>
										<p>
											В корзине (
											{book.quantityOfBasket > 0 ? book.quantityOfBasket : 0})
										</p>
									</div>
								</div>
								<h3>{book.title}</h3>
							</div>
							<div className={scss.section_mony}>
								<p>365 c</p>
							</div>
							<div className={scss.section_info}>
								<div className={scss.section_info_name}>
									<p>Автор</p>
									<p>Жанр</p>
									<p>Язык</p>
									<p>Издательство</p>
									<p>Год выпуска</p>
									<p>Обьем</p>
								</div>
								<div className={scss.section_info_two}>
									<p>{book.authorsFullName}</p>
									<p>{book.genre}</p>
									<p>{book.language}</p>
									<p>{book.publishingHouse}</p>
									<p>{book.publishedYear}</p>
									<p>{book.volume}</p>
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
											<span>“Гарри Потер и Тайная комната” ? </span>
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
													setIsModalOpen(false);
												}}
											>
												Удалить
											</button>
										</div>
									</div>
								</Modal>
								<CustomBasketButton
									nameClass={scss.basket_btn}
									onClick={function (): void {}}
								>
									<p className={scss.boot1}>Редактировать</p>
								</CustomBasketButton>
							</div>
						</div>
					</div>
					<div className={scss.section_text_books}>
						<div className={scss.section_show_info}>
							<div className={scss.show_info_book}>
								{book.bookType === 'PAPER_BOOK' && (
									<p
										className={!aboutBook ? scss.color_text : ''}
										onClick={() => setAboutBook(false)}
									>
										О книге
									</p>
								)}
								<p
									className={aboutBook ? scss.color_text : ''}
									onClick={() => setAboutBook(true)}
								>
									Читать фрагмент
								</p>
							</div>
							<p className={scss.book_info}>
								{aboutBook ? book.fragment || '' : book.description}
							</p>
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
