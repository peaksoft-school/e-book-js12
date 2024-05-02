import React, { useState } from 'react';
import { Modal } from 'antd';
import scss from './AboutVendorsBooks.module.scss';
import bookImage from '../../../../assets/booksImg/harrry-potter.png';
import ThreeDotIcon from '@/src/assets/icons/icon-threeDot';
import { IconPencil, IconX } from '@tabler/icons-react';

const AboutVendorsBooks = () => {
	const [isOpen, setIsOpen] = useState(false);
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [selectedVendor, setSelectedVendor] = useState<Vendor | null>(null);

	const books = [
		{
			id: 1,
			img: bookImage,
			name: 'История книги 1',
			date: '20 Feb 2021',
			price: 350
		},
		{
			id: 2,
			img: bookImage,
			name: 'История книги 2',
			date: '20 Feb 2021',
			price: 350
		},
		{
			id: 1,
			img: bookImage,
			name: 'История книги 1',
			date: '20 Feb 2021',
			price: 350
		},
		{
			id: 2,
			img: bookImage,
			name: 'История книги 2',
			date: '20 Feb 2021',
			price: 350
		},
		{
			id: 1,
			img: bookImage,
			name: 'История книги 1',
			date: '20 Feb 2021',
			price: 350
		},
		{
			id: 2,
			img: bookImage,
			name: 'История книги 2',
			date: '20 Feb 2021',
			price: 350
		},
		{
			id: 1,
			img: bookImage,
			name: 'История книги 1',
			date: '20 Feb 2021',
			price: 350
		},
		{
			id: 2,
			img: bookImage,
			name: 'История книги 2',
			date: '20 Feb 2021',
			price: 350
		},
		{
			id: 1,
			img: bookImage,
			name: 'История книги 1',
			date: '20 Feb 2021',
			price: 350
		},
		{
			id: 2,
			img: bookImage,
			name: 'История книги 2',
			date: '20 Feb 2021',
			price: 350
		}
	];

	const showModal = (vendor: Vendor) => {
		setSelectedVendor(vendor);
		setIsModalOpen(true);
	};

	const handleOk = () => {
		setIsModalOpen(false);
		setSelectedVendor(null);
	};

	const handleCancel = () => {
		setIsModalOpen(false);
		setSelectedVendor(null);
	};

	return (
		<section className={scss.AboutVendorsBooks}>
			<div className={scss.container}>
				<div className={scss.total_quantity}>
					<p>Всего: {books.length} книг</p>
				</div>
				<hr />
				<div className={scss.content}>
					{books.map((book) => (
						<div key={book.id} className={scss.book}>
							<div className={scss.extra} onClick={() => setIsOpen(!isOpen)}>
								<ThreeDotIcon />
							</div>
							<div className={isOpen ? scss.is_open : scss.on_close}>
								<ul>
									<li>
										<span>
											<IconPencil />
										</span>
										Редактировать
									</li>
									<hr />
									<li onClick={() => setIsOpen(false)}>
										<span>
											<IconX />
										</span>
										Отклонить
									</li>
								</ul>
							</div>
							<div className={scss.book_content}>
								<div className={scss.book_img}>
									<img src={book.img} alt="" />
								</div>
								<div className={scss.info_book}>
									<h3>{book.name}</h3>
									<div className={scss.date_and_price}>
										<p>{book.date}</p>
										<p className={scss.price}>{book.price} c</p>
									</div>
								</div>
							</div>
						</div>
					))}
				</div>
				<p
					className={scss.delete_profile}
					onClick={() => showModal(selectedVendor!)}
				>
					Удалить профиль
				</p>
				<Modal
					visible={isModalOpen}
					onOk={handleOk}
					onCancel={handleCancel}
					okText="Удалить"
					cancelText="Отменить"
				>
					<p>Вы уверены, что хотите удалить профиль?</p>
				</Modal>
			</div>
		</section>
	);
};

export default AboutVendorsBooks;
