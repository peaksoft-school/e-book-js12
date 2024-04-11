import CustomGenreInput from '@/src/ui/customInpute/CustomGenreInput';
import scss from './Header.module.scss';
import { useEffect, useState } from 'react';
import WhiteLikeIcon from '@/src/assets/icons/icon-whiteLike';
import { IconBurgerMenu, IconRedDot } from '@/src/assets/icons';
import LogoeBook from '@/src/ui/logoeBook/LogoeBook';
import WhiteProfileIcon from '@/src/assets/icons/icon-whiteProfile';

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
							<div className={scss.header_Content}>
								<div className={scss.logo_Content}>
									<LogoeBook />
								</div>
								<div className={scss.input_Content}>
									<CustomGenreInput placeholder="Искать жанр, книги, авторов, издательства... " />
								</div>
								<div className={scss.right_Content}>
									<div className={scss.favorite_icon}>
										<WhiteLikeIcon />
										<IconRedDot />
									</div>
									<div className={scss.basket}>
										<p>Корзина (3)</p>
									</div>
								</div>
							</div>
							<nav className={scss.nav_bar}>
								<div className={scss.left_nav_Content}>
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
									{isNavBar ? (
										<div className={scss.navbar_menu}>
											<ul>
												<li
													onClick={() => {
														setIsGenre(!isGenre);
													}}
												>
													Жанры
												</li>
												<li>Электронные книги</li>
												<li>Audio books</li>
												<li>Промокоды</li>
												<li>Начать продавать на eBook</li>
											</ul>
										</div>
									) : null}
									<p>Жанры</p>
								</div>
								<div className={scss.center_nav_Content}>
									<ul>
										<li>Электронные книги</li>
										<li>Audio books</li>
										<li>Промокоды</li>
										<li>Начать продавать на eBook</li>
									</ul>
								</div>
								<div className={scss.right_nav_Content}>
									<button>
										<p>
											<WhiteProfileIcon />
										</p>
										Ибра
									</button>
								</div>
							</nav>
							{isGenre ? (
								<>
									<div className={scss.genre_container}>
										<div className={scss.lefts_genre}>
											{dataGenre.map((item, index) => (
												<div className={scss.name_genre} key={index}>
													<p>{item.category}</p>
													<span>{item.quantity}</span>
												</div>
											))}
										</div>
										<div className={scss.centers_genre}>
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
								</>
							) : null}
						</div>
					</div>
				</div>
			</header>
		</>
	);
};

export default Header;
