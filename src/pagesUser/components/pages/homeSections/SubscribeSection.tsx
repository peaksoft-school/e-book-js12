import React, { useState } from 'react';
import scss from './SubscribePage.module.scss';
import { useSubscribeMutation } from '@/src/redux/api/subscribeApi';

const SubscribeSection: React.FC = () => {
	const [clientEmail, setClientEmail] = useState('');
	const [subscribe] = useSubscribeMutation();

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		try {
			await subscribe({ clientEmail }).unwrap();
			alert('Вы успешно подписались на рассылку!');
		} catch (err) {
			alert('Ошибка при подписке на рассылку');
		}
	};

	return (
		<section className={scss.SubscribePageSection}>
			<div className="container">
				<div className={scss.content}>
					<div className={scss.title}>
						<h2>Подписаться на рассылку</h2>
					</div>
					<form className={scss.input_button} onSubmit={handleSubmit}>
						<input
							type="email"
							placeholder="Напишите ваш E-mail"
							value={clientEmail}
							onChange={(e) => setClientEmail(e.target.value)}
							required
						/>
						<button type="submit" className={scss.send_button}>
							Отправить
						</button>
					</form>
					<div className={scss.social_media}>
						<a href="https://www.instagram.com/">Instagram</a>
						<a href="https://www.facebook.com/?locale=ru_RU">Facebook</a>
						<a href="https://vk.com/">Вконтакте</a>
					</div>
				</div>
			</div>
		</section>
	);
};

export default SubscribeSection;
