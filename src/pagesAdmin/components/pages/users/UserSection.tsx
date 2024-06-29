import DeleteIcon from '@/src/assets/icons/icon-delete';
import scss from './UsersSection.module.scss';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { Modal } from 'antd';
import {
	useDeleteUserByIdMutation,
	useGetAllUsersQuery
} from '@/src/redux/api/users';

const UserSection = () => {
	const navigate = useNavigate();
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [selectedUser, setSelectedUser] = useState<User | null>(null);
	const { data, isLoading } = useGetAllUsersQuery();
	const [deleteUser] = useDeleteUserByIdMutation();

	interface User {
		clientId: number;
		firstName: string;
		email: string;
	}

	const showModal = (user: User) => {
		setSelectedUser(user);
		setIsModalOpen(true);
	};

	const handleCancel = () => {
		setSelectedUser(null);
		setIsModalOpen(false);
	};

	return (
		<>
			{isLoading ? (
				<>Loading</>
			) : (
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
								<tbody>
									{data?.clients.map((item, index) => (
										<tr key={item.clientId} className={scss.users}>
											<td>{index + 1}</td>
											<td
												onClick={() =>
													navigate(`/admin/users/${item.clientId}`)
												}
											>
												{item.firstName}
											</td>
											<td
												onClick={() =>
													navigate(`/admin/users/${item.clientId}`)
												}
											>
												{item.email}
											</td>
											<td className={scss.button_as}>
												<button onClick={() => showModal(item)}>
													<DeleteIcon />
												</button>
											</td>
										</tr>
									))}
								</tbody>
							</table>
						</div>
					</div>
					<Modal open={isModalOpen} onCancel={handleCancel} footer={false}>
						<div className={scss.delete_modal}>
							<p>
								Вы уверены, что хотите удалить <br />
								<span>{selectedUser?.firstName}</span>
							</p>
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
										if (selectedUser) {
											deleteUser(selectedUser?.clientId);
											handleCancel();
										}
									}}
								>
									Удалить
								</button>
							</div>
						</div>
					</Modal>
				</section>
			)}
		</>
	);
};

export default UserSection;
