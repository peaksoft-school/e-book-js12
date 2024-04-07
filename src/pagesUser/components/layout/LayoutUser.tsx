import scss from './LayoutUser.module.scss';
import { Routes, Route } from 'react-router-dom';
import Header from './header/Header';
import Footer from './footer/Footer';
import HomePage from '../pages/HomePage';
import CustomAddPhoto from '@/src/ui/customAddPhoto/CustomAddPhoto';

const LayoutUser = () => {
	return (
		<>
			<div className={scss.layout}>
				<Header />
				<main>
					<Routes>
						<Route path="/" element={<HomePage />} />
					</Routes>
					<CustomAddPhoto/>
				</main>
				<Footer />
			</div>
		</>
	);
};
export default LayoutUser;
