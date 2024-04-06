import { FC, ReactNode } from 'react';
import scss from './Style.module.scss';

interface CustomPersonalAreaProps {
	children: ReactNode;
	onClick: () => void;
}

const CustomPersonalAreaButton: FC<CustomPersonalAreaProps> = ({
	children,
	onClick
}) => {
	return (
		<button className={`${scss.customButtonPersonal} `} onClick={onClick}>
			{children}
		</button>
	);
};

export default CustomPersonalAreaButton;
