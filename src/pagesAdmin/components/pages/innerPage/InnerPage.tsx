import scss from './InnerPage.module.scss';
import { Modal } from 'antd';
import { useState } from 'react';
import { useParams } from 'react-router-dom';

interface Vendor {
	id: number;
	name: string;
	surname: string;
	email: string;
	date: string;
}

const InnerPage: React.FC = () => {
	const [isModalOpen, setIsModalOpen] = useState(false);
	const { name } = useParams<{ name: string }>();

	const users: Vendor[] = [
		{
			id: 1,
			name: 'Arslana',
			surname: 'Smith',
			email: 'arslana@gmail.com',
			date: '3.04.2024'
		},
		{
			id: 2,
			name: 'Arsal',
			surname: 'Johnson',
			email: 'arsal@gmail.com',
			date: '3.04.2024'
		},
		{
			id: 3,
			name: 'John',
			surname: 'Williams',
			email: 'john@gmail.com',
			date: '3.04.2024'
		},
		{
			id: 4,
			name: 'Doe',
			surname: 'Davis',
			email: 'doe@gmail.com',
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
		<div className={scss.AboutVendor}>
			<div className={scss.container}>
				{users.map((user) => (
					<div key={user.id} className={scss.content}>
						<div className={scss.vendor}>
							<div className={scss.test}>
								<div className={scss.name}>
									<p>
										<strong>Имя:</strong> {name}
									</p>
								</div>
								<div className={scss.surname}>
									<p>
										<strong>Фамилия:</strong> {user.surname}
									</p>
								</div>
							</div>
							<div className={scss.test}>
								<div className={scss.email}>
									<p>
										<strong>Почта:</strong> {user.email}
									</p>
								</div>
							</div>
							<div className={scss.date}>
								<p>
									<strong>Дата регистрации:</strong> {user.date}
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
					</div>
				))}
			</div>
		</div>
	);
};

export default InnerPage;
