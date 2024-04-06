import { FC } from 'react';
import scss from './CustomInput.module.scss';

interface TypeProps {
	placeholder: string;
}

const CustomUserNameInput: FC<TypeProps> = ({ placeholder }) => {
	return (
		<>
			<input placeholder={placeholder} className={scss.userNameInput} />
		</>
	);
};

export default CustomUserNameInput;
