import { FC } from 'react';
import scss from './LogoeBook.module.scss';
interface TypeProps {
	navigateToHome: () => void;
}
const LogoeBook: FC<TypeProps> = ({ navigateToHome }) => {
	return (
		<>
			<div className={scss.LogoContainer} onClick={navigateToHome}>
				<p>eBooK</p>
			</div>
		</>
	);
};

export default LogoeBook;
