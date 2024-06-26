import React, { useState } from 'react';
import scss from './SubscribePage.module.scss';
import { useSubscribeMutation } from '@/src/redux/api/subscribeApi';
import { Bounce, ToastContainer, toast } from 'react-toastify';

const SubscribeSection: React.FC = () => {
	const [clientEmail, setClientEmail] = useState('');
	const [subscribe] = useSubscribeMutation();

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		const response = (await subscribe({
			clientEmail
		})) as SUBSCRIBE.SubscribeResponse;
		console.log(response);
		if ('data' in response) {
			toast(response.data?.message, {
				position: 'top-right',
				autoClose: 5000,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: false,
				draggable: true,
				progress: undefined,
				theme: 'light',
				transition: Bounce
			});
			setClientEmail('');
		}
		if (response.error) {
			toast(response.error.data.message, {
				position: 'top-right',
				autoClose: 5000,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: false,
				draggable: true,
				progress: undefined,
				theme: 'light',
				transition: Bounce
			});
		}
	};

	return (
		<section className={scss.SubscribePageSection}>
			<div className="container">
				<div className={scss.content}>
					<ToastContainer />
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
