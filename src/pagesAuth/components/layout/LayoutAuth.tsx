import scss from './LayoutAuth.module.scss';
import { Routes, Route } from 'react-router-dom';
import HomePage from '../pages/HomePage';
import Login from '../pages/login/Login';
import Registration from '../pages/registration/Registration';
import VendorRegistration from '../pages/vendorRegistration/VendorRegistration';

const LayoutAuth = () => {
	return (
		<>
			<div className={scss.layout}>
				<video
					autoPlay
					muted
					loop
					id="background-video"
					className={scss['background-video']}
				>
					<source
						src="https://media.gettyimages.com/id/1391170263/video/turning-pages-loopable.mp4?s=mp4-640x640-gi&k=20&c=2dOYEcJ5_mWMSnXezEULnoVBctXo4Hve2VWqdXDFGl0="
						type="video/mp4"
					/>
				</video>
				<main>
					<Routes>
						<Route path="/" element={<HomePage />} />
						<Route path="/login" element={<Login />} />
						<Route path="/registration" element={<Registration />} />
						<Route
							path="/vendor/registration"
							element={<VendorRegistration />}
						/>
					</Routes>
				</main>
			</div>
		</>
	);
};

export default LayoutAuth;
