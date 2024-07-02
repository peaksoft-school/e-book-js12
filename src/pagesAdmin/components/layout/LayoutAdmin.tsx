import scss from './LayoutAdmin.module.scss';
import { Routes, Route } from 'react-router-dom';
import Header from './header/Header';
import InnerPage from '../pages/InnerPage';
import Navbar from '@/src/ui/navbar/Navbar';
import VendorsPage from '../pages/VendorsPage';
import UserPage from '../pages/UserPage';
import BooksPage from '../pages/BooksPage';
import AddBookPage from '../pages/AddBookPage';
import BookInfoPage from '../pages/BookInfoPage';
import AboutVendorPage from '../pages/AboutVendorPage';
import UserAboutPage from '../pages/UserAboutPage';
import EditBookAdminPage from '../pages/EditBookAdminPage';
import AboutBookPage from '../pages/AboutBookPage';

const LayoutAdmin = () => {
	return (
		<>
			<div className={scss.LayoutAdmin}>
				<Navbar />
				<main>
					<Header />
					<Routes>
						<Route path="/" element={<InnerPage />} />
						<Route path="/edit/:id" element={<EditBookAdminPage />} />
						<Route path="/vendors" element={<VendorsPage />} />
						<Route path="/users" element={<UserPage />} />
						<Route path="/books" element={<BooksPage />} />
						<Route path="/books/:id" element={<AboutBookPage />} />
						<Route path="/books/edit/:id" element={<EditBookAdminPage />} />
						<Route path="/users/books/:id" element={<AboutBookPage />} />
						<Route path="/books/add_book" element={<AddBookPage />} />
						<Route path="/vendors/books/:id" element={<AboutBookPage />} />
						<Route path="/inner/:id" element={<BookInfoPage />} />
						<Route path="/users/:fullName" element={<UserAboutPage />} />
						<Route path="/users/:id/:fullName" element={<AboutBookPage />} />
						<Route path="/vendors/:name" element={<AboutVendorPage />} />
					</Routes>
				</main>
			</div>
		</>
	);
};
export default LayoutAdmin;
