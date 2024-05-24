import { ChangeEvent, FC, useState } from 'react';
import scss from './Style.module.scss';
import { IconSearch } from '@/src/assets/icons';

interface TypeProps {
	placeholder: string;
	value: string;
	onChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

const CustomGenreInput: FC<TypeProps> = ({ placeholder, value, onChange }) => {
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
				value={value}
				placeholder={placeholder}
				className={`${scss.genre_input} ${isFocused ? scss.focused : ''}`}
				onFocus={handleFocus}
				onBlur={handleBlur}
				onChange={onChange}
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
