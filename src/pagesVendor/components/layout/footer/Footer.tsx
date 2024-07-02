import { FC } from 'react';
import scss from './Footer.module.scss';
import { useNavigate } from 'react-router-dom';

const Footer: FC = () => {
	const navigate = useNavigate();

	const scrollToHeaderSection = () => {
		const element = document.getElementById('headerVendor');
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
						<div className={scss.footerBox}>
							<div className={scss.firstContent}>
								<div
									className={scss.logoeBook}
									onClick={() => {
										if (localStorage.getItem('vendor') === 'true') {
											navigate('/vendor/home');
											setTimeout(() => {
												scrollToHeaderSection();
											}, 300);
										} else {
											navigate('/vendor');
										}
									}}
								>
									eBook
								</div>
								<a
									onClick={() => {
										navigate('/vendor');
									}}
								>
									Политика конфиденциальности
								</a>
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
