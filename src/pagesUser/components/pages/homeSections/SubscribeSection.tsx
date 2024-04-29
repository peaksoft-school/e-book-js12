import scss from './SubscribePage.module.scss';

const SubscribeSection = () => {
	return (
		<section className={scss.SubscribePage}>
			<div className="container">
				<div className={scss.content}>
					<div className={scss.title}>
						<h2>Подписаться на рассылку</h2>
					</div>
					<div className={scss.input_button}>
						<input type="email" placeholder="Напишите ваш E-mail" />
						<button className={scss.send_button}>Отправить</button>
					</div>
					<div className={scss.social_media}>
						<a href="https://www.instagram.com/">Instagram</a>
						<a href="https://www.facebook.com/?locale=ru_RU">Facebook</a>
						<a href="https://vk.com/">Bконтакте</a>
					</div>
				</div>
			</div>
		</section>
	);
};

export default SubscribeSection;
