import { IconBlackLeftArrow, IconBlackRightArrow } from '@/src/assets/icons';
import { FC, useState } from 'react';
import scss from './Style.module.scss';

interface TypeProps {
	placeholder: string;
	value: string;
	setValue: React.Dispatch<React.SetStateAction<string>>;
	keyDownFunction: () => void;
}
const CustomPromoInput: FC<TypeProps> = ({
	placeholder,
	value,
	setValue,
	keyDownFunction
}) => {
	const [focus, setIsFocus] = useState(false);
	return (
		<div className={scss.promo_container}>
			<input
				placeholder={placeholder}
				className={scss.promo_input}
				onFocus={() => setIsFocus(true)}
				onBlur={() => setIsFocus(false)}
				value={value}
				onChange={(e) => setValue(e.target.value)}
				onKeyDown={(e) => {
					if (e.key === 'Enter') {
						keyDownFunction();
					}
				}}
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
