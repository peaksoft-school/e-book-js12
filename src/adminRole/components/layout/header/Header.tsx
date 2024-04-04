import scss from './Header.module.scss';
import { useEffect, useState } from 'react';

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
							<h3>Header</h3>
						</div>
					</div>
				</div>
			</header>
		</>
	);
};

export default Header;
