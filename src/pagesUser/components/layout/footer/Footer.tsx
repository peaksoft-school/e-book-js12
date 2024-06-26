import { FC } from 'react';
import scss from './Footer.module.scss';
import { useLocation, useNavigate } from 'react-router-dom';
import LogoeBook from '@/src/ui/logoeBook/LogoeBook';

const Footer: FC = () => {
	const navigate = useNavigate();
	const location = useLocation();
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
	const scrollToBestsellersSection = () => {
		const element = document.getElementById('bestsellers');
		if (element) {
			window.scrollTo({
				top: element.offsetTop,
				behavior: 'smooth'
			});
		}
	};
	const scrollToHeaderSection = () => {
		const element = document.getElementById('headerClient');
		if (element) {
			window.scrollTo({
				top: element.offsetTop,
				behavior: 'smooth'
			});
		}
	};
	return (
		<>
			<footer className={scss.Footer}>
				<div className="container">
					<div className={scss.content}>
						{/* <h1 className={scss.logoEbook}>eBooK</h1> */}
						<LogoeBook
							navigateToHome={() => {
								if (location.pathname === '/') {
									scrollToHeaderSection();
								} else {
									navigate('/');
									setTimeout(() => {
										scrollToHeaderSection();
									}, 300);
								}
							}}
						/>
						<div className={scss.footerBoxDiv}>
							<p
								onClick={() => {
									navigate('/search_book');
								}}
							>
								Жанры
							</p>
							<p
								onClick={() => {
									if (location.pathname !== '/') {
										navigate('/');
										setTimeout(() => {
											scrollToAudioSection();
										}, 300);
									} else {
										scrollToAudioSection();
									}
								}}
							>
								Аудиокниги
							</p>
							<p
								onClick={() => {
									if (location.pathname !== '/') {
										navigate('/');
										setTimeout(() => {
											scrollToESection();
										}, 300);
									} else {
										scrollToESection();
									}
								}}
							>
								Электронные книги
							</p>
						</div>
						<div className={scss.footerBoxDiv}>
							<p
								onClick={() => {
									if (location.pathname !== '/') {
										navigate('/');
										setTimeout(() => {
											scrollToBestsellersSection();
										}, 300);
									} else {
										scrollToBestsellersSection();
									}
								}}
							>
								Бестселлеры
							</p>
							<p
								onClick={() => {
									navigate('/promo_page');
								}}
							>
								Промокоды
							</p>
							<p
								onClick={() => {
									navigate('/vendor');
								}}
							>
								Политика конфиденциальности
							</p>
						</div>
						<div className={scss.footerBoxDivNavi}>
							<h3>Свяжитесь с нами</h3>
							<a href="https://wa.me/996551252512">+996 551 252 512</a>
							<a href="https://maps.app.goo.gl/eWcmoKct934Gj6eg7">
								г. Бишкек ул. Гражданская 119
							</a>
						</div>
					</div>
				</div>
			</footer>
		</>
	);
};

export default Footer;
