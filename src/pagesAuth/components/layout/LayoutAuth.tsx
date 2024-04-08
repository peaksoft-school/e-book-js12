import scss from './LayoutAuth.module.scss';
import { Routes, Route } from 'react-router-dom';
import HomePage from '../pages/HomePage';
import RegistrationPage from '../../../pagesAuth/components/pages/registration/RegistrationPage';
import LoginPage from '../../../pagesAuth/components/pages/login/LoginPage';

const LayoutUser = () => {
	return (
		<>
			<div className={scss.videoContainer}>
				<video autoPlay muted loop className={scss.bg_video}>
					<source
						src="https://cdn.pixabay.com/video/2021/08/05/84006-584870923_tiny.mp4"
						type="video/webm"
					/>
					Your browser does not support the video tag.
				</video>
			</div>
			<div className={scss.layout}>
				<main>
					<Routes>
						<Route path="/" element={<HomePage />} />
						<Route path="/login" element={<LoginPage />} />
						<Route path="/registration" element={<RegistrationPage />} />
					</Routes>
				</main>
			</div>
		</>
	);
};

export default LayoutUser;
