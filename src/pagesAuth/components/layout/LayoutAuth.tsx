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
