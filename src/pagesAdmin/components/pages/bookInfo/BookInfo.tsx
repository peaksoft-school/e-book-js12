/* eslint-disable @typescript-eslint/no-explicit-any */
import { FC, useState } from 'react';
import scss from './BookInfo.module.scss';
import CustomBasketButton from '@/src/ui/customButton/CustomBasketButton';
import CustomPersonalAreaButton from '@/src/ui/customButton/CustomPersonalArea';
import { Modal, Tooltip } from 'antd';
import { IconSuccess } from '@/src/assets/icons';
import {
	useApproveBookMutation,
	useDeleteBookMutation,
	useGetBookByIdQuery,
	useRejectBookMutation
} from '@/src/redux/api/book';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';

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

const BookInfo: FC = () => {
	const [showBookInfo, setShowBookInfo] = useState(false);
	const [modalSuccess, setModalSuccess] = useState(false);
	const [deviationModal, setDeviationModal] = useState(false);
	const [value, setValue] = useState('');
	const { id } = useParams();
	const bookId = Number(id);
	const { data: book, isLoading } = useGetBookByIdQuery<GetResponse>(bookId);

	const [deleteBook] = useDeleteBookMutation();
	const [approveBook] = useApproveBookMutation();
	const [rejectBook] = useRejectBookMutation();
	const [messageRejected, setRejectedMessage] = useState('');
	const [messageApproeved, setApprovedMessage] = useState('');
	const navigate = useNavigate();
	const location = useLocation();
	const dispatch = useDispatch();

	const deleteBookId = async (bookId: number) => {
		await deleteBook(bookId);
	};
	const handleApproveBook = async (id: number) => {
		const result = await approveBook(id);

		if ('data' in result) {
			console.log(result);
			if (result.data?.httpStatus === 'OK') {
				setApprovedMessage(result.data.message);
				setModalSuccess(true);
				setTimeout(() => {
					navigate('/admin');
				}, 2000);
			}
		}
		setTimeout(() => {
			setModalSuccess(false);
		}, 2000);
		dispatch({
			type: 'ADD_NOTIFICATION',
			payload: {
				message: `Book "${book?.title}" approved successfully!`,
				createdAt: Date.now(),
				notificationType: 'success',
				bookId: id
			}
		});
	};

	const handleRejectBook = async (id: number) => {
		const newData = {
			rejectReason: value
		};
		const result = await rejectBook({ newData, id });
		console.log(result);
		if ('data' in result) {
			if (result.data.httpStatus === 'OK') {
				setModalSuccess(true);
				setRejectedMessage(result.data.message);
				setTimeout(() => {
					navigate('/admin');
				}, 2000);
			}
		}
		setDeviationModal(false);
		dispatch({
			type: 'ADD_NOTIFICATION',
			payload: {
				message: `Book "${book?.title}" rejected. Reason: ${value}`,
				createdAt: Date.now(),
				notificationType: 'error'
			}
		});
	};
	console.log(messageRejected);
	console.log(messageApproeved);

	if (isLoading) return <p>Загрузка...</p>;
	if (!book) return <p>Ошибка загрузки данных книги</p>;

	const locationFunction = () => {
		if (/^\/admin\/inner\/\d+$/.test(location.pathname)) {
			return <p onClick={() => navigate('/admin')}>Заявки</p>;
		} else if (/^\/admin\/vendors\/books\/\d+$/.test(location.pathname)) {
			return <p onClick={() => navigate('/admin/vendors')}>Продавцы</p>;
		} else if (/^\/admin\/users\/\d+$/.test(location.pathname)) {
			return <p onClick={() => navigate('/admin/users')}>Пользователи</p>;
		} else if (/^\/admin\/books\/\d+$/.test(location.pathname)) {
			return <p onClick={() => navigate('/admin/books')}>Книги</p>;
		} else if (/^\/admin\/users\/\d+\/\d+$/.test(location.pathname)) {
			return <p onClick={() => navigate('/admin/users')}>Пользователи</p>;
		}
		return null;
	};

	const hadnleGenre = () => {
		switch (book.genre) {
			case 'ARTISTIC_LITERATURE':
				return 'Художественная литература';
			case 'EDUCATION':
				return 'Образование';
			case 'BOOKS_FOR_CHILDREN':
				return 'Книги для детей';
			case 'SCIENCE_AND_TECHNOLOGY':
				return 'Наука и технология';
			case 'COMMUNITY':
				return 'Сообщество';
			case 'BUSINESS_LITERATURE':
				return 'Бизнес литература';
			case 'BEAUTY_HEALTH_SPORT':
				return 'Красота, здоровье, спорт';
			case 'HOBBIES':
				return 'Увлечения';
			case 'PSYCHOLOGY':
				return 'Психология';
		}
	};

	const filltredLanguage = () => {
		switch (book.language) {
			case 'KYRGYZ':
				return 'Кыргызский язык';
			case 'RUSSIAN':
				return 'Русский язык';
			case 'ENGLISH':
				return 'Английский язык';
		}
	};

	return (
		<section className={scss.Book_info}>
			<div className="container">
				<div className={scss.content}>
					<div className={scss.content_text}>
						{locationFunction()}
						<Tooltip
							className={scss.info_hover}
							title={book.title.length > 10 ? book.title : ''}
							color="black"
							placement="bottomLeft"
						>
							<h4 className={scss.content_head}>/ {book.title}</h4>
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
								<Tooltip
									className={scss.info_hover}
									title={book.title.length > 10 ? book.title : ''}
									color="black"
									placement="bottomLeft"
								>
									<h3>{book.title}</h3>
								</Tooltip>
							</div>
							<div className={scss.section_mony}>
								<p>{book.price} с</p>
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
										<p>Длительность</p>
									) : (
										<p>Объем</p>
									)}
								</div>
								<div className={scss.section_info_two}>
									<Tooltip
										className={scss.info_hover}
										title={
											book.authorsFullName.length > 20
												? book.authorsFullName
												: ''
										}
										color="black"
										placement="bottomLeft"
									>
										<p>{book.authorsFullName}</p>
									</Tooltip>
									<p>{hadnleGenre()}</p>
									<p>{filltredLanguage()}</p>
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
								{location.pathname === `/admin/books/${id}` ? (
									<CustomPersonalAreaButton
										nameClass={`${scss.favorite_btn}`}
										onClick={() => {
											deleteBookId(bookId);
										}}
									>
										<p className={scss.boot1}>Удалить</p>
									</CustomPersonalAreaButton>
								) : (
									<CustomPersonalAreaButton
										nameClass={`${scss.favorite_btn}`}
										onClick={() => {
											setDeviationModal(true);
										}}
									>
										<p className={scss.boot1}>Отклонить</p>
									</CustomPersonalAreaButton>
								)}

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
										<textarea
											className={scss.input_deviation}
											placeholder="Причина вашего отклонения..."
											value={value}
											onChange={(e) => {
												setValue(e.target.value);
											}}
											rows={483}
											cols={108}
										/>
										<button
											onClick={() => handleRejectBook(bookId)}
											className={scss.btn_deviation}
										>
											Отправить
										</button>
									</div>
								</Modal>
								{location.pathname === `/admin/books/${id}` ? (
									<CustomBasketButton
										nameClass={scss.basket_btn}
										onClick={() => {}}
										type="button"
									>
										<p className={scss.boot1}>Редактировать</p>
									</CustomBasketButton>
								) : (
									<CustomBasketButton
										nameClass={scss.basket_btn}
										onClick={() => handleApproveBook(bookId)}
										type="button"
									>
										<p className={scss.boot1}>Принять</p>
									</CustomBasketButton>
								)}

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
											{messageRejected && (
												<p>
													<strong>”{book.title}”</strong>
													Отклонен
												</p>
											)}
											{messageApproeved && (
												<p>
													<strong>”{book.title}” </strong>
													Успешно принят
												</p>
											)}
										</div>
									</div>
								</Modal>
							</div>
						</div>
					</div>
					<div className={scss.section_text_books}>
						<div className={scss.section_show_info}>
							<div className={scss.show_info_book}>
								{(book.bookType === 'PAPER_BOOK' ||
									'AUDIO_BOOK' ||
									book.bookType === 'ONLINE_BOOK') && (
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
	);
};

export default BookInfo;
