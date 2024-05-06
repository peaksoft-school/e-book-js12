import { FC, useState } from 'react';
import scss from './Style.module.scss';
import { IconSearch } from '@/src/assets/icons';

interface TypeProps {
	placeholder: string;
}

const CustomGenreInput: FC<TypeProps> = ({ placeholder }) => {
	const [isFocused, setIsFocused] = useState(false);

	const handleFocus = () => {
		setIsFocused(true);
	};

	const handleBlur = () => {
		setIsFocused(false);
	};

	return (
		<div className={scss.search_container}>
			<input
				placeholder={placeholder}
				className={`${scss.genre_input} ${isFocused ? scss.focused : ''}`}
				onFocus={handleFocus}
				onBlur={handleBlur}
			/>
			<div
				className={`${scss.search_icon} ${isFocused ? scss.focused_icon : ''}`}
			>
				<IconSearch />
			</div>
		</div>
	);
};

export default CustomGenreInput;
