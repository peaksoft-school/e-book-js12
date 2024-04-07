import scss from './LayoutUser.module.scss';
import { Routes, Route } from 'react-router-dom';
import Header from './header/Header';
import Footer from './footer/Footer';
import HomePage from '../pages/HomePage';
import RegistrationPage from '../pages/registration/RegistrationPage';
import LoginPage from '../pages/login/LoginPage';

const LayoutUser = () => {
	return (
		<>
			<div className={scss.videoContainer}>
				<video autoPlay muted loop className={scss.bg_video}>
					<source
						src="https://cdn.pixabay.com/video/2021/01/29/63328-506377472_large.mp4"
						type="video/webm"
					/>
					Your browser does not support the video tag.
				</video>
			</div>
			<div className={scss.layout}>
				<Header />
				<main>
					<Routes>
						<Route path="/" element={<HomePage />} />
						<Route path="/login" element={<LoginPage />} />
						<Route path="/registration" element={<RegistrationPage />} />
					</Routes>
				</main>
				<Footer />
			</div>
		</>
	);
};

export default LayoutUser;
