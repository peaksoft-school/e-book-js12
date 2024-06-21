/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from 'react';
import { Modal } from 'antd';
import scss from './AboutVendorsBooks.module.scss';
import ThreeDotIcon from '@/src/assets/icons/icon-threeDot';
import UpIcon from '@/src/assets/icons/icon-upIcon';
import { IconArrowBottom, IconWhiteLike } from '@/src/assets/icons';
import { IconPencil, IconX } from '@tabler/icons-react';
import {
	useGetAllVendorBooksQuery,
} from '@/src/redux/api/book';
import { useDeleteVendorProfileMutation } from '@/src/redux/api/vendors';
import { useNavigate, useParams } from 'react-router-dom';

const AboutVendorsBooks = () => {
	const [isOpen, setIsOpen] = useState<boolean>(false);
	const [operationType, setOperationType] = useState<string>('ALL');
	const [isOpenBooksType, setIsOpenBooksType] = useState<boolean>(false);
	const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
	const [selectedVendor, setSelectedVendor] = useState<number | null>(null);
	const [idBook, setIdBook] = useState<null | number>(null);
	const navigate = useNavigate();
	const { name } = useParams<{ name: string }>();
	const vendorId = Number(name);


	const filterBooks = [
		{ id: 1, label: 'ALL', type: 'Все' },
		{ id: 2, label: 'IN_BASKET', type: 'В корзине' },
		{ id: 3, label: 'IN_FAVORITE', type: 'В избранном' },
		{ id: 4, label: 'WITH_DISCOUNT', type: 'Со скидками' },
		{ id: 5, label: 'SOLD', type: 'Проданы' }
	];

	const { data } = useGetAllVendorBooksQuery({
		vendorId: vendorId,
		operationType: operationType,
		page: 1,
		pageSize: 100
	});

	const [deleteVendorProfile] = useDeleteVendorProfileMutation();

	const showModal = (vendor: number | null) => {
		setSelectedVendor(vendor);
		setIsModalOpen(true);
	};

	const handleDeleteVendorProfile = async (vendorId: any) => {
		await deleteVendorProfile(vendorId);
		navigate('/admin/vendors');
	};

	const handleCancel = () => {
		setIsModalOpen(false);
		setSelectedVendor(null);
	};

	const toggleTypeList = (): void => {
		setIsOpenBooksType(!isOpenBooksType);
	};

	const getBookTypeText = (operationType: string) => {
		const filter = filterBooks.find((item) => item.label === operationType);
		return filter ? filter.type : 'Все';
	};

	const filteredBooks = operationType
		? data?.filter((book) => {
				if (operationType === 'ALL') return true;
				if (operationType === 'IN_FAVORITE') return book.quantityOfFavorite > 0;
				if (operationType === 'IN_BASKET') return book.quantityOfBasket > 0;
				if (operationType === 'WITH_DISCOUNT') return book.discount > 0;
				if (operationType === 'SOLD')
					return book.quantityOfBasket === 0 && book.quantityOfFavorite === 0;
				return true;
			})
		: data;

	const handleBookClick = (id: number) => {
		navigate(`/admin/vendors/books/${id}`);
	};

	const handleThreeDotClick = (id: number) => {
		setIsOpen((prev) => (prev && idBook === id ? false : true));
		setIdBook(id);
	};



	return (
		<section className={scss.AboutVendorsBooks}>
			<div className={scss.container}>
				<div className={scss.total_quantity}>
					<p>Всего: {filteredBooks?.length} книг</p>
					<div className={scss.click}>
						<p onClick={toggleTypeList}>
							<span>{getBookTypeText(operationType)}</span>
							<span>{isOpenBooksType ? <UpIcon /> : <IconArrowBottom />}</span>
						</p>
						<div
							className={`${isOpenBooksType ? scss.type_list : scss.none_books_type}`}
						>
							{filterBooks.map((item) => (
								<p
									key={item.id}
									onClick={() => {
										setOperationType(item.label);
										toggleTypeList();
									}}
								>
									{item.type}
								</p>
							))}
						</div>
					</div>
				</div>
				<hr />
				<div className={scss.content}>
					{filteredBooks?.map((book) => (
						<div key={book.id} className={scss.book}>
							<div className={scss.book_header}>
								<div className={scss.hearts}>
									<IconWhiteLike />
									<p>{book.quantityOfFavorite}</p>
								</div>
								<div className={scss.in_basket}>
									<p>В корзине ({book.quantityOfBasket})</p>
								</div>
							</div>
							<div
								className={scss.extra}
								onClick={(e) => {
									e.stopPropagation();
									handleThreeDotClick(book.id);
								}}
							>
								<ThreeDotIcon />
							</div>
							{book.id === idBook && isOpen ? (
								<div className={scss.is_open}>
									<ul>
										<li>
											<span>
												<IconPencil />
											</span>
											Редактировать
										</li>
										<hr />
										<li
											onClick={() => {
												setIsOpen(false);
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
								onClick={() => handleBookClick(book.id)}
							>
								<div className={scss.book_img}>
									<img src={book.imageLink} alt="" />
								</div>
								<div className={scss.info_book}>
									<h3>{book.bookName}</h3>
									<div className={scss.date_and_price}>
										<p>{book.publishedYear}</p>
										<p className={scss.price}>{book.price} c</p>
									</div>
								</div>
							</div>
						</div>
					))}
				</div>
				<div className={scss.div_delete}>
					<button
						className={scss.delete_profile}
						onClick={() => showModal(selectedVendor)}
					>
						Удалить профиль
					</button>
				</div>
				<Modal onCancel={handleCancel} footer={false} open={isModalOpen}>
					<div className={scss.delete_modals}>
						<p>Вы уверены, что хотите удалить профиль?</p>
						<div className={scss.buttons_modal}>
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
									handleDeleteVendorProfile(vendorId);
								}}
							>
								Удалить
							</button>
						</div>
					</div>
				</Modal>
			</div>
		</section>
	);
};

export default AboutVendorsBooks;
