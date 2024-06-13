import { FC, useState } from 'react';
import scss from './Style.module.scss';
import { IconBlackLeftArrow, IconBlackRightArrow } from '@/src/assets/icons';

interface TypeProps {
	placeholder: string;
}
const CustomPromoInput: FC<TypeProps> = ({ placeholder }) => {
	const [focus, setIsFocus] = useState(false);
	return (
		<div className={scss.promo_container}>
			<input
				placeholder={placeholder}
				className={scss.promo_input}
				onFocus={() => setIsFocus(true)}
				onBlur={() => setIsFocus(false)}
			/>
			<div className={scss.icon_container}>
				<div className={focus ? scss.icon : scss.close}>
					<div className={scss.right}>
						<IconBlackRightArrow />
					</div>
					<div className={scss.left}>
						<IconBlackLeftArrow />
					</div>
				</div>
			</div>
		</div>
	);
};

export default CustomPromoInput;
