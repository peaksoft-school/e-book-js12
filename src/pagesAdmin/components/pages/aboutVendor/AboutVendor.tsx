import React, { useState } from 'react';
import { Link, useParams, useLocation } from 'react-router-dom';
import { Modal } from 'antd';
import scss from './AboutVendor.module.scss';
import AboutVendorsBooks from '../aboutVendorsBooks/AboutVendorsBooks';

interface Vendor {
	id: number;
	name: string;
	surname: string;
	phone: string;
	email: string;
	date: string;
}

const AboutVendor: React.FC = () => {
	const [displayProfile, setDisplayProfile] = useState(true);
	const [isModalOpen, setIsModalOpen] = useState(false);
	const { name } = useParams<{ name: string }>();
	const location = useLocation();

	const vendors: Vendor[] = [
		{
			id: 1,
			name: 'Arslana',
			surname: 'Smith',
			phone: '+380999999999',
			email: 'arslana@gmail.com',
			date: '3.04.2024'
		},
		{
			id: 2,
			name: 'Arsal',
			surname: 'Johnson',
			phone: '+380999999999',
			email: 'arsal@gmail.com',
			date: '3.04.2024'
		},
		{
			id: 3,
			name: 'John',
			surname: 'Williams',
			phone: '+380999999999',
			email: 'john@gmail.com',
			date: '3.04.2024'
		},
		{
			id: 4,
			name: 'Doe',
			surname: 'Davis',
			phone: '+380999999999',
			email: 'doe@gmail.com',
			date: '3.04.2024'
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
		// Perform delete logic here (e.g., call API to delete vendor)
		// After successful deletion, close the modal
		setIsModalOpen(false);
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
							className={`${scss.link_to_home} ${
								location.pathname === '/admin/vendors'
									? scss.link_to_home_active
									: ''
							}`}
						>
							Продавцы
						</Link>
						/
						<span className={scss.link_to_vendor_page}>
							{selectedVendor.name}
						</span>
					</div>
					<div className={scss.navigates}>
						<h4
							className={`${scss.navigate_user_profile} ${
								displayProfile ? scss.navigate_user_profile_active : ''
							} `}
							onClick={() => setDisplayProfile(true)}
						>
							Профиль
						</h4>
						<h4
							className={`${scss.navigate_user_books} ${
								!displayProfile ? scss.navigate_user_books_active : ''
							} `}
							onClick={() => setDisplayProfile(false)}
						>
							Книги
						</h4>
					</div>
					{displayProfile ? (
						<div className={scss.vendor}>
							<div className={scss.test}>
								<div className={scss.name}>
									<p>
										<strong>Имя:</strong> {selectedVendor.name}
									</p>
								</div>
								<div className={scss.surname}>
									<p>
										<strong>Фамилия:</strong> {selectedVendor.surname}
									</p>
								</div>
							</div>
							<div className={scss.test}>
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
							</div>
							<div className={scss.date}>
								<p>
									<strong>Дата регистрации:</strong> {selectedVendor.date}
								</p>
							</div>
							<div className={scss.div_delete}>
								<button className={scss.delete_profile} onClick={showModal}>
									Удалить профиль
								</button>
							</div>
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
