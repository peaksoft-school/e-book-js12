import { FC, ReactNode } from 'react';
import scss from './Style.module.scss';

interface CustomBasketProps {
	children: ReactNode;
	onClick: () => void;
	nameClass: string;
}

const CustomBasketButton: FC<CustomBasketProps> = ({
	children,
	onClick,
	nameClass
}) => {
	return (
		<button
			className={`${scss.custom_button_basket} ${nameClass} `}
			onClick={onClick}
		>
			{children}
		</button>
	);
};

export default CustomBasketButton;
