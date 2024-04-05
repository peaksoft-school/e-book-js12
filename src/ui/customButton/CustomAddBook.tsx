import { FC, ReactNode } from 'react';
import scss from './CustomButton.module.scss';

interface CustomAddBookProps {
	children: ReactNode;
	width?: string;
	onClick: () => void;
}

const CustomAddBookButton: FC<CustomAddBookProps> = ({
	children,
	onClick,
	width
}) => {
	return (
		<button
			style={{ width: width }}
			className={`${scss.customButtonAddBook}  ${children}`}
			onClick={onClick}
		>
			{children}
		</button>
	);
};

export default CustomAddBookButton;
