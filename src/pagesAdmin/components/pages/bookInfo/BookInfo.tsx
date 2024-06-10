/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-irregular-whitespace */
import scss from './BookInfo.module.scss';
import { FC, useState } from 'react';
import CustomBasketButton from '@/src/ui/customButton/CustomBasketButton';
import CustomPersonalAreaButton from '@/src/ui/customButton/CustomPersonalArea';
import { Modal } from 'antd';
import { IconSuccess } from '@/src/assets/icons';
import {
	useApproveBookMutation,
	useGetBookByIdQuery,
	useRejectBookMutation
} from '@/src/redux/api/book';
import { useNavigate, useParams } from 'react-router-dom';

interface BookIdProps {
	id: number;
}

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
}

const BookInfo: FC<BookIdProps> = () => {
	const [showBookInfo, setShowBookInfo] = useState(false);
	const [modalSuccess, setModalSuccess] = useState(false);
	const [deviationModal, setDeviationModal] = useState(false);
	const [value, setValue] = useState('');
	const { id } = useParams();
	const bookId = Number(id);
	const { data: book, isLoading } = useGetBookByIdQuery<GetResponse>(bookId);
	const [approveBook] = useApproveBookMutation();
	const [rejectBook] = useRejectBookMutation();
	const navigate = useNavigate();

	const handleApproveBook = async (id: number) => {
		await approveBook(id);
		setModalSuccess(true);
	};

	const handleRejectBook = async (id: number) => {
		const newData = {
			rejectReason: value
		};
		await rejectBook({ newData, id });
		setDeviationModal(false);
	};

	if (isLoading) return <p>Загрузка...</p>;
	if (!book) return <p>Ошибка загрузки данных книги</p>;

	return (
		<>
			<section className={scss.Book_info}>
				<div className="container">
					<div className={scss.content}>
						<div className={scss.content_text}>
							<p onClick={() => navigate('/admin')}>Заявки </p>
							<h4>/ {book.title}</h4>
						</div>
						<div className={scss.contents_book}>
							<div className={scss.section_about_book}>
								<div className={scss.woman_book}>
									<img src={book.imageUrlFirst} alt={book.title} />
								</div>
							</div>
							<div className={scss.section_content_text}>
								<div className={scss.section_title}>
									<h3>{book.title}</h3>
								</div>
								<div className={scss.section_mony}>
									<p>{book.price} с</p>
									{book.bookType === 'AUDIO_BOOK' && (
										<div>
											<audio id="audioPlayer" controls>
												<source src={book.fragmentAudUrl} type="audio/mpeg" />
											</audio>
										</div>
									)}
								</div>
								<div className={scss.section_info}>
									<div className={scss.section_info_name}>
										<p>Автор</p>
										<p>Жанр</p>
										<p>Язык</p>
										<p>Издательство</p>
										<p>Год выпуска</p>
										{book.bookType === 'AUDIO_BOOK' ? (
											<p>Длительность</p>
										) : (
											<p>Объем</p>
										)}
									</div>
									<div className={scss.section_info_two}>
										<p>{book.authorsFullName}</p>
										<p>{book.genre}</p>
										<p>{book.language}</p>
										<p>{book.publishingHouse}</p>
										<p>{book.publishedYear}</p>
										{book.bookType === 'AUDIO_BOOK' ? (
											<p>{book.duration}</p>
										) : (
											<p>{book.volume}</p>
										)}
									</div>
								</div>

								<div className={scss.section_book}>
									<CustomPersonalAreaButton
										nameClass={`${scss.favorite_btn}`}
										onClick={() => {
											setDeviationModal(true);
										}}
									>
										<p className={scss.boot1}>Отклонить</p>
									</CustomPersonalAreaButton>
									<Modal
										open={deviationModal}
										footer={false}
										onCancel={() => {
											setDeviationModal(false);
										}}
									>
										<div className={scss.modal_deviation}>
											<p className={scss.text_deviation}>
												Причина вашего отклонения
											</p>
											<input
												className={scss.input_deviation}
												type="text"
												placeholder="Причина вашего отклонения"
												value={value}
												onChange={(e) => {
													setValue(e.target.value);
												}}
											/>
											<button
												onClick={() => handleRejectBook(bookId)}
												className={scss.btn_deviation}
											>
												Отправить
											</button>
										</div>
									</Modal>

									<CustomBasketButton
										nameClass={scss.basket_btn}
										onClick={() => handleApproveBook(bookId)}
										type="button"
									>
										<p className={scss.boot1}>Принять</p>
									</CustomBasketButton>
									<Modal
										open={modalSuccess}
										footer={false}
										onCancel={() => {
											setModalSuccess(false);
										}}
									>
										<div className={scss.modal_container}>
											<IconSuccess />
											<div className={scss.info_text}>
												<p>
													<span>“{book.title}”</span> <br />
													успешно добавлен!
												</p>
											</div>
										</div>
									</Modal>
								</div>
							</div>
						</div>
						<div className={scss.section_text_books}>
							<div className={scss.section_show_info}>
								<div className={scss.show_info_book}>
									{book.bookType === 'PAPER_BOOK' && (
										<p
											className={!showBookInfo ? scss.color_text : ''}
											onClick={() => setShowBookInfo(false)}
										>
											О книге
										</p>
									)}
									<p
										className={showBookInfo ? scss.color_text : ''}
										onClick={() => setShowBookInfo(true)}
									>
										Читать фрагмент
									</p>
								</div>
								<p className={scss.book_info}>
									{showBookInfo ? book.fragment || '' : book.description}
								</p>
							</div>
							<div className={scss.info_img}>
								<img src={book.imageUrlLast} alt="Book List" />
							</div>
						</div>
					</div>
				</div>
			</section>
		</>
	);
};

export default BookInfo;
