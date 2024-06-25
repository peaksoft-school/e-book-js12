import scss from './innerSection.module.scss';
import ThreeDotIcon from '@/src/assets/icons/icon-threeDot';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { IconX } from '@tabler/icons-react';
import { useGetReceiptRequestedBooksQuery } from '@/src/redux/api/innerPage';
import {
	useApproveBookMutation,
	useRejectBookMutation
} from '@/src/redux/api/book';
import { Modal, Tooltip } from 'antd';
import IconGirl from '@/src/assets/icons/icon-girl';
import { useDispatch } from 'react-redux';
import { IconSuccess } from '@/src/assets/icons';

const InnerSection = () => {
	const navigate = useNavigate();
	const [isOpen, setIsOpen] = useState(false);
	const [idBook, setIdBook] = useState<null | number>(null);
	const [modalSuccess, setModalSuccess] = useState(false);
	const {
		data: books,
		refetch,
		isLoading
	} = useGetReceiptRequestedBooksQuery();
	const [rejectBookById] = useRejectBookMutation();
	const [approveBook] = useApproveBookMutation();

	const handleBookClick = (id: number) => {
		navigate(`/admin/inner/${id}`);
		refetch();
	};

	const handleRejectBook = async (id: number, rejectReason: string) => {
		const newData = {
			rejectReason
		};
		await rejectBookById({ newData, id });
		refetch();
	};

	const [selectedBook, setSelectedBook] = useState<number | null>(null);
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [rejectReason, setRejectReason] = useState('');
	const dispatch = useDispatch();

	const showModal = (bookId: number) => {
		setSelectedBook(bookId);
		setIsModalOpen(true);
	};

	const handleOk = async () => {
		if (selectedBook !== null) {
			await handleRejectBook(selectedBook, rejectReason);
		}
		setIsModalOpen(false);
		setSelectedBook(null);
		setRejectReason('');
	};

	const handleCancel = () => {
		setIsModalOpen(false);
		setSelectedBook(null);
		setRejectReason('');
	};

	const handleApproveBook = async (id: number) => {
		await approveBook(id);
		setModalSuccess(true);
		dispatch({
			type: 'ADD_NOTIFICATION',
			payload: {
				message: `Book "${books?.title}" approved successfully!`,
				createdAt: Date.now(),
				notificationType: 'success'
			}
		});
	};

	return (
		<>
			{isLoading ? (
				<>loading</>
			) : (
				<section className={scss.InnerSection}>
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
										{idBook === book.id && (
											<div className={isOpen ? scss.is_open : scss.on_close}>
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
																	<span>“{book.title}”</span> <br />
																	успешно добавлен!
																</p>
															</div>
														</div>
													</Modal>
													<li
														onClick={() => {
															setIsOpen(false);
															showModal(book.id);
														}}
													>
														<span>
															<IconX />
														</span>
														Отклонить
													</li>
												</ul>
											</div>
										)}

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
						visible={isModalOpen}
						onOk={handleOk}
						onCancel={handleCancel}
						footer={null}
						className={scss.delete_modal}
					>
						<div className={scss.delete_modal}>
							<p>Вы уверены, что хотите отклонить?</p>
							<div className={scss.bt_modal}>
								<button onClick={handleCancel}>Отменить</button>
								<button onClick={handleOk}>Удалить</button>
							</div>
						</div>
					</Modal>
				</section>
			)}
		</>
	);
};

export default InnerSection;
