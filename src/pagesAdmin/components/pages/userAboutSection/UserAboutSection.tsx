import scss from './UserAbout.module.scss';
import { Modal } from 'antd';
import { useState } from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';
import ProfileHistory from '../profileHistory/ProfileHistory';

interface Users {
	id: number;
	fullName: string;
	name: string;
	gmail: string;
	date: string;
}

const UserAboutSection: React.FC = () => {
	const [profile, setProfile] = useState(true);
	const [isModalOpen, setIsModalOpen] = useState(false);
	const { fullName } = useParams<{ fullName: string }>();
	const location = useLocation();

	const users: Users[] = [
		{
			id: 1,
			fullName: 'Мыктыбек Мыктыбеков',
			name: 'Мыктыбек',
			gmail: 'myktybek@gmail.com',
			date: '10.04.2025'
		},
		{
			id: 2,
			fullName: 'Aibek Hairulla uulu',
			name: 'Aibek',
			gmail: 'aibek@gmail.com',
			date: '10.04.2025'
		},
		{
			id: 3,
			fullName: 'joomart Joomartov',
			name: 'Joomart',
			gmail: 'jomart@gmail.com',
			date: '10.04.2025'
		}
	];
	const selectVendor = users.find((user) => user.fullName === fullName);

	if (!selectVendor) {
		return <p>Вендор с именем {fullName} не найден</p>;
	}
	const showModal = () => {
		setIsModalOpen(true);
	};

	const handleOk = () => {
		setIsModalOpen(false);
	};

	const handleCancel = () => {
		setIsModalOpen(false);
	};

	return (
		<div className={scss.inner_about_vendor}>
			<div className={scss.container}>
				<div className={scss.link}>
					<Link
						to={'/admin/users'}
						className={`${scss.link_home}  ${
							location.pathname === '/admin/users/' ? scss.link_home_active : ''
						}`}
					>
						Продавцы
					</Link>
					/
					<span className={scss.link_vendor_page}>{selectVendor.fullName}</span>
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
										<strong>Имя:</strong> {selectVendor.name}
									</p>
								</div>
								<div className={scss.inner_test}>
									<div className={scss.inner_email}>
										<p>
											<strong>Почта:</strong> {selectVendor.gmail}
										</p>
									</div>
								</div>
							</div>
							<div className={scss.inner_date}>
								<p>
									<strong>Дата регистрации:</strong> {selectVendor.date}
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
	);
};

export default UserAboutSection;
