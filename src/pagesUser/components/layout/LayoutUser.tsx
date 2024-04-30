import scss from './LayoutUser.module.scss';
import { Routes, Route } from 'react-router-dom';
import Header from './header/Header';
import Footer from './footer/Footer';
import HomePage from '../pages/HomePage';
import SearchPage from '../pages/SearchPage';
import FavoritePage from '../pages/FavoritePage';
import Basket from '../pages/Basket';
import BookInfoPage from '../pages/BookInfoPage';
import PromoPage from '../pages/PromoPage';
const LayoutUser = () => {
	return (
		<>
			<div className={scss.layout}>
				<Header />
				<main>
					<Routes>
						<Route path="/" element={<HomePage />} />
						<Route path="/search_book" element={<SearchPage />} />
						<Route path="/favorite" element={<FavoritePage />} />
						<Route path="/basket" element={<Basket />} />
						<Route path="/book_info" element={<BookInfoPage />} />
						<Route path="/promo_page" element={<PromoPage />} />
					</Routes>
				</main>
				<Footer />
			</div>
		</>
	);
};
export default LayoutUser;
