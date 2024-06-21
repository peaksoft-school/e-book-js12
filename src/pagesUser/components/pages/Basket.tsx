import { FC } from 'react';
import BasketSection from './basketSection/BasketSection';

interface TypeProps {
	setIsPayment: React.Dispatch<React.SetStateAction<boolean>>;
	setTotalCost: React.Dispatch<React.SetStateAction<number | undefined>>;
}

const Basket: FC<TypeProps> = ({ setIsPayment, setTotalCost }) => {
	return (
		<>
			<BasketSection setIsPayment={setIsPayment} setTotalCost={setTotalCost} />
		</>
	);
};

export default Basket;
