/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from 'react';
import { Modal } from 'antd';
import scss from './AboutBook.module.scss';
import CustomBasketButton from '@/src/ui/customButton/CustomBasketButton';
import CustomPersonalAreaButton from '@/src/ui/customButton/CustomPersonalArea';
import harryPotterImg from '../../../../assets/booksImg/harry-potter-chamber.png';
import { Link, useParams } from 'react-router-dom';
import { IconWhiteLike } from '@/src/assets/icons';
import { useGetBookByIdQuery } from '@/src/redux/api/book';

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

	const { id } = useParams();
	const bookId = Number(id);
	const { data: book, isLoading } = useGetBookByIdQuery<GetResponse>(bookId);

	const showModal = (book: any) => {
		setSelectedVendor(book);
		setIsModalOpen(true);
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
								<img src={harryPotterImg} alt="Harry Potter" />
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
										<p>({book.quantityOfFavorite})</p>
									</div>
									<div className={scss.in_basket}>
										<p>В корзине({book.quantityOfBasket})</p>
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
									onClick={() => {}}
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
								<p
									className={`${aboutBook ? '' : scss.color_text}`}
									onClick={() => {
										setAboutBook(false);
									}}
								>
									O книге
								</p>
								<p
									className={`${aboutBook ? scss.color_text : ''}`}
									onClick={() => {
										setAboutBook(true);
									}}
								>
									Читать фрагмент
								</p>
							</div>
							{aboutBook ? (
								<>
									<p className={scss.book_info}>{book.description}</p>
								</>
							) : (
								<>
									<p className={scss.book_info}>{book.fragment}</p>
								</>
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
