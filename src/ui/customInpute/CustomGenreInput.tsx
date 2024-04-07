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
		<div className={scss.searchContainer}>
			<input
				placeholder={placeholder}
				className={`${scss.GenreInput} ${isFocused ? scss.Focused : ''}`}
				onFocus={handleFocus}
				onBlur={handleBlur}
			/>
			<div
				className={`${scss.SearchIcon} ${isFocused ? scss.FocusedIcon : ''}`}
			>
				<IconSearch />
			</div>
		</div>
	);
};

export default CustomGenreInput;
