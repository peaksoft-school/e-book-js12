import scss from './LayoutVendor.module.scss';
import { Routes, Route, useLocation } from 'react-router-dom';
import Header from './header/Header';
import Footer from './footer/Footer';
import HomePage from '../pages/HomePage';
import AboutBook from '../pages/aboutBook/AboutBook';
import BookAddSection from '../pages/bookAddSection/BookAddSection';
import ProfileVendor from '../pages/profileVendor/ProfileVendor';
import VendorsBooks from '../pages/homeSections/VendorsBooks';

const LayoutVendor = () => {
	const location = useLocation();

	return (
		<>
			<div className={scss.layout}>
				{location.pathname === '/vendor/registration' ||
				location.pathname === '/vendor/login' ||
				location.pathname === '/vendor/' ? null : (
					<>
						<Header />
					</>
				)}
				<main>
					<Routes>
						<Route path="/" element={<HomePage />} />
						<Route path="/home" element={<VendorsBooks />} />
						<Route path="/:id" element={<AboutBook />} />
						<Route path="/addBook" element={<BookAddSection />} />
						<Route path="/profile" element={<ProfileVendor />} />
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
