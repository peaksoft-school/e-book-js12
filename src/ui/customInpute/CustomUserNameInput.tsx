/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { FC, useEffect } from 'react';
import scss from './Style.module.scss';

interface TypeProps {
	placeholder: string;
	registerName: string;
	register: any;
	refError: any;
	validateError: any;
}

const CustomUserNameInput: FC<TypeProps> = ({
	placeholder,
	registerName,
	register,
	refError,
	validateError
}) => {
	useEffect(() => {
		if (refError.current === '') {
			console.log('hi');
		}
	}, []);

	return (
		<input
			type="text"
			required={true}
			minLength={4}
			placeholder={placeholder}
			className={validateError ? scss.input_error : scss.user_name_input}
			{...register(registerName, { require: true, minLength: 4 })}
		/>
	);
};

export default CustomUserNameInput;
