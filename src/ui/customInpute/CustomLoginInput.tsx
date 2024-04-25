import { FC } from 'react';
import scss from './Style.module.scss';

interface TypeProps {
	placeholder: string;
	type: string;
}
const CustomLoginInput: FC<TypeProps> = ({ placeholder, type }) => {
	return (
		<input placeholder={placeholder} type={type} className={scss.login_input} />
	);
};

export default CustomLoginInput;
