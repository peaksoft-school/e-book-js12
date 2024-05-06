import { FC } from 'react';
import scss from './Style.module.scss';
import { IconBlackRightArrow } from '@/src/assets/icons';

interface TypeProps {
	placeholder: string;
}
const CustomPromoInput: FC<TypeProps> = ({ placeholder }) => {
	return (
		<div className={scss.promo_container}>
			<input placeholder={placeholder} className={scss.promo_input} />
			<IconBlackRightArrow />
		</div>
	);
};

export default CustomPromoInput;
