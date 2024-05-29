import { IconDelete } from '@/src/assets/icons';
import scss from './VendorsSection.module.scss';
import { useNavigate } from 'react-router-dom';
import { Modal } from 'antd';
import { useState } from 'react';

interface Vendor {
	id: number;
	name: string;
	phone: string;
	email: string;
	quantity_books: number;
}

const VendorsSection = () => {
	const navigate = useNavigate();
	const [selectedVendor, setSelectedVendor] = useState<Vendor | null>(null);
	const [isModalOpen, setIsModalOpen] = useState(false);

	const vendors: Vendor[] = [
		{
			id: 1,
			name: 'Arslana',
			phone: '+380999999999',
			email: 'arslana@gmail.com',
			quantity_books: 134
		},
		{
			id: 2,
			name: 'Arsal',
			phone: '+380999999999',
			email: 'arsal@gmail.com',
			quantity_books: 189
		},
		{
			id: 3,
			name: 'John',
			phone: '+380999999999',
			email: 'john@gmail.com',
			quantity_books: 87
		},
		{
			id: 4,
			name: 'Doe',
			phone: '+380999999999',
			email: 'doe@gmail.com',
			quantity_books: 55
		},
		{
			id: 5,
			name: 'Doe',
			phone: '+380999999999',
			email: 'doe@gmail.com',
			quantity_books: 55
		},
		{
			id: 6,
			name: 'Doe',
			phone: '+380999999999',
			email: 'doe@gmail.com',
			quantity_books: 55
		},
		{
			id: 7,
			name: 'Doe',
			phone: '+380999999999',
			email: 'doe@gmail.com',
			quantity_books: 55
		}
	];

	const showModal = (vendor: Vendor) => {
		setSelectedVendor(vendor);
		setIsModalOpen(true);
	};

	const handleOk = () => {
		setIsModalOpen(false);
		setSelectedVendor(null);
	};

	const handleCancel = () => {
		setIsModalOpen(false);
		setSelectedVendor(null);
	};

	return (
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
							{vendors.map((vendor) => (
								<tr key={vendor.id} className={scss.vendors}>
									<td>{vendor.id}</td>
									<td onClick={() => navigate(`/admin/vendors/${vendor.name}`)}>
										{vendor.name}
									</td>
									<td onClick={() => navigate(`/admin/vendors/${vendor.name}`)}>
										{vendor.phone}
									</td>
									<td onClick={() => navigate(`/admin/vendors/${vendor.name}`)}>
										{vendor.email}
									</td>
									<td onClick={() => navigate(`/admin/vendors/${vendor.name}`)}>
										{vendor.quantity_books}
									</td>
									<td>
										<button onClick={() => showModal(vendor)}>
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
						Вы уверены, что хотите удалить <span>{selectedVendor?.name}</span>?
					</p>
					<div className={scss.btns_modal}>
						<button>Отменить</button>
						<button>Удалить</button>
					</div>
				</div>
			</Modal>
		</section>
	);
};

export default VendorsSection;
