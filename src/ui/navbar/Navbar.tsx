import {
	IconWhiteApplicationsIcon,
	IconWhiteBooksIcon,
	IconWhiteSellersIcon,
	IconWhiteUsersIcon
} from '@/src/assets/icons';
import LogoeBook from '../logoeBook/LogoeBook';
import scss from './Navbar.module.scss';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
	const location = useLocation();

	return (
		<div className={scss.Navbar}>
			<nav>
				<span>
					<LogoeBook />
				</span>
				<ul>
					<Link
						to={'/admin'}
						className={`${scss.links} ${location.pathname === '/admin' ? scss.links_active : ''}`}
					>
						<li
							className={`${scss.li} ${location.pathname === '/admin' ? scss.li_active : ''}`}
						>
							<IconWhiteApplicationsIcon />
							<p> Заявки</p>
						</li>
					</Link>
					<Link
						to={'/admin/vendors'}
						className={`${scss.links} ${location.pathname === '/admin/vendors' ? scss.links_active : ''}`}
					>
						<li
							className={`${scss.li} ${location.pathname === '/admin/vendors' ? scss.li_active : ''}`}
						>
							<IconWhiteSellersIcon />
							<p>Продавцы</p>
						</li>
					</Link>
					<Link
						to={'/admin/users'}
						className={`${scss.links} ${location.pathname === '/admin/users' ? scss.links_active : ''}`}
					>
						<li
							className={`${scss.li} ${location.pathname === '/admin/users' ? scss.li_active : ''}`}
						>
							<IconWhiteUsersIcon />
							<p>Пользователи</p>
						</li>
					</Link>
					<Link
						to={'/admin/books'}
						className={`${scss.links} ${location.pathname === '/admin/books' ? scss.links_active : ''}`}
					>
						<li
							className={`${scss.li} ${location.pathname === '/admin/books' ? scss.li_active : ''}`}
						>
							<IconWhiteBooksIcon />
							<p>Книги</p>
						</li>
					</Link>
				</ul>
			</nav>
		</div>
	);
};

export default Navbar;
