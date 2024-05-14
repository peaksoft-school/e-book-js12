import scss from './LayoutVendor.module.scss';
import { Routes, Route } from 'react-router-dom';
import Header from './header/Header';
import Footer from './footer/Footer';
// import HomePage from '../pages/HomePage';
import Login from '@/src/pagesAuth/components/pages/vendorLogin/Login';
import Registration from '@/src/pagesAuth/components/pages/vendorRegistration/Registration';
import AboutBook from '../pages/aboutBook/AboutBook';
import BookAddSection from '../pages/bookAddSection/BookAddSection';
import ProfileVendor from '../pages/profileVendor/ProfileVendor';
import VendorsBooks from '../pages/homeSections/VendorsBooks';

const LayoutVendor = () => {
	return (
		<>
			<div className={scss.layout}>
				<Header />
				<main>
					<Routes>
						{/* <Route path="/" element={<HomePage />} /> */}
						<Route path="/" element={<VendorsBooks />} />
						<Route path="vendor/:id" element={<AboutBook />} />
						<Route path="vendor/addBook" element={<BookAddSection />} />
						<Route path="vendor/profile" element={<ProfileVendor />} />
						<Route path="/login" element={<Login />} />
						<Route path="/registration" element={<Registration />} />
					</Routes>
				</main>
				<Footer />
			</div>
		</>
	);
};
export default LayoutVendor;
