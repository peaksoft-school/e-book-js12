import { useConfirmPaymentMutation } from '@/src/redux/api/payment';
import scss from './ConfirmPayment.module.scss';
import { useLocation } from 'react-router-dom';
import { Modal } from 'antd';
import { useEffect, useState } from 'react';

const ConfirmPayment = () => {
	const [confirmPayment] = useConfirmPaymentMutation();
	const query = new URLSearchParams(useLocation().search);
	const paymentId = query.get('paymentId');
	const [modal, setModal] = useState(false);

	const handleConfirmPayment = async () => {
		const response = await confirmPayment(paymentId);
		if ('data' in response) {
			if (response.data?.httpStatus === 'OK') {
				setModal(true);
			}
		}
	};

	useEffect(() => {
		if (!modal) {
			setTimeout(() => {
				setModal(false);
			}, 3000);
		}
	}, [modal]);
	return (
		<section className={scss.ConfirmPayment}>
			<div className="container">
				<div className={scss.content}>
					{/* <div className={scss.confirm_payment}>
						<div className={scss.title_content}>
							<p>confirm to by payment</p>
							<p>description</p>
						</div>
						<div className={scss.detals_product}>
							<p>Detals</p>
							<div className={scss.info_content}>
								<div className={scss.date}>
									<p>data</p>
									<p>{Date()}</p>
								</div>
                <div></div>
							</div>
						</div>
					</div> */}
					<div onClick={handleConfirmPayment} className={scss.confirm_card}>
						asdas
						{/* <div className={scss.}></div> */}
					</div>
					<Modal open={modal} footer={false} onCancel={() => setModal(false)}>
						<div className={scss.modal_succsess}>
							<p>Успешно оплачено</p>
						</div>
					</Modal>
				</div>
			</div>
		</section>
	);
};

export default ConfirmPayment;
