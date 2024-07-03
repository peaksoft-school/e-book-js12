/* eslint-disable @typescript-eslint/no-explicit-any */
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { FC, FormEvent, useEffect, useState } from 'react';
import { useCreatePaymentMutation } from '../redux/api/payment';
import scss from './PaymentForm.module.scss';
import { Modal } from 'antd';
import { MessageInstance } from 'antd/es/message/interface';

const CARD_OPTIONS = {
	iconStyle: 'solid' as 'default' | 'solid',
	style: {
		base: {
			iconColor: '#ff6200',
			color: '#f47105',
			fontWeight: 500,
			fontSize: '16px',
			fontSmoothing: 'antialiased',
			'::placeholder': {
				color: '#8c8e91'
			}
		},
		invalid: {
			iconColor: 'red',
			color: 'red'
		},
		hidePostCode: true
	}
};

interface TypeProps {
	openModal: boolean;
	setOpenModal: (value: boolean | ((prev: boolean) => boolean)) => void;
	totalAmount: number | undefined;
	newTestObj: Record<string, string>;
	message: MessageInstance;
	refetch: () => void;
}

const PaymentForm: FC<TypeProps> = ({
	openModal,
	setOpenModal,
	totalAmount,
	newTestObj,
	message,
	refetch
}) => {
	const stripe = useStripe();
	const elements = useElements();
	const [createPayment] = useCreatePaymentMutation();
	const [successModal, setSuccsessModal] = useState(false);

	const hadnleCreatePayment = async (token: string) => {
		const newData = {
			...newTestObj
		};
		const totalTest = totalAmount?.toFixed();
		const test = Number(totalTest);
		const result = (await createPayment({
			newData,
			token,
			test
		})) as PAYMENT.CreatePaymentResponse;
		if ('data' in result) {
			if (result.data?.httpStatus === 'OK') {
				setOpenModal(false);
				message.open({
					type: 'success',
					content: result.data.message,
					duration: 5
				});
				refetch();
				setSuccsessModal(true);
			}
		}
		if (result.error.data) {
			console.log(result.error.data);
			message.open({
				type: 'warning',
				content: result.error.data.message,
				duration: 5
			});
		}
	};

	useEffect(() => {
		if (!successModal) {
			setSuccsessModal(false);
		}
	}, [successModal]);

	const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		if (!stripe || !elements) {
			console.error('Stripe.js has not yet loaded.');
			return;
		}
		try {
			const cardElement = elements.getElement(CardElement);
			console.log(cardElement, 'cardele');
			if (!cardElement) {
				console.error('CardElement not found');
				return;
			}
			const result = await stripe.createToken(cardElement);
			if (result) {
				if (result.token) {
					console.log(result.token);
					setOpenModal((prev) => !prev);
					hadnleCreatePayment(result.token.id);
				}
			}
		} catch (error) {
			console.error('Error in handleSubmit:', error);
		}
	};

	return (
		<>
			<Modal
				open={openModal}
				onCancel={() => {
					setOpenModal(false);
				}}
				footer={false}
			>
				<div className={scss.Payment}>
					<div className={scss.content}>
						<div className={scss.payment_container}>
							<form onSubmit={handleSubmit}>
								<p className={scss.heading}>Добавьте карту </p>
								<CardElement
									className={scss.card_element}
									options={CARD_OPTIONS}
								/>
								<button
									type="submit"
									className={scss.book_button}
									disabled={!stripe}
								>
									Продолжить
								</button>
							</form>
						</div>
					</div>
				</div>
			</Modal>
			<Modal
				open={successModal}
				footer={false}
				onCancel={() => {
					setSuccsessModal(false);
				}}
			>
				<div className={scss.confirm_payment}>
					<p className={scss.confirm_payment_bold__title}>Cпасибо!</p>
					<p className={scss.confirm_payment_bold__title}>
						Платеж успешно создан.
					</p>
					<p className={scss.confirm_payment_actual_info}>
						Вся актуальная информация о статусе <br />
						вашего заказа придет на ваш email🤗!
					</p>
				</div>
			</Modal>
		</>
	);
};

export default PaymentForm;
