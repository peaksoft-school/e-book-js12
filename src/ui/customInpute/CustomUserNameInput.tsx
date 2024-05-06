import { FC } from 'react';
import scss from './Style.module.scss';

interface TypeProps {
	placeholder: string;
}

const CustomUserNameInput: FC<TypeProps> = ({ placeholder }) => {
	return (
		<>
			<input placeholder={placeholder} className={scss.user_name_input} />
		</>
	);
};

export default CustomUserNameInput;
