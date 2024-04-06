import { FC, ReactNode } from 'react';
import scss from './Style.module.scss';

interface CustomAuthProps {
	children: ReactNode;
	onClick: () => void;
}

const CustomAuthButton: FC<CustomAuthProps> = ({ children, onClick }) => {
	return (
		<button className={`${scss.customButtonAuth}`} onClick={onClick}>
			{children}
		</button>
	);
};

export default CustomAuthButton;
