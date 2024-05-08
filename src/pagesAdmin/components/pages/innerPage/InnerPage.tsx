import scss from './InnerPage.module.scss';
import { Modal } from 'antd';
import { useState } from 'react';

interface Vendor {
	id: number;
	name: string;
	surname: string;
	email: string;
	date: string;
}

const InnerPage: React.FC = () => {
	const [isModalOpen, setIsModalOpen] = useState(false);

	const users: Vendor[] = [
		{
			id: 1,
			name: 'Arslan',
			surname: 'Smith',
			email: 'arslan@gmail.com',
			date: '3.04.2024'
		}
	];

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
				{users.map((user) => (
					<div key={user.id} className={scss.inner_content}>
						<div className={scss.inner_vendor}>
							<div className={scss.inner_test}>
								<div className={scss.inner_name}>
									<p>
										<strong>Имя:</strong> {user.name}
									</p>
								</div>
								<div className={scss.inner_surname}>
									<p>
										<strong>Фамилия:</strong> {user.surname}
									</p>
								</div>
							</div>
							<div className={scss.inner_test}>
								<div className={scss.inner_email}>
									<p>
										<strong>Почта:</strong> {user.email}
									</p>
								</div>
							</div>
							<div className={scss.inner_date}>
								<p>
									<strong>Дата регистрации:</strong> {user.date}
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
								visible={isModalOpen}
								onOk={handleOk}
								onCancel={handleCancel}
								okText="Удалить"
								cancelText="Отменить"
							>
								<p className={scss.inner_delete_profile}>
									Вы уверены, что хотите удалить профиль?
								</p>
							</Modal>
						</div>
					</div>
				))}
			</div>
		</div>
	);
};

export default InnerPage;
