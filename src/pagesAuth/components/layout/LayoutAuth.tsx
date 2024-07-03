import scss from './LayoutAuth.module.scss';
import { Routes, Route, useLocation } from 'react-router-dom';
import test from '../../../assets/authBacground/141525-777930401_large.mp4';
import HomePage from '../pages/HomePage';
import Login from '../pages/login/Login';
import Registration from '../pages/registration/Registration';
import VendorRegistration from '../pages/vendorRegistration/VendorRegistration';
import ForgotPassword from '../pages/forgotPassword/ForgotPassword';
import ResetPassword from '../pages/resetConfirmPassword/ResetPassword';
import { useEffect } from 'react';

const LayoutAuth = () => {
	const localtion = useLocation();
	useEffect(() => {
		if (localtion.pathname === '/auth/*') {
			localStorage.removeItem('token');
			localStorage.removeItem('EBOOK');
		}
	}, [localtion.pathname]);
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
					<source src={test} type="video/mp4" />
				</video>
				<main>
					<Routes>
						<Route path="/" element={<HomePage />} />
						<Route path="/login" element={<Login />} />
						<Route path="/registration" element={<Registration />} />
						<Route path="/forgot-password" element={<ForgotPassword />} />
						<Route path="/reset-password" element={<ResetPassword />} />
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
