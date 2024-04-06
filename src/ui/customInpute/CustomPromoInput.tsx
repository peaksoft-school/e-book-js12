import { FC } from 'react';
import scss from './Style.module.scss';
import { BlackRightArrow } from '@/src/assets/icons';

interface TypeProps {
	placeholder: string;
}
const CustomPromoInput: FC<TypeProps> = ({ placeholder }) => {
	return (
		<div className={scss.promoContainer}>
			<input placeholder={placeholder} className={scss.PromoInput} />
			<BlackRightArrow />
		</div>
	);
};

export default CustomPromoInput;
