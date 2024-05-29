import DeleteIcon from '@/src/assets/icons/icon-delete';
import scss from './UsersSection.module.scss';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { Modal } from 'antd';

interface User {
	id: number;
	fullName: string;
	gmail: string;
}

const UserSection = () => {
	const navigate = useNavigate();
	const [isModalOpen, setIsModalOpen] = useState(false);

	const users: User[] = [
		{
			id: 1,
			fullName: 'Мыктыбек Мыктыбеков',
			gmail: 'myktybek@gmail.com'
		},
		{
			id: 2,
			fullName: 'Aibek Hairulla uulu',
			gmail: 'aibek@gmail.com'
		},
		{
			id: 3,
			fullName: 'joomart Joomartov',
			gmail: 'jomart@gmail.com'
		}
	];

	const showModal = () => {
		setIsModalOpen(true);
	};

	const handleCancel = () => {
		setIsModalOpen(false);
	};

	return (
		<section className={scss.UserSection}>
			<div className={scss.container}>
				<div className={scss.content}>
					<table className={scss.properties_container}>
						<thead>
							<tr>
								<th>№</th>
								<td>ФИО</td>
								<td>Почта</td>
							</tr>
						</thead>
					</table>
					<tbody>
						{users.map((user) => (
							<tr key={user.id} className={scss.users}>
								<td>{user.id}</td>
								<td onClick={() => navigate(`/admin/users/${user.fullName}`)}>
									{user.fullName}
								</td>
								<tr></tr>
								<td onClick={() => navigate(`/admin/users/${user.fullName}`)}>
									{user.gmail}
								</td>
								<td className={scss.button_as}>
									<button onClick={() => showModal()}>
										<DeleteIcon />
									</button>
								</td>
							</tr>
						))}
					</tbody>
				</div>
			</div>
			<Modal open={isModalOpen} onCancel={handleCancel} footer={false}>
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
		</section>
	);
};

export default UserSection;
