/* eslint-disable @typescript-eslint/no-explicit-any */
import { FC, useState } from 'react';
import scss from './Style.module.scss';
import EyeSeeIcon from '@/src/assets/icons/icon-eyeSee';
import EyeClose from '@/src/assets/icons/icon-eyeClose';

interface TypeProps {
	placeholder: string;
	type: string;
	register: any;
	registerName: string;
}

const CustomPasswordInput: FC<TypeProps> = ({
	placeholder,
	type,
	register,
	registerName
}) => {
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
		<div className={scss.password_container}>
			<input
				required={true}
				minLength={4}
				placeholder={placeholder}
				type={showPassword ? 'text' : type}
				className={`${scss.password_input} ${isFocused ? scss.FocusedIcon : ''}`}
				onFocus={handleFocus}
				onBlur={handleBlur}
				{...register(`${registerName}`, { require: true })}
			/>
			<div
				onClick={togglePasswordVisibility}
				className={`${scss.eye_see_icon} ${isFocused ? scss.FocusedIcon : ''}`}
			>
				{icon}
			</div>
		</div>
	);
};

export default CustomPasswordInput;
