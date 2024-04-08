import CustomGenreInput from '@/src/ui/customInpute/CustomGenreInput';
import scss from './Header.module.scss';
import { useEffect, useState } from 'react';
import WhiteLikeIcon from '@/src/assets/icons/icon-whiteLike';
import { IconRedDot } from '@/src/assets/icons';

const Header = () => {
	const [headerScroll, setHeaderScroll] = useState<boolean>(false);

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
								<div className={scss.logo_Content}></div>
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
								<div className={scss.left_nav_Content}></div>
								<div className={scss.center_nav_Content}></div>
								<div className={scss.right_nav_Content}></div>
							</nav>
						</div>
					</div>
				</div>
			</header>
		</>
	);
};

export default Header;
