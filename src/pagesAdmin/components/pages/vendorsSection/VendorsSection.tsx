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
	const [selectedVendor, setSelectedVendor] = useState<Vendor | null>(null); // Состояние для выбранного поставщика

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
		}
	];

	const [isModalOpen, setIsModalOpen] = useState(false);

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
					<div className={scss.vendors_section_title}>
						<h5>№</h5>
						<h5>Имя</h5>
						<h5>Номер телефона</h5>
						<h5>Почта</h5>
						<h5>Количество книг</h5>
						<div></div>
					</div>
					<hr />
					<div className={scss.vendors}>
						{vendors.map((vendor) => (
							<div key={vendor.id}>
								<div className={scss.vendor}>
									<h5>{vendor.id}</h5>
									<h5 onClick={() => navigate(`/admin/vendors/${vendor.name}`)}>
										{vendor.name}
									</h5>
									<h5 onClick={() => navigate(`/admin/vendors/${vendor.name}`)}>
										{vendor.phone}
									</h5>
									<h5 onClick={() => navigate(`/admin/vendors/${vendor.name}`)}>
										{vendor.email}
									</h5>
									<h5 onClick={() => navigate(`/admin/vendors/${vendor.name}`)}>
										{vendor.quantity_books}
									</h5>
									<div
										className={scss.delete_vendor}
										onClick={() => showModal(vendor)}
									>
										<IconDelete />
									</div>
								</div>
							</div>
						))}
					</div>
					<Modal
						visible={isModalOpen}
						onOk={handleOk}
						onCancel={handleCancel}
						okText="Удалить"
						cancelText="Отменить"
					>
						<p>
							Вы уверены, что хотите удалить<span> {selectedVendor?.name}</span>
							?
						</p>
					</Modal>
				</div>
			</div>
		</section>
	);
};

export default VendorsSection;
