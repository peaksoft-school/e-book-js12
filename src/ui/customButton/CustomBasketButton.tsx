import { FC, ReactNode } from 'react';
import scss from './CustomButton.module.scss';

interface CustomBasketProps {
	children: ReactNode;
	width?: string;
	onClick: () => void;
}

const CustomBasketButton: FC<CustomBasketProps> = ({
	children,
	onClick,
	width
}) => {
	return (
		<button
			style={{ width: width }}
			className={`${scss.customButtonBasket}`}
			onClick={onClick}
		>
			{children}
		</button>
	);
};

export default CustomBasketButton;
