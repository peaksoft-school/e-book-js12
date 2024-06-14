import { useNavigate } from 'react-router-dom';
import scss from './LogoeBook.module.scss';

const LogoeBook = () => {
	const navigate = useNavigate();

	const navigateToHome = () => {
		navigate('/');
	};

	return (
		<>
			<div className={scss.LogoContainer} onClick={navigateToHome}>
				<p>eBooK</p>
			</div>
		</>
	);
};

export default LogoeBook;
