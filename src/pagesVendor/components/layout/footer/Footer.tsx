import { FC } from 'react';
import scss from './Footer.module.scss';

const Footer: FC = () => {
	return (
		<>
			<footer className={scss.Footer}>
				<div className="container">
					<div className={scss.content}>
						<div className={scss.footerBox}>
							<div className={scss.firstContent}>
								<div className={scss.logoeBook}>eBook</div>
								<a href="#">Политика конфиденциальности</a>
							</div>
						</div>
						<div className={scss.footerBox}>
							<h3>Свяжитесь с нами</h3>
							<a href="#">+996 551 252 512</a>
							<a href="#">г. Бишкек ул. Гражданская 119</a>
						</div>
					</div>
				</div>
			</footer>
		</>
	);
};

export default Footer;
