import { FC, ReactNode } from 'react';
import scss from './Style.module.scss';

interface CustomPersonalAreaProps {
	children: ReactNode;
	onClick: () => void;
	nameClass: string;
}

const CustomPersonalAreaButton: FC<CustomPersonalAreaProps> = ({
	children,
	onClick,
	nameClass
}) => {
	return (
		<button
			className={`${scss.custom_button_personal} ${nameClass} `}
			onClick={onClick}
		>
			{children}
		</button>
	);
};

export default CustomPersonalAreaButton;
