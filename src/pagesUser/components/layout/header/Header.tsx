import CustomGenreInput from '@/src/ui/customInpute/CustomGenreInput';
import scss from './Header.module.scss';
import { useEffect, useState } from 'react';
import WhiteLikeIcon from '@/src/assets/icons/icon-whiteLike';
import { IconBurgerMenu, IconRedDot } from '@/src/assets/icons';
import LogoeBook from '@/src/ui/logoeBook/LogoeBook';
import WhiteProfileIcon from '@/src/assets/icons/icon-whiteProfile';
import ExitModal from '@/src/ui/customModals/ExitModal';
import { useNavigate } from 'react-router-dom';

const dataGenre = [
	{
		category: 'Образование',
		quantity: 1234
	},
	{
		category: 'Художественная лит...',
		quantity: 3453
	},
	{
		category: 'Книги для детей',
		quantity: 3453
	},
	{
		category: 'Наука и техника',
		quantity: 3453
	},
	{
		category: 'Общество',
		quantity: 435
	},
	{
		category: 'Деловая литература',
		quantity: 435
	},
	{
		category: 'Красота. Здоровье. Спорт',
		quantity: 435
	},
	{
		category: 'Увлечения',
		quantity: 435
	},
	{
		category: 'Психология',
		quantity: 435
	}
];

const Header = () => {
	const [headerScroll, setHeaderScroll] = useState<boolean>(false);
	const [isGenre, setIsGenre] = useState<boolean>(false);
	const [isNavBar, setIsNavBar] = useState<boolean>(false);
	const [isUser, setIsUser] = useState<boolean>(false);
	const [userExit, setUserExit] = useState<boolean>(false);

	const navigate = useNavigate();

	useEffect(() => {
		const changeHeader = () => {
			if (window.scrollY >= 10) {
				setHeaderScroll(true);
			} else {
				setHeaderScroll(false);
			}
		};

		changeHeader();
		window.addEventListener('scroll', changeHeader);

		return () => {
			window.removeEventListener('scroll', changeHeader);
		};
	}, []);

	return (
		<>
			<header className={scss.Header}>
				<div
					className={
						headerScroll ? `${scss.scroll} ${scss.active}` : `${scss.scroll}`
					}
				>
					<div className="container">
						<div className={scss.content}>
							<div className={scss.header_content}>
								<div
									className={scss.logo_content}
									onClick={() => {
										navigate('/');
									}}
								>
									<LogoeBook />
								</div>
								
								<div className={scss.input_content}>
									<CustomGenreInput placeholder="Искать жанр, книги, авторов, издательства... " />
								</div>
								<div className={scss.right_content}>
									<div
										className={scss.favorite_icon}
										onClick={() => navigate('/favorite')}
									>
										<span>
											<WhiteLikeIcon />
										</span>
										<span>
											<IconRedDot />
										</span>
									</div>
									<div
										className={scss.basket}
										onClick={() => navigate('/basket')}
									>
										<p>Корзина (3)</p>
									</div>
								</div>
							</div>
							<nav className={scss.nav_bar}>
								<div className={scss.menu_contents}>
									<div className={scss.left_nav_content}>
										<div
											onClick={() => {
												setIsGenre(!isGenre);
											}}
											className={scss.click_genre_container}
										>
											<IconBurgerMenu />
										</div>

										<div
											onClick={() => {
												setIsNavBar(!isNavBar);
											}}
											className={scss.burger_menu}
										>
											<IconBurgerMenu />
										</div>
										<div
											className={`${scss.navbar_menu} ${isNavBar ? scss.navbar_block : scss.navbar_none}`}
										>
											<ul>
												<li>Электронные книги</li>
												<li>Audio books</li>
												<li>Промокоды</li>
												<li>Начать продавать на eBook</li>
											</ul>
										</div>
										<p
											onClick={() => {
												setIsGenre(!isGenre);
											}}
										>
											Жанры
										</p>
									</div>
									<div className={scss.center_nav_content}>
										<ul>
											<li>Электронные книги</li>
											<li>Audio books</li>
											<li>Промокоды</li>
											<li>Начать продавать на eBook</li>
										</ul>
									</div>
								</div>
								<div className={scss.right_nav_content}>
									<button onClick={() => setIsUser(!isUser)}>
										<p>
											<WhiteProfileIcon />
										</p>
										Ибра
									</button>
								</div>
								{
									<>
										<div
											className={`${isUser ? scss.user_drop : scss.user_down}`}
										>
											<ul>
												<li
													onClick={() => {
														navigate('/profile');
													}}
												>
													Профиль
												</li>
												<hr />
												<li onClick={() => setUserExit(!userExit)}>Выйти</li>
											</ul>
										</div>
									</>
								}
								{userExit ? (
									<>
										<ExitModal
											isOpen={userExit}
											onClose={() => setUserExit(false)}
											btnClose={() => {
												navigate('/auth/login');
											}}
										/>
									</>
								) : null}
							</nav>
							<div className={scss.search_input}>
								<CustomGenreInput placeholder="Искать жанр, книги, авторов, издательства... " />
							</div>
							<div className={scss.position_container}>
								{
									<div
										className={
											isGenre ? scss.genre_container : scss.close_conrtainer
										}
									>
										<div className={scss.lefts_genre}>
											{dataGenre.map((item, index) => (
												<div className={scss.name_genre} key={index}>
													<p>{item.category}</p>
													<span>{item.quantity}</span>
												</div>
											))}
										</div>
										<div className={scss.center_genre}>
											{dataGenre.map((item, index) => (
												<div className={scss.name_genre} key={index}>
													<p>{item.category}</p>
													<span>{item.quantity}</span>
												</div>
											))}
										</div>
										<div className={scss.rights_genre}>
											{dataGenre.map((item, index) => (
												<div className={scss.name_genre} key={index}>
													<p>{item.category}</p>
													<span>{item.quantity}</span>
												</div>
											))}
										</div>
									</div>
								}
							</div>
						</div>
					</div>
				</div>
			</header>
		</>
	);
};

export default Header;
