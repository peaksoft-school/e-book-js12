import scss from './LayoutUser.module.scss';
import { Routes, Route, useLocation } from 'react-router-dom';
import Header from './header/Header';
import Footer from './footer/Footer';
import HomePage from '../pages/HomePage';
import SearchPage from '../pages/SearchPage';
import FavoritePage from '../pages/FavoritePage';
import Basket from '../pages/Basket';
import BookInfoPage from '../pages/BookInfoPage';
import ProfilePageContainer from '../pages/profilePageContainer/ProfilePageContainer';
import PromoPage from '../pages/PromoPage';
import ConfirmPaymentPage from '../pages/ConfirmPaymentPage';
const LayoutUser = () => {
	const { pathname } = useLocation();
	return (
		<>
			<div className={scss.layout}>
				{pathname === '/payment' || pathname === '/confirmPayment' ? null : (
					<>
						<Header />
					</>
				)}
				<main>
					<Routes>
						<Route path="/" element={<HomePage />} />
						<Route path="/profile" element={<ProfilePageContainer />} />
						<Route path="/search_book" element={<SearchPage />} />
						<Route path="/search_book/:id" element={<BookInfoPage />} />
						<Route path="/:id" element={<BookInfoPage />} />
						<Route path="/favorite" element={<FavoritePage />} />
						<Route path="/basket" element={<Basket />} />
						<Route path="/promo_page" element={<PromoPage />} />
						<Route path="/confirmPayment" element={<ConfirmPaymentPage />} />
					</Routes>
				</main>
				{pathname === '/payment' || pathname === '/confirmPayment' ? null : (
					<>
						<Footer />
					</>
				)}
			</div>
		</>
	);
};
export default LayoutUser;
