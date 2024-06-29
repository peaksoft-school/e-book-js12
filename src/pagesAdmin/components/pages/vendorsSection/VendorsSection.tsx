import { useState } from 'react';
import scss from './VendorsSection.module.scss';
import { useNavigate } from 'react-router-dom';
import { IconDelete } from '@/src/assets/icons';
import { Modal } from 'antd';
import {
	useDeleteVendorMutation,
	useGetAllVendorsQuery
} from '@/src/redux/api/vendors';

const VendorsSection = () => {
	const navigate = useNavigate();
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [selectedVendor, setSelectedVendor] = useState<Vendor | null>(null);
	const { data, isLoading } = useGetAllVendorsQuery();
	console.log(data);

	const [handleDeleteVendor] = useDeleteVendorMutation();

	interface Vendor {
		id: number;
		fullName: string;
		email: string;
		phoneNumber: string;
		amountOfBook: number;
	}

	const showModal = (vendor: Vendor) => {
		setSelectedVendor(vendor);
		setIsModalOpen(true);
	};

	const handleOk = () => {
		setSelectedVendor(null);
		setIsModalOpen(false);
	};

	const handleCancel = () => {
		setIsModalOpen(false);
		setSelectedVendor(null);
	};

	return (
		<>
			{isLoading ? (
				<>loading</>
			) : (
				<section className={scss.VendorsSection}>
					<div className={scss.container}>
						<div className={scss.content}>
							<table className={scss.vendors_table}>
								<thead>
									<tr>
										<th>№</th>
										<th>Имя</th>
										<th>Номер телефона</th>
										<th>Почта</th>
										<th>Количество книг</th>
										<th></th>
									</tr>
								</thead>
								<tbody>
									{data?.content.map((item, index) => (
										<tr key={item.id} className={scss.vendors}>
											<td>{index + 1}</td>
											<td onClick={() => navigate(`/admin/vendors/${item.id}`)}>
												{item.fullName}
											</td>
											<td onClick={() => navigate(`/admin/vendors/${item.id}`)}>
												{item.phoneNumber}
											</td>
											<td onClick={() => navigate(`/admin/vendors/${item.id}`)}>
												{item.email}
											</td>
											<td onClick={() => navigate(`/admin/vendors/${item.id}`)}>
												{item.amountOfBook}
											</td>
											<td>
												<button
													onClick={() => {
														showModal(item);
													}}
												>
													<IconDelete />
												</button>
											</td>
										</tr>
									))}
								</tbody>
							</table>
						</div>
					</div>
					<Modal
						visible={isModalOpen}
						onOk={handleOk}
						onCancel={handleCancel}
						footer={false}
					>
						<div className={scss.delete_modal}>
							<p>
								Вы уверены, что хотите удалить <br />
								<span>{selectedVendor?.fullName}</span>?
							</p>
							<div className={scss.btns_modal}>
								<button onClick={handleCancel}>Отменить</button>
								<button
									onClick={() => {
										if (selectedVendor) {
											handleDeleteVendor(selectedVendor?.id);
											handleOk();
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

export default VendorsSection;
