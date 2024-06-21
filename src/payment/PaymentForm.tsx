import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { FC, FormEvent } from 'react';
import { useCreatePaymentMutation } from '../redux/api/payment';
import scss from './PaymentForm.module.scss';

const CARD_OPTIONS = {
	iconStyle: 'solid' as 'default' | 'solid',
	style: {
		base: {
			iconColor: '#C4C4C4',
			color: 'black',
			fontWeight: 500,
			fontSize: '1rem'
		},
		invalid: {
			iconColor: 'red',
			color: 'red'
		}
	}
};

interface TypeProps {
	openModal: boolean;
	setOpenModal: (value: boolean | ((prev: boolean) => boolean)) => void;
	totalAmount: number;
}

const PaymentForm: FC<TypeProps> = ({
	openModal,
	setOpenModal,
	totalAmount
}) => {
	const stripe = useStripe();
	const elements = useElements();
	const [createPayment] = useCreatePaymentMutation();

	const hadnleCreatePayment = async (token: string) => {
		const newData = {
			'6': 'Ebook123456'
		};
		const totalTest = totalAmount.toFixed();
		const test = Number(totalTest);
		const result = await createPayment({ newData, token, test });
		console.log(result, 'payment');
	};

	const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		if (!stripe || !elements) {
			console.error('Stripe.js has not yet loaded.');
			return;
		}
		try {
			const cardElement = elements.getElement(CardElement);
			if (!cardElement) {
				console.error('CardElement not found');
				return;
			}
			const result = await stripe.createToken(cardElement);
			if (result) {
				if (result.token) {
					console.log('Token created:', result.token.id);
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
			<div className={scss.Payment}>
				<div className="container">
					<div className={scss.content}>
						<div className={scss.payment_container}>
							<form onSubmit={handleSubmit}>
								<p className={scss.heading}>Place your order</p>
								<CardElement
									className={scss.card_element}
									options={CARD_OPTIONS}
								/>
								<button
									type="submit"
									className={scss.book_button}
									disabled={!stripe}
								>
									BOOK
								</button>
							</form>
							<div className={scss.total_amount}></div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default PaymentForm;
