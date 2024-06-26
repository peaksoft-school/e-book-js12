import scss from './LayoutVendor.module.scss';
import { Routes, Route, useLocation } from 'react-router-dom';
import Header from './header/Header';
import HomePage from '../pages/HomePage';
import AddBookPage from '../pages/AddBookPage';
import AboutBookPage from '../pages/AboutBookPage';
import ProfilePage from '../pages/ProfilePage';
import Footer from './footer/Footer';
import VendorBooksPage from '../pages/VendorBooksPage';
import EditBookPage from '../pages/EditBookPage';
import Notification from '../pages/Notification';

const LayoutVendor = () => {
	const location = useLocation();

	return (
		<>
			<div className={scss.layout}>
				{location.pathname === '/vendor/registration' ||
				location.pathname === '/vendor/login' ||
				location.pathname === '/vendor/' ||
				location.pathname === '/vendor' ? null : (
					<>
						<Header />
					</>
				)}
				<main>
					<Routes>
						<Route path="/" element={<HomePage />} />
						<Route path="/home" element={<VendorBooksPage />} />
						<Route path="/home/:id" element={<AboutBookPage />} />
						<Route path="/addBook" element={<AddBookPage />} />
						<Route path="/profile" element={<ProfilePage />} />
						<Route path="/home/editBook/:id" element={<EditBookPage />} />
						<Route path="vendor/notification" element={<Notification />} />
						<Route path="vendor/notification/:id" element={<AboutBookPage />} />
					</Routes>
				</main>
				{location.pathname === '/vendor/registration' ||
				location.pathname === '/vendor/login' ? null : (
					<>
						<Footer />
					</>
				)}
			</div>
		</>
	);
};
export default LayoutVendor;
