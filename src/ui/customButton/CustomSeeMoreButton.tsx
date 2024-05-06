import { FC, ReactNode } from 'react';
import scss from './Style.module.scss';

interface CustomSeeMoreProps {
	children: ReactNode;
	onClick: () => void;
}

const CustomSeeMoreButton: FC<CustomSeeMoreProps> = ({ children, onClick }) => {
	return (
		<button className={`${scss.custom_button_see_more} `} onClick={onClick}>
			{children}
		</button>
	);
};

export default CustomSeeMoreButton;
