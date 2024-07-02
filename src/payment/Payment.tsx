/* eslint-disable @typescript-eslint/no-explicit-any */
import { Elements } from '@stripe/react-stripe-js';
import PaymentForm from './PaymentForm';
import { Stripe, loadStripe } from '@stripe/stripe-js';
import { FC } from 'react';
import { MessageInstance } from 'antd/es/message/interface';

interface TypeProps {
	openModal: boolean;
	setOpenModal: (value: boolean | ((prev: boolean) => boolean)) => void;
	totalAmount: number | undefined;
	test: Record<string, string>;
	messageApi: MessageInstance;
	refetch: () => void;
}

const Payment: FC<TypeProps> = ({
	openModal,
	setOpenModal,
	totalAmount,
	test,
	messageApi,
	refetch
}) => {
	const stripeTestPromise = loadStripe(
		'pk_test_51PSxn0P9AwzSXbtUejAOIXjKhTxpQmLwHNFjc6yjFOYsXNIK0l8yP1Apg3eF0x2gKy094TEupBQtGfEZogSDWrK600uGVUQfKk'
	) as Promise<Stripe | any>;

	return (
		<>
			<Elements stripe={stripeTestPromise}>
				<PaymentForm
					message={messageApi}
					totalAmount={totalAmount}
					openModal={openModal}
					setOpenModal={setOpenModal}
					newTestObj={test}
					refetch={refetch}
				/>
			</Elements>
		</>
	);
};

export default Payment;
