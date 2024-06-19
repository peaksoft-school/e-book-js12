import scss from './LayoutUser.module.scss';
import { Routes, Route } from 'react-router-dom';
import Header from './header/Header';
import Footer from './footer/Footer';
import HomePage from '../pages/HomePage';
import SearchPage from '../pages/SearchPage';
import FavoritePage from '../pages/FavoritePage';
import Basket from '../pages/Basket';
import BookInfoPage from '../pages/BookInfoPage';
import ProfilePageContainer from '../pages/profilePageContainer/ProfilePageContainer';
import PromoPage from '../pages/PromoPage';
const LayoutUser = () => {
	return (
		<>
			<div className={scss.layout}>
				<Header />
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
					</Routes>
				</main>
				<Footer />
			</div>
		</>
	);
};
export default LayoutUser;
