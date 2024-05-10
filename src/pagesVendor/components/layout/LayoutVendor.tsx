import scss from './LayoutVendor.module.scss';
import { Routes, Route } from 'react-router-dom';
import Header from './header/Header';
import Footer from './footer/Footer';
import HomePage from '../pages/HomePage';
import Login from '@/src/pagesAuth/components/pages/vendorLogin/Login';
import Registration from '@/src/pagesAuth/components/pages/vendorRegistration/Registration';
import BookAddSection from '../pages/boodAddSection/BookAddSection';
import ProfileVendor from '../pages/profileVendor/ProfileVendor';

const LayoutVendor = () => {
	return (
		<>
			<div className={scss.layout}>
				<Header />
				<main>
					<Routes>
						<Route path="/" element={<HomePage />} />
						<Route path="/login" element={<Login />} />
						<Route path="/registration" element={<Registration />} />
						<Route path="/adding_book" element={<BookAddSection />}/>
						<Route path="/profile_vendor" element={<ProfileVendor />}/>
					</Routes>
				</main>
				<Footer />
			</div>
		</>
	);
};
export default LayoutVendor;
