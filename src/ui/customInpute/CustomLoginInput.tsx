/* eslint-disable */
//@ts-nocheck
import { UseFormRegister, FieldValues } from 'react-hook-form';
import scss from './Style.module.scss';

type FieldPath<T extends FieldValues> = keyof T | (keyof T)[];

interface TypeProps<T extends FieldValues> {
	placeholder: string;
	type: string;
	register: UseFormRegister<T>;
	registerName: FieldPath<T>;
}

const CustomLoginInput = <T extends FieldValues>({
	placeholder,
	type,
	register,
	registerName
}: TypeProps<T>) => {
	return (
		<input
			placeholder={placeholder}
			required={true}
			{...register(registerName, { required: true })}
			type={type}
			className={scss.login_input}
		/>
	);
};

export default CustomLoginInput;
