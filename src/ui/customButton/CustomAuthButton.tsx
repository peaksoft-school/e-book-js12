import { FC, ReactNode } from 'react';
import scss from './CustomButton.module.scss';

interface CustomAuthProps {
	children: ReactNode;
	width?: string;
	onClick: () => void;
}

const CustomAuthButton: FC<CustomAuthProps> = ({
	children,
	onClick,
	width
}) => {
	return (
		<button
			style={{ width: width }}
			className={`${scss.customButtonAuth}`}
			onClick={onClick}
		>
			{children}
		</button>
	);
};

export default CustomAuthButton;
