import scss from './LayoutUser.module.scss';
import { Routes, Route } from 'react-router-dom';
import Header from './header/Header';
import Footer from './footer/Footer';
import HomePage from '../pages/HomePage';
import BasketPage from '../pages/basketPage/BasketPage';
import Ebooks from '../pages/eBooks/Ebooks';
const LayoutUser = () => {
	return (
		<>
			<div className={scss.layout}>
				<Header />
				<main>
					<Routes>
						<Route path="/" element={<HomePage />} />
						<Route path="/basket" element={<BasketPage />} />
						<Route path="/eBook" element={<Ebooks />} />
					</Routes>
				</main>
				<Footer />
			</div>
		</>
	);
};
export default LayoutUser;
