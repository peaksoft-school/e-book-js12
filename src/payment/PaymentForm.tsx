/* eslint-disable @typescript-eslint/no-explicit-any */
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { FC, FormEvent, useState } from 'react';
import { useCreatePaymentMutation } from '../redux/api/payment';
import scss from './PaymentForm.module.scss';
import { Modal } from 'antd';

const CARD_OPTIONS = {
	iconStyle: 'solid' as 'default' | 'solid',
	style: {
		base: {
			iconColor: '#ff6200',
			color: 'black',
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
}

const PaymentForm: FC<TypeProps> = ({
	openModal,
	setOpenModal,
	totalAmount,
	newTestObj
}) => {
	const stripe = useStripe();
	const elements = useElements();
	const [createPayment] = useCreatePaymentMutation();
	const [sucsessModal, setSucsessModal] = useState(false);

	const hadnleCreatePayment = async (token: string) => {
		const newData = {
			...newTestObj
		};
		const totalTest = totalAmount?.toFixed();
		const test = Number(totalTest);
		const result = await createPayment({ newData, token, test });
		if ('data' in result) {
			if (result.data.httpStatus === 'OK') {
				setOpenModal(false);
				setSucsessModal(true);
			}
		}
	};

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
				open={sucsessModal}
				footer={false}
				onCancel={() => {
					setSucsessModal(false);
				}}
			>
				<div className={scss.confirm_payment}>
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
						</div>
					</div>
				</div>
			</Modal>
		</>
	);
};

export default PaymentForm;
