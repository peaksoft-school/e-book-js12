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
	const [selectVendor, setSelectVendor] = useState<User | null>(null);
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

	const showModal = (user: User) => {
		setSelectVendor(user);
		setIsModalOpen(true);
	};

	const handleOk = () => {
		setIsModalOpen(false);
		setSelectVendor(null);
	};

	const handleCancel = () => {
		setIsModalOpen(false);
		setSelectVendor(null);
	};

	return (
		<section className={scss.UserSection}>
			<div className={scss.container}>
				<div className={scss.content}>
					<table className={scss.properties_container}>
						<thead>
							<tr>
								<th>№</th>
								<th>ФИО</th>
								<th>Почта</th>
								<th></th>
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
								<td onClick={() => navigate(`/admin/users/${user.fullName}`)}>
									{user.gmail}
								</td>
								<td></td>
								<td></td>
								<td className={scss.button_as}>
									<button onClick={() => showModal(user)}>
										<DeleteIcon />
									</button>
								</td>
							</tr>
						))}
					</tbody>
				</div>
			</div>
			<Modal
				visible={isModalOpen}
				onOk={handleOk}
				onCancel={handleCancel}
				okText="Удалить"
				cancelText="Отменить"
			>
				<p>
					Вы уверены, что хотите удалить <span>{selectVendor?.fullName}</span>?
				</p>
			</Modal>
		</section>
	);
};

export default UserSection;
