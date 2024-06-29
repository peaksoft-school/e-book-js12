/* eslint-disable @typescript-eslint/no-explicit-any */
import { FC, ReactNode } from 'react';
import scss from './Style.module.scss';

interface CustomBasketProps {
	children: ReactNode;
	onClick: any;
	nameClass: string;

	type?: React.ButtonHTMLAttributes<HTMLButtonElement>['type'];
}

const CustomBasketButton: FC<CustomBasketProps> = ({
	children,
	onClick,
	nameClass,
	type = 'button'
}) => {
	return (
		<button
			className={`${scss.custom_button_basket} ${nameClass}`}
			onClick={onClick}
			type={type}
		>
			{children}
		</button>
	);
};

export default CustomBasketButton;
