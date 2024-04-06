import { FC } from 'react';
import scss from './CustomInput.module.scss';
import EyeSeeIcon from '@/src/assets/icons/EyeSeeIcon';

interface TypeProps {
	placeholder: string;
	type: string;
}
const CustomPasswordInput: FC<TypeProps> = ({ placeholder, type }) => {
	return (
		<div className={scss.passwordContainer}>
			<input
				placeholder={placeholder}
				type={type}
				className={scss.passwordInput}
			/>
			<EyeSeeIcon />
		</div>
	);
};

export default CustomPasswordInput;
