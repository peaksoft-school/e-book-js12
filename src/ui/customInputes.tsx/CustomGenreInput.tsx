import { FC } from 'react';
import scss from './CustomInput.module.scss';
import { IconSearch } from '@/src/assets/icons';

interface TypeProps {
	placeholder: string;
}

const CustomGenreInput: FC<TypeProps> = ({ placeholder }) => {
	return (
		<div className={scss.searchContainer}>
			<input placeholder={placeholder} className={scss.GenreInput} />
			
			<IconSearch />
		</div>
	);
};

export default CustomGenreInput;
