import { FC, ReactNode } from 'react';
import scss from './Style.module.scss';

interface CustomBasketProps {
	children: ReactNode;
	onClick: () => void;
}

const CustomBasketButton: FC<CustomBasketProps> = ({ children, onClick }) => {
	return (
		<button className={`${scss.customButtonBasket}`} onClick={onClick}>
			{children}
		</button>
	);
};

export default CustomBasketButton;
