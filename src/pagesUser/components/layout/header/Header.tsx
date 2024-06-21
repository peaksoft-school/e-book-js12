import CustomGenreInput from '@/src/ui/customInpute/CustomGenreInput';
import scss from './Header.module.scss';
import { useEffect, useState } from 'react';
import WhiteLikeIcon from '@/src/assets/icons/icon-whiteLike';
import { IconBurgerMenu, IconRedDot } from '@/src/assets/icons';
import LogoeBook from '@/src/ui/logoeBook/LogoeBook';
import WhiteProfileIcon from '@/src/assets/icons/icon-whiteProfile';
import { useLocation, useNavigate } from 'react-router-dom';
import { Modal } from 'antd';
import { useSearchBooksQuery } from '@/src/redux/api/search';
import BlackLikeIcon from '@/src/assets/icons/icon-blackLike';
import { useGetCountInBasketQuery } from '@/src/redux/api/basket';

const Header = () => {
	const [headerScroll, setHeaderScroll] = useState<boolean>(false);
	const [isGenre, setIsGenre] = useState<boolean>(false);
	const [isNavBar, setIsNavBar] = useState<boolean>(false);
	const [isUser, setIsUser] = useState<boolean>(false);
	const [test, setTest] = useState('');
	const [userExit, setUserExit] = useState<boolean>(false);

	const localName = localStorage.getItem('NameClient');
	const localAuth = localStorage.getItem('client');
	const location = useLocation();
	const { data: countBasket } = useGetCountInBasketQuery();
	const [searchTerm, setSearchTerm] = useState<string>('');
	const [showResults, setShowResults] = useState<boolean>(false);
	const { data: searchResults, refetch } = useSearchBooksQuery(
		{ searchTerm },
		{ skip: !searchTerm }
	);

	const scrollToSection = () => {
		const element = document.getElementById(test);
		if (element) {
			window.scrollTo({
				top: element.offsetTop,
				behavior: 'smooth'
			});
			if (test.length > 0) {
				setTest('');
			}
		}
	};

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

	const handleBookClick = (id: number) => {
		navigate(`/search_book/${id}`);
		setShowResults(false);
	};

	const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value;
		setSearchTerm(value);
		setShowResults(!!value);
		refetch();
	};

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
									<LogoeBook
										navigateToHome={() => {
											navigate('/');
										}}
									/>
								</div>
								<div className={scss.searchResults}>
									<div className={scss.search}>
										<CustomGenreInput
											onChange={handleSearchChange}
											value={searchTerm}
											placeholder={
												'Искать жанр, книги, авторов, издательства... '
											}
										/>
									</div>
									<div>
										{showResults && searchResults && (
											<div className={scss.searchResultsLi}>
												<ul>
													{searchResults.map((book) => (
														<li
															onClick={() => handleBookClick(book.id)}
															key={book.id}
														>
															<div>
																<p>{book.title}</p>
															</div>
														</li>
													))}
												</ul>
											</div>
										)}
									</div>
								</div>
								<div className={scss.right_content}>
									<div
										className={scss.favorite_icon}
										onClick={() => navigate('/favorite')}
									>
										{location.pathname === '/favorite' ? (
											<>
												<span style={{ color: 'red' }}>
													<BlackLikeIcon />
												</span>
												<span></span>
											</>
										) : (
											<>
												<span>
													<WhiteLikeIcon />
												</span>
												<span>
													<IconRedDot />
												</span>
											</>
										)}
									</div>
									<div
										className={scss.basket}
										onClick={() => navigate('/basket')}
									>
										<p>Корзина ({countBasket?.totalNumberOfBooks})</p>
									</div>
								</div>
							</div>
							<nav className={scss.nav_bar}>
								<div className={scss.menu_contents}>
									<div className={scss.left_nav_content}>
										<div
											onClick={() => {
												setIsGenre(!isGenre);
												navigate('/search_book');
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
											className={`${isNavBar ? scss.navbar_menu : scss.navbar_none}`}
										>
											<ul>
												<li
													onClick={() => {
														scrollToSection();
														setTest('Ebook');
														if (location.pathname !== '/') {
															navigate('/');
															if (location.pathname === '/') {
																setTimeout(() => {
																	setTest('Ebook');
																}, 300);
															}
														}
													}}
												>
													Электронные книги
												</li>
												<li
													onClick={() => {
														scrollToSection();
														setTest('audioBook');
														if (location.pathname !== '/') {
															navigate('/');
															if (location.pathname === '/') {
																setTimeout(() => {
																	setTest('audioBook');
																}, 300);
															}
														}
													}}
												>
													Audio books
												</li>
												<li
													onClick={() => {
														navigate('/promo_page');
													}}
												>
													Промокоды
												</li>
												<li
													onClick={() => {
														navigate('/vendor/');
													}}
												>
													Начать продавать на eBook
												</li>
											</ul>
										</div>
										<p
											onClick={() => {
												setIsGenre(!isGenre);
												navigate('/search_book');
											}}
										>
											Жанры
										</p>
									</div>
									<div className={scss.center_nav_content}>
										<ul>
											<li
												onClick={() => {
													scrollToSection();
													setTest('Ebook');
													if (location.pathname !== '/') {
														navigate('/');
														if (location.pathname === '/') {
															setTimeout(() => {
																setTest('Ebook');
															}, 300);
														}
													}
												}}
											>
												Электронные книги
											</li>
											<li
												onClick={() => {
													scrollToSection();
													setTest('audioBook');
													if (location.pathname !== '/') {
														navigate('/');
														setTimeout(() => {
															setTest('audioBook');
														}, 300);
													}
												}}
											>
												Audio books
											</li>
											<li
												onClick={() => {
													navigate('/promo_page');
												}}
											>
												Промокоды
											</li>
											<li
												onClick={() => {
													navigate('/vendor/');
												}}
											>
												Начать продавать на eBook
											</li>
										</ul>
									</div>
								</div>
								<div className={scss.right_nav_content}>
									{localAuth ? (
										<>
											<button onClick={() => setIsUser(!isUser)}>
												<p>
													<WhiteProfileIcon />
												</p>
												{localName}
											</button>
										</>
									) : (
										<>
											<button
												className={scss.sign_btn}
												onClick={() => {
													navigate('/auth/login');
												}}
											>
												Войти
											</button>
										</>
									)}
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
														setIsUser(!isUser);
													}}
												>
													Профиль
												</li>
												<hr />
												<li
													onClick={() => {
														setUserExit(!userExit);
														localStorage.removeItem('token');
														localStorage.setItem('isAuth', 'false');
														localStorage.setItem('isVendor', 'false');
														localStorage.setItem('admin', 'false');
													}}
												>
													Выйти
												</li>
											</ul>
										</div>
									</>
								}
								<Modal open={userExit} closable={false} footer={false}>
									<div className={scss.modal_exit}>
										<div className={scss.modal_text}>
											<p>Вы уверены, что хотите выйти?</p>
										</div>
										<div className={scss.footer_modal}>
											<button onClick={() => setUserExit(false)}>
												Отменить
											</button>
											<button
												onClick={() => {
													setUserExit(false);
													navigate('/auth/login');
												}}
											>
												Выйти
											</button>
										</div>
									</div>
								</Modal>
							</nav>
							<div className={scss.search_input}>
								<CustomGenreInput
									onChange={() => {}}
									value=""
									placeholder="Искать жанр, книги, авторов, издательства... "
								/>
							</div>
						</div>
					</div>
				</div>
			</header>
		</>
	);
};

export default Header;
