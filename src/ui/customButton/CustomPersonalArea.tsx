import { FC, ReactNode } from 'react';
import scss from './CustomButton.module.scss';

interface CustomPersonalAreaProps {
	children: ReactNode;
	width?: string;
	onClick: () => void;
}

const CustomPersonalAreaButton: FC<CustomPersonalAreaProps> = ({
	children,
	onClick,
	width
}) => {
	return (
		<button
			style={{ width: width }}
			className={`${scss.customButtonPersonal} `}
			onClick={onClick}
		>
			{children}
		</button>
	);
};

export default CustomPersonalAreaButton;
