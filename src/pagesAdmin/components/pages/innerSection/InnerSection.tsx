/* eslint-disable react-hooks/exhaustive-deps */
import {
	useApproveBookMutation,
	useRejectBookMutation
} from '@/src/redux/api/book';
import { useGetReceiptRequestedBooksQuery } from '@/src/redux/api/book';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import scss from './innerSection.module.scss';
import { IconX } from '@tabler/icons-react';
import { IconSuccess } from '@/src/assets/icons';
import { Modal, Tooltip, message } from 'antd';
import ThreeDotIcon from '@/src/assets/icons/icon-threeDot';
import IconGirl from '@/src/assets/icons/icon-girl';

const InnerSection = () => {
	const navigate = useNavigate();
	const [isOpen, setIsOpen] = useState(false);
	const [idBook, setIdBook] = useState<null | number>(null);
	const [modalSuccess, setModalSuccess] = useState(false);
	const [messageApi, handleMessage] = message.useMessage();
	const [value, setValue] = useState('');
	const {
		data: books,
		refetch,
		isLoading
	} = useGetReceiptRequestedBooksQuery();
	const [rejectBookById] = useRejectBookMutation();
	const [approveBook] = useApproveBookMutation();
	const location = useLocation();

	const handleBookClick = (id: number) => {
		navigate(`/admin/inner/${id}`);
		refetch();
	};

	useEffect(() => {
		if (location.pathname === '/admin') {
			refetch();
		}
	}, [location]);

	const handleRejectBook = async (id: number) => {
		const newData = {
			rejectReason: value
		};
		const result = await rejectBookById({ newData, id });
		if ('data' in result) {
			if (result.data?.httpStatus === 'OK') {
				messageApi.open({
					type: 'success',
					content: 'Книга Успешно отклонено'
				});
				refetch();
			}
		}
	};

	const [selectedBook, setSelectedBook] = useState<number | null>(null);
	const [isModalOpen, setIsModalOpen] = useState(false);

	const handleCancel = () => {
		setIsModalOpen(false);
		setSelectedBook(null);
	};

	const handleApproveBook = async (id: number) => {
		const result = await approveBook(id);
		if ('data' in result) {
			if (result.data?.httpStatus === 'OK') {
				setModalSuccess(true);
			}
		}

		setTimeout(() => {
			refetch();
		}, 2000);
	};

	useEffect(() => {
		if (modalSuccess) {
			setTimeout(() => {
				setModalSuccess(false);
			}, 2000);
		}
	}, [modalSuccess]);

	const handleOk = async () => {
		if (selectedBook !== null) {
			handleRejectBook(selectedBook);
		}
		setIsModalOpen(false);
		setSelectedBook(null);
	};

	// const [style, setStyle] = useState({ width: 268, height: 409 });

	// const updateStyle = () => {
	// 	const width = window.innerWidth;
	// 	if (width <= 576) {
	// 		setStyle({ width: 100, height: 200 });
	// 	} else if (width <= 768) {
	// 		setStyle({ width: 150, height: 250 });
	// 	} else if (width <= 992) {
	// 		setStyle({ width: 180, height: 300 });
	// 	} else if (width <= 1200) {
	// 		setStyle({ width: 230, height: 360 });
	// 	} else {
	// 		setStyle({ width: 268, height: 409 });
	// 	}
	// };

	// useEffect(() => {
	// 	window.addEventListener('resize', updateStyle);
	// 	updateStyle();

	// 	return () => window.removeEventListener('resize', updateStyle);
	// }, []);

	return (
		<>
			{isLoading ? (
				<>loading</>
			) : (
				<section className={scss.InnerSection}>
					{handleMessage}
					<div className={scss.container}>
						<div className={scss.total_quantity}>
							<p className={scss.books_quantity}>
								<span>Всего:</span>
								<span>{books?.books.length || 0}</span>
							</p>
							<p className={scss.books_unvie}>
								<span>Непросмотренные:</span>
								<span>
									{books?.books.filter((book) => !book.isViewed).length || 0}
								</span>
							</p>
						</div>
						<div className={scss.content}>
							{books?.books.length ? (
								books?.books.map((book) => (
									<div
										key={book.id}
										className={`${book.isViewed ? '' : scss.unviewedStyle} : ${scss.book}`}
									>
										<div
											className={scss.extra}
											onClick={() => {
												setIsOpen(!isOpen);
												setIdBook(book.id);
											}}
										>
											<ThreeDotIcon />
										</div>
										<>
											<div
												className={
													idBook === book.id
														? isOpen
															? scss.is_open
															: scss.on_close
														: scss.on_close
												}
											>
												<ul>
													<li onClick={() => handleApproveBook(book.id)}>
														<span>
															<IconSuccess />
														</span>
														Принять
													</li>
													<Modal
														open={modalSuccess}
														footer={false}
														onCancel={() => setModalSuccess(false)}
													>
														<div className={scss.modal_container}>
															<IconSuccess />
															<div className={scss.info_text}>
																<p>
																	<strong>“{book.title}”</strong>
																	успешно добавлен!
																</p>
															</div>
														</div>
													</Modal>
													<li
														onClick={() => {
															setIsOpen(false);
															setIsModalOpen(true);
															setSelectedBook(book.id);
														}}
													>
														<span>
															<IconX />
														</span>
														Отклонить
													</li>
												</ul>
											</div>
										</>
										<div
											onClick={() => handleBookClick(book.id)}
											className={scss.book_content}
										>
											<div className={scss.book_img}>
												<img src={book.imageUrl} alt={book.title} />
											</div>
											<div className={scss.info_book}>
												<Tooltip
													className={scss.info_hover}
													title={book.title.length > 20 ? book.title : ''}
													color="black"
													placement="bottomLeft"
												>
													<h3 className={scss.book_title}>{book.title}</h3>
												</Tooltip>
												<div className={scss.date_and_price}>
													<p>{book.createdAt.split('T')[0]}</p>
													<p className={scss.price}>{book.price} c</p>
												</div>
											</div>
										</div>
									</div>
								))
							) : (
								<div className={scss.no_books}>
									<IconGirl />
								</div>
							)}
						</div>
					</div>
					<Modal
						open={isModalOpen}
						footer={false}
						onCancel={() => {
							handleCancel();
						}}
					>
						<div className={scss.modal_deviation}>
							<p className={scss.text_deviation}>Причина вашего отклонения</p>
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
							<button onClick={() => handleOk()} className={scss.btn_deviation}>
								Отправить
							</button>
						</div>
					</Modal>
				</section>
			)}
		</>
	);
};

export default InnerSection;
