import scss from './SubscribePage.module.scss';

const SubscribePage = () => {
	return (
		<div className={scss.SubscribePage}>
			<div className="container">
				<div className={scss.content}>
					<div className={scss.title}>
						<h2>Подписаться на рассылку</h2>
					</div>
					<div className={scss.inputButton}>
						<input type="email" placeholder="Напишите ваш E-mail" />
						<button className={scss.sendButton}>Отправить</button>
					</div>
					<div className={scss.socialMedia}>
						<a href="https://www.instagram.com/">Instagram</a>
						<a href="https://www.facebook.com/?locale=ru_RU">Facebook</a>
						<a href="https://vk.com/">Bконтакте</a>
					</div>
				</div>
			</div>
		</div>
	);
};

export default SubscribePage;
