import { FC, useState } from 'react';
import scss from './Style.module.scss';
import EyeSeeIcon from '@/src/assets/icons/icon-eyeSee';
import EyeClose from '@/src/assets/icons/icon-eyeClose';

interface TypeProps {
	placeholder: string;
	type: string;
}

const CustomPasswordInput: FC<TypeProps> = ({ placeholder, type }) => {
	const [showPassword, setShowPassword] = useState(true);
	const [icon, setIcon] = useState(<EyeSeeIcon />);
	const [isFocused, setIsFocused] = useState(false);

	const togglePasswordVisibility = () => {
		setShowPassword(!showPassword);
		setIcon(showPassword ? <EyeClose /> : <EyeSeeIcon />);
	};

	const handleFocus = () => {
		setIsFocused(true);
	};

	const handleBlur = () => {
		setIsFocused(false);
	};

	return (
		<div className={scss.passwordContainer}>
			<input
				placeholder={placeholder}
				type={showPassword ? 'text' : type}
				className={`${scss.passwordInput} ${isFocused ? scss.FocusedIcon : ''}`}
				onFocus={handleFocus}
				onBlur={handleBlur}
			/>
			<div
				onClick={togglePasswordVisibility}
				className={`${scss.EyeSeeIcon} ${isFocused ? scss.FocusedIcon : ''}`}
			>
				{icon}
			</div>
		</div>
	);
};

export default CustomPasswordInput;
