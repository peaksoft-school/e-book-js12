import { FC, ReactNode } from 'react';
import scss from './CustomButton.module.scss';

interface CustomAddBookProps {
	children: ReactNode;
	onClick: () => void;
}

const CustomAddBookButton: FC<CustomAddBookProps> = ({ children, onClick }) => {
	return (
		<button
			className={`${scss.customButtonAddBook}  ${children}`}
			onClick={onClick}
		>
			{children}
		</button>
	);
};

export default CustomAddBookButton;
