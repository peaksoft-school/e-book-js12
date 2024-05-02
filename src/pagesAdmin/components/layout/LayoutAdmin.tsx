import scss from './LayoutAdmin.module.scss';
import { Routes, Route } from 'react-router-dom';
import Header from './header/Header';
import InnerPage from '../pages/InnerPage';
import Navbar from '@/src/ui/navbar/Navbar';
import VendorsPage from '../pages/VendorsPage';
import UserPage from '../pages/UserPage';
import BooksPage from '../pages/BooksPage';
import BookInfo from '../pages/bookInfo/BookInfo';
import AddBookPage from '../pages/AddBookPage';

const LayoutAdmin = () => {
	return (
		<>
			<div className={scss.LayoutAdmin}>
				<Navbar />
				<main>
					<Header />
					<Routes>
						<Route path="/" element={<InnerPage />} />
						<Route path="/inner/:bookInfo" element={<BookInfo />} />
						<Route path="/vendors" element={<VendorsPage />} />
						<Route path="/users" element={<UserPage />} />
						<Route path="/books" element={<BooksPage />} />
						<Route path="/addbook" element={<AddBookPage />} />
					</Routes>
				</main>
			</div>
		</>
	);
};
export default LayoutAdmin;
