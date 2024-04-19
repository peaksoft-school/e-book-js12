import scss from './LayoutAuth.module.scss';
import { Routes, Route } from 'react-router-dom';
import HomePage from '../pages/HomePage';
import Login from '../pages/login/Login';
import Registration from '../pages/registration/Registration';

const LayoutAuth = () => {
	return (
		<>
			<div className={scss.layout}>
				<main>
					<Routes>
						<Route path="/" element={<HomePage />} />
						<Route path="/login" element={<Login />} />
						<Route path="/registration" element={<Registration />} />
					</Routes>
				</main>
			</div>
		</>
	);
};
export default LayoutAuth;
