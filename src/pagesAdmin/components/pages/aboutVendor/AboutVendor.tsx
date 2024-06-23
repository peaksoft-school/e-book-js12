import React, { useState } from 'react';
import { Link, useParams, useLocation, useNavigate } from 'react-router-dom';
import { Modal } from 'antd';
import scss from './AboutVendor.module.scss';
import AboutVendorsBooks from '../aboutVendorsBooks/AboutVendorsBooks';
import {
	useDeleteVendorProfileMutation,
	useGetVendorByIdQuery
} from '@/src/redux/api/vendors';

const AboutVendor: React.FC = () => {
	const [displayProfile, setDisplayProfile] = useState(true);
	const [isModalOpen, setIsModalOpen] = useState(false);
	const navigate = useNavigate();
	const location = useLocation();
	const { name } = useParams<{ name: string }>();
	const vendorId = Number(name);

	const { data, isLoading } = useGetVendorByIdQuery(vendorId);
	const [deleteVendorProfile] = useDeleteVendorProfileMutation();

	const showModal = () => {
		setIsModalOpen(true);
	};

	const handleCancel = () => {
		setIsModalOpen(false);
	};

	const handleDeleteVendorProfile = async (vendorId: number) => {
		await deleteVendorProfile(vendorId);
		navigate('/admin/vendors');
	};

	return (
		<>
			{isLoading ? (
				<>loading</>
			) : (
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
									{data?.firstName}
								</span>
							</div>
							<div className={scss.navigates}>
								<h4
									className={`${scss.navigate_user_profile} ${displayProfile ? scss.navigate_user_profile_active : ''}`}
									onClick={() => setDisplayProfile(true)}
								>
									Профиль
								</h4>
								<h4
									className={`${scss.navigate_user_books} ${!displayProfile ? scss.navigate_user_books_active : ''}`}
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
												<strong>Имя</strong> {data?.firstName}
											</p>
										</div>
										<div className={scss.surname}>
											<p>
												<strong>Фамилия</strong> {data?.lastName}
											</p>
										</div>
									</div>
									<div className={scss.test}>
										<div className={scss.phone}>
											<p>
												<strong>Номер телефона</strong> {data?.phoneNumber}
											</p>
										</div>
										<div className={scss.email}>
											<p>
												<strong>Почта</strong> {data?.email}
											</p>
										</div>
									</div>
									<div className={scss.date}>
										<p>
											<strong>Дата регистрации</strong>{' '}
											{data?.dateOfRegistration}
										</p>
									</div>
									<div className={scss.div_delete}>
										<button className={scss.delete_profile} onClick={showModal}>
											Удалить профиль
										</button>
									</div>
									<Modal
										onCancel={handleCancel}
										footer={false}
										open={isModalOpen}
									>
										<div className={scss.delete_modal}>
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
							) : (
								<AboutVendorsBooks />
							)}
						</div>
					</div>
				</div>
			)}
		</>
	);
};

export default AboutVendor;
