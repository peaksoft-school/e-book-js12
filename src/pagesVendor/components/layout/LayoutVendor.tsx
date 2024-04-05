import scss from './LayoutVendor.module.scss';
import { Routes, Route } from 'react-router-dom';
import Header from './header/Header';
import Footer from './footer/Footer';
import HomePage from '../pages/HomePage';

const LayoutVendor = () => {
	return (
		<>
			<div className={scss.layout}>
				<Header />
				<main>
					<Routes>
						<Route path="/" element={<HomePage />} />
					</Routes>
				</main>
				<Footer />
			</div>
		</>
	);
};
export default LayoutVendor;