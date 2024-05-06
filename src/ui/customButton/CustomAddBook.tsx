import { FC, ReactNode } from 'react';
import scss from './Style.module.scss';

interface CustomAddBookProps {
	children: ReactNode;
	onClick: () => void;
}

const CustomAddBookButton: FC<CustomAddBookProps> = ({ children, onClick }) => {
	return (
		<button className={`${scss.custom_button_add_book}`} onClick={onClick}>
			{children}
		</button>
	);
};

export default CustomAddBookButton;
