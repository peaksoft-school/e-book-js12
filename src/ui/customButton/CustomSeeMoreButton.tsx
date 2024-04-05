import { FC, ReactNode } from 'react';
import scss from './CustomButton.module.scss';

interface CustomSeeMoreProps {
	children: ReactNode;
	width?: string;
	onClick: () => void;
}

const CustomSeeMoreButton: FC<CustomSeeMoreProps> = ({
	children,
	onClick,
	width
}) => {
	return (
		<button
			style={{ width: width }}
			className={`${scss.customButtonSeeMore} `}
			onClick={onClick}
		>
			{children}
		</button>
	);
};

export default CustomSeeMoreButton;
