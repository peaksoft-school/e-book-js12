import React, { useState } from 'react';
import { Link, useParams, useLocation } from 'react-router-dom';
import { Modal } from 'antd'; // Import Modal from antd
import scss from './AboutVendor.module.scss';
import AboutVendorsBooks from '../aboutVendorsBooks/AboutVendorsBooks';

interface Vendor {
	id: number;
	name: string;
	phone: string;
	email: string;
	quantity_books: number;
}

const AboutVendor: React.FC = () => {
	const [displayProfile, setDisplayProfile] = useState(true);
	const [isModalOpen, setIsModalOpen] = useState(false); // State for modal
	const { name } = useParams();
	const location = useLocation();

	const vendors: Vendor[] = [
		{
			id: 1,
			name: 'Arslana',
			phone: '+380999999999',
			email: 'arslana@gmail.com',
			quantity_books: 134
		},
		{
			id: 2,
			name: 'Arsal',
			phone: '+380999999999',
			email: 'arsal@gmail.com',
			quantity_books: 189
		},
		{
			id: 3,
			name: 'John',
			phone: '+380999999999',
			email: 'john@gmail.com',
			quantity_books: 87
		},
		{
			id: 4,
			name: 'Doe',
			phone: '+380999999999',
			email: 'doe@gmail.com',
			quantity_books: 55
		}
	];

	const selectedVendor = vendors.find((vendor) => vendor.name === name);

	if (!selectedVendor) {
		return <p>Вендор с именем {name} не найден.</p>;
	}

	const showModal = () => {
		setIsModalOpen(true);
	};

	const handleOk = () => {
		setIsModalOpen(false);
		// Perform deletion logic here
	};

	const handleCancel = () => {
		setIsModalOpen(false);
	};

	return (
		<div className={scss.AboutVendor}>
			<div className={scss.container}>
				<div className={scss.content}>
					<div className={scss.links}>
						<Link
							to="/admin/vendors"
							className={`${scss.link_to_home} ${location.pathname === '/admin/vendors' ? scss.link_to_home_active : ''}`}
						>
							Пользователи
						</Link>
						/
						<Link
							to={`/admin/vendors/${selectedVendor.name}`}
							className={`${scss.link_to_vendor_page} ${location.pathname === `/admin/vendors/${selectedVendor.name}` ? scss.link_to_vendor_page_active : ''}`}
						>
							{selectedVendor.name}
						</Link>
					</div>
					<div className={scss.navigates}>
						<h4
							className={`${scss.navigate_user_profile} ${displayProfile ? scss.navigate_user_profile_active : ''} `}
							onClick={() => setDisplayProfile(true)}
						>
							Профиль
						</h4>
						<h4
							className={`${scss.navigate_user_books} ${!displayProfile ? scss.navigate_user_books_active : ''} `}
							onClick={() => setDisplayProfile(false)}
						>
							Книги
						</h4>
					</div>
					{displayProfile ? (
						<div className={scss.vendor}>
							<div className={scss.name}>
								<p>
									<strong>Имя:</strong> {selectedVendor.name}
								</p>
							</div>
							<div className={scss.phone}>
								<p>
									<strong>Номер телефона:</strong> {selectedVendor.phone}
								</p>
							</div>
							<div className={scss.email}>
								<p>
									<strong>Почта:</strong> {selectedVendor.email}
								</p>
							</div>
							<div className={scss.quantity_books}>
								<p>
									<strong>Количество книг:</strong>{' '}
									{selectedVendor.quantity_books}
								</p>
							</div>
							<p className={scss.delete_profile} onClick={showModal}>
								Удалить профиль
							</p>
							<Modal
								visible={isModalOpen}
								onOk={handleOk}
								onCancel={handleCancel}
								okText="Удалить"
								cancelText="Отменить"
							>
								<p className={scss.delete_profile}>
									Вы уверены, что хотите удалить профиль?
								</p>
							</Modal>
						</div>
					) : (
						<AboutVendorsBooks />
					)}
				</div>
			</div>
		</div>
	);
};

export default AboutVendor;
