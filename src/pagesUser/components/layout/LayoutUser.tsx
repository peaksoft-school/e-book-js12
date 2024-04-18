import scss from './LayoutUser.module.scss';
import { Routes, Route } from 'react-router-dom';
import Header from './header/Header';
import Footer from './footer/Footer';
import HomePage from '../pages/HomePage';
import Bestsellers from '../pages/bestsellers/Bestsellers';
const LayoutUser = () => {
	return (
		<>
			<div className={scss.layout}>
				<Header />
				<main>
					<Routes>
						<Route path="/" element={<HomePage />} />
						<Route path="/bestseller" element={<Bestsellers />} />
					</Routes>
				</main>
				<Footer />
			</div>
		</>
	);
};
export default LayoutUser;
