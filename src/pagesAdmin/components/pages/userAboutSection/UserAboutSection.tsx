import scss from './UserAbout.module.scss';
import { Modal } from 'antd';
import { useState } from 'react';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import ProfileHistory from '../profileHistory/ProfileHistory';
import {
	useDeleteUserByIdMutation,
	useGetUserProfileQuery
} from '@/src/redux/api/users';

const UserAboutSection: React.FC = () => {
	const [profile, setProfile] = useState(true);
	const [isModalOpen, setIsModalOpen] = useState(false);
	const navigate = useNavigate();
	const location = useLocation();
	const { fullName } = useParams<{ fullName: string }>();
	const userId = Number(fullName);
	const { data, isLoading } = useGetUserProfileQuery(userId);
	const [deleteUserProfile] = useDeleteUserByIdMutation();

	const showModal = () => {
		setIsModalOpen(true);
	};

	const handleOk = () => {
		setIsModalOpen(false);
	};

	const handleCancel = () => {
		setIsModalOpen(false);
	};

	const handleDeleteUserProfile = async (userId: number) => {
		await deleteUserProfile(userId);
		navigate('/admin/users');
	};

	return (
		<>
			{isLoading ? (
				<>loading</>
			) : (
				<div className={scss.inner_about_vendor}>
					<div className={scss.container}>
						<div className={scss.link}>
							<Link
								to={'/admin/users'}
								className={`${scss.link_home}  ${
									location.pathname === '/admin/users/'
										? scss.link_home_active
										: ''
								}`}
							>
								Пользователи
							</Link>
							/<span className={scss.link_vendor_page}>{data?.name}</span>
						</div>
						<div className={scss.navigate}>
							<h4
								className={`${scss.navigate_user_profile} ${
									profile ? scss.navigate_user_profile_active : ''
								} `}
								onClick={() => setProfile(true)}
							>
								Профиль
							</h4>
							<h4
								className={`${scss.navigate_user_books} ${
									!profile ? scss.navigate_user_books_active : ''
								} `}
								onClick={() => setProfile(false)}
							>
								История операций
							</h4>
						</div>
						{profile ? (
							<div className={scss.inner_content}>
								<div className={scss.inner_vendor}>
									<div className={scss.inner_test}>
										<div className={scss.inner_name}>
											<p>
												<strong>Имя</strong>
												{data?.name}
											</p>
										</div>
										<div className={scss.inner_test}>
											<div className={scss.inner_email}>
												<p>
													<strong>Почта</strong>
													{data?.email}
												</p>
											</div>
										</div>
									</div>
									<div className={scss.inner_date}>
										<p>
											<strong>Дата регистрации</strong>
											{data?.dateOfRegistration}
										</p>
									</div>
									<div className={scss.inner_div_delete}>
										<button
											className={scss.inner_delete_profile}
											onClick={showModal}
										>
											Удалить профиль
										</button>
									</div>
									<Modal
										open={isModalOpen}
										onOk={handleOk}
										onCancel={handleCancel}
										footer={false}
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
														handleDeleteUserProfile(userId);
													}}
												>
													Удалить
												</button>
											</div>
										</div>
									</Modal>
								</div>
							</div>
						) : (
							<ProfileHistory />
						)}
					</div>
				</div>
			)}
		</>
	);
};

export default UserAboutSection;
