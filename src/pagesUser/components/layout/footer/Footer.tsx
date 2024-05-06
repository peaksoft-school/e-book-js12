import { FC } from 'react';
import scss from './Footer.module.scss';

const Footer: FC = () => {
	return (
		<>
			<footer className={scss.Footer}>
				<div className="container">
					<div className={scss.content}>
						<h1 className={scss.logoEbook}>eBook</h1>
						<div className={scss.footerBoxDiv}>
							<a href="#">Жанры</a>
							<a href="#">Аудиокниги</a>
							<a href="#">Электронные книги</a>
						</div>
						<div className={scss.footerBoxDiv}>
							<a href="#">Бестселлеры</a>
							<a href="#">Промокоды</a>
							<a href="#">Политика конфиденциальности</a>
						</div>
						<div className={scss.footerBoxDivNavi}>
							<h3>Свяжитесь с нами</h3>
							<a href="https://wa.me/996551252512">+996 551 25 25 12</a>
							<a href="https://maps.app.goo.gl/eWcmoKct934Gj6eg7">
								119 ул. Гражданская, Бишкек
							</a>
						</div>
					</div>
				</div>
			</footer>
		</>
	);
};

export default Footer;
