import { FC, ReactNode } from 'react';
import scss from './CustomButton.module.scss';

interface CustomSeeMoreProps {
	children: ReactNode;
	onClick: () => void;
}

const CustomSeeMoreButton: FC<CustomSeeMoreProps> = ({ children, onClick }) => {
	return (
		<button className={`${scss.customButtonSeeMore} `} onClick={onClick}>
			{children}
		</button>
	);
};

export default CustomSeeMoreButton;
