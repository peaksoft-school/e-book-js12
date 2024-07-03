import CustomGenreInput from '@/src/ui/customInpute/CustomGenreInput';
import scss from './Header.module.scss';
import { useEffect, useRef, useState } from 'react';
import WhiteLikeIcon from '@/src/assets/icons/icon-whiteLike';
import { IconBurgerMenu, IconRedDot } from '@/src/assets/icons';
import LogoeBook from '@/src/ui/logoeBook/LogoeBook';
import WhiteProfileIcon from '@/src/assets/icons/icon-whiteProfile';
import { useLocation, useNavigate } from 'react-router-dom';
import { Modal } from 'antd';
import { useSearchBooksQuery } from '@/src/redux/api/search';
import BlackLikeIcon from '@/src/assets/icons/icon-blackLike';
import { useGetCountInBasketQuery } from '@/src/redux/api/basket';
import { useGetCountOfBooksInFavoriteQuery } from '@/src/redux/api/favorite';

const Header = () => {
	const [headerScroll, setHeaderScroll] = useState<boolean>(false);
	const [isGenre, setIsGenre] = useState<boolean>(false);
	const [isNavBar, setIsNavBar] = useState<boolean>(false);
	const [isUser, setIsUser] = useState<boolean>(false);
	const [userExit, setUserExit] = useState<boolean>(false);
	const localAuth = localStorage.getItem('client');
	const localName = localStorage.getItem('NameClient');

	const location = useLocation();
	const { data: countBasket } = useGetCountInBasketQuery();
	const [searchTerm, setSearchTerm] = useState<string>('');
	const [showResults, setShowResults] = useState<boolean>(false);
	const searchResultsRef = useRef<HTMLDivElement>(null);
	const [vendorModal, setVendorModal] = useState(false);

	const { data: searchResults, refetch } = useSearchBooksQuery(
		{ searchTerm },
		{ skip: !searchTerm }
	);

	const { data: countOfFavorite } = useGetCountOfBooksInFavoriteQuery();

	const scrollToAudioSection = () => {
		const element = document.getElementById('audioBook');
		if (element) {
			window.scrollTo({
				top: element.offsetTop,
				behavior: 'smooth'
			});
		}
	};

	const scrollToESection = () => {
		const element = document.getElementById('eBook');
		if (element) {
			window.scrollTo({
				top: element.offsetTop,
				behavior: 'smooth'
			});
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
		setSearchTerm('');
	};

	const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value;
		setSearchTerm(value);
		setShowResults(!!value);
		refetch();
	};

	useEffect(() => {
		if (isUser) {
			localStorage.setItem('stateIsUser', 'true');
		} else {
			localStorage.setItem('stateIsUser', 'false');
		}
	}, [isUser]);

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (
				searchResultsRef.current &&
				!searchResultsRef.current.contains(event.target as Node)
			) {
				setShowResults(false);
			}
		};

		document.addEventListener('mousedown', handleClickOutside);
		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, []);

	const handleExitClient = () => {
		localStorage.removeItem('token');
		localStorage.setItem('client', 'false');
		localStorage.setItem('vendor', 'false');
		localStorage.setItem('admin', 'false');
		localStorage.removeItem('NameClient');
		localStorage.removeItem('EBOOK');
		navigate('/auth/login');
	};

	const hadnleBecomeVendor = () => {
		if (localAuth === 'true') {
			localStorage.removeItem('token');
			localStorage.setItem('client', 'false');
			localStorage.setItem('vendor', 'false');
			localStorage.setItem('admin', 'false');
			localStorage.removeItem('NameClient');
			localStorage.removeItem('EBOOK');
			navigate('/auth/vendor/registration');
		} else {
			navigate('/auth/vendor/registration');
		}
	};

	return (
		<>
			<header id="headerClient" className={scss.Header}>
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
											placeholder="Искать жанр, книги, авторов, издательства..."
										/>
									</div>
									<div className={scss.lii}>
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
													{localAuth === 'true' ? (
														<>{countOfFavorite !== 0 ? <IconRedDot /> : null}</>
													) : null}
												</span>
											</>
										)}
									</div>
									<div
										className={scss.basket}
										onClick={() => navigate('/basket')}
									>
										{localAuth === 'true' ? (
											<>
												{countBasket?.totalNumberOfBooks !== 0 ? (
													<>
														<p>Корзина ({countBasket?.totalNumberOfBooks})</p>
													</>
												) : (
													<>
														<p>Корзина</p>
													</>
												)}
											</>
										) : (
											<p>Корзина</p>
										)}
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
														if (location.pathname !== '/') {
															navigate('/');
															setTimeout(() => {
																scrollToESection();
															}, 300);
														}
														scrollToESection();
													}}
												>
													Электронные книги
												</li>
												<li
													onClick={() => {
														if (location.pathname !== '/') {
															navigate('/');
															setTimeout(() => {
																scrollToAudioSection();
															}, 300);
														}
														scrollToAudioSection();
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
														setVendorModal(true);
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
													if (location.pathname !== '/') {
														navigate('/');

														setTimeout(() => {
															scrollToESection();
														}, 300);
													}
													scrollToESection();
												}}
											>
												Электронные книги
											</li>
											<li
												onClick={() => {
													if (location.pathname !== '/') {
														navigate('/');
														setTimeout(() => {
															scrollToAudioSection();
														}, 300);
													}
													scrollToESection();
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
													setVendorModal(true);
												}}
											>
												Начать продавать на eBook
											</li>
										</ul>
									</div>
								</div>
								<div className={scss.right_nav_content}>
									{localAuth === 'true' ? (
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
														setIsUser(false);
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
													handleExitClient();
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
						<Modal
							footer={false}
							open={vendorModal}
							onCancel={() => {
								setVendorModal(false);
							}}
						>
							<div className={scss.modal_vendor}>
								<div className={scss.info_modal}>
									<p>Что бы стать продавцом придется выйти c аккаунта</p>
								</div>
								<div className={scss.buttons}>
									<button onClick={() => setVendorModal(false)}>
										отменить
									</button>
									<button
										onClick={() => {
											hadnleBecomeVendor();
										}}
									>
										Выйти
									</button>
								</div>
							</div>
						</Modal>
					</div>
				</div>
			</header>
		</>
	);
};

export default Header;
