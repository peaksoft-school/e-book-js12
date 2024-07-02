import {
	useConfirmPaymentMutation,
	useGetPaymentDetailsQuery
} from '@/src/redux/api/payment';
import scss from './ConfirmPayment.module.scss';
import { useLocation, useNavigate } from 'react-router-dom';
import { message } from 'antd';

const ConfirmPayment = () => {
	const [confirmPayment] = useConfirmPaymentMutation();
	const query = new URLSearchParams(useLocation().search);
	const paymentId = query.get('paymentId');
	const { data, isLoading } = useGetPaymentDetailsQuery(paymentId);
	const [messageApi, contextHolder] = message.useMessage();
	const navigate = useNavigate();

	const handleConfirmPayment = async () => {
		const response = (await confirmPayment(
			paymentId
		)) as PAYMENT.ConfirmPaymentResponse;

		if ('data' in response && response.data?.httpStatus === 'OK') {
			messageApi.open({
				type: 'success',
				content: response.data?.message
			});
			setTimeout(() => {
				navigate('/profile', { replace: true });
			}, 1000);
		}
		if (response.error && response.error.data?.httpStatus === 'BAD_REQUEST') {
			messageApi.open({
				type: 'warning',
				content: 'Вы не можете подтвердить платеж когда вы его уже подтвердили'
			});
			setTimeout(() => {
				navigate('/profile', { replace: true });
			}, 1000);
		}
	};

	const historyActions = data?.historyActions.map((el) => {
		return (
			<li key={el.id} className={scss.historyActions__li}>
				<img
					src={el.imageUrl}
					alt={el.title}
					className={scss.historyActions__li_img}
				/>
				<div className={scss.historyActions__li_title__container}>
					<p className={scss.historyActions__li_title__container_title}>
						{el.title.length > 26 ? el.title.slice(0, 13) + '...' : el.title}
					</p>
					<p
						className={scss.historyActions__li_title__container_authorsFullName}
					>
						{el.authorsFullName}
					</p>
				</div>
				<p className={scss.historyActions__li_quantity}>{el.quantity} шт.</p>
				<div>
					<div className={scss.historyActions__li_discount__container}>
						{el.discount && <p>Скидка {el.discount}%</p>}
						{el.discountFromPromoCode ? (
							<p>Промокод 0{el.discountFromPromoCode}%</p>
						) : (
							''
						)}
					</div>
					<div className={scss.historyActions__li_price__container}>
						<p>{el.priceWithDiscount} c</p>
						<span>{el.price} c</span>
					</div>
				</div>
				<p className={scss.historyActions__li_createdAt}>{el.createdAt}</p>
			</li>
		);
	});

	return (
		<section className={scss.ConfirmPayment}>
			<div className="container">
				{contextHolder}
				{isLoading ? (
					<div>loading</div>
				) : (
					<div className={scss.content}>
						<div className={scss.confirm_payment}>
							<div className={scss.title_content}>
								<div>
									<p>Общая стоимость</p>
									<p>{data?.totalAmount} с</p>
								</div>
								<div>
									<p>Имя</p>
									<p>{data?.name}</p>
								</div>
								<div>
									<p>Email</p>
									<p>{data?.email}</p>
								</div>
							</div>
							<div className={scss.details_product}>
								<p>Приобритаемые книги:</p>
								<ul className={scss.historyActions__ul}>{historyActions}</ul>
							</div>
						</div>
						<button
							onClick={handleConfirmPayment}
							className={scss.confirm_button}
						>
							Подтвредить платеж
						</button>
					</div>
				)}
			</div>
		</section>
	);
};

export default ConfirmPayment;
