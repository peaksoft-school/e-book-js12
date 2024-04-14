/* eslint-disable @typescript-eslint/no-explicit-any */
import EyeSeeIcon from '@/src/assets/icons/icon-eyeSee';
import scss from './Registration.module.scss';
import EyeClose from '@/src/assets/icons/icon-eyeClose';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
const Registration = () => {
	const [isPassword, setIsPassword] = useState(false);
	const [isLogPassword, setLogPassword] = useState(false);

	const {
		formState: { errors },
		// control, ! Это нам понадобится
		register,
		// reset,  ! Это нам понадобится
		handleSubmit
	} = useForm();

	const onSubmit = (data: any) => {
		console.log(data);
	};
	return (
		<div onSubmit={handleSubmit(onSubmit)} className={scss.Registration}>
			<div className="container">
				<div className={scss.content}>
					<div className={scss.headline}>
						<Link to="/vendor/login">Войти</Link>
						<Link to="/vendor/registration">Регистрация</Link>
					</div>
					<form className={scss.form_container}>
						<div className={scss.input_container}>
							<label htmlFor="name">
								<div className={scss.label}>
									Ваше имя<span>*</span>
								</div>
							</label>
							<input
								id="name"
								className={
									errors.name ? `${scss.input_error}` : `${scss.input}`
								}
								{...register('vendorname', { minLength: 4, required: true })}
								type="text"
								placeholder="Напишите ваше имя"
							/>
						</div>
						<div className={scss.input_container}>
							<label htmlFor="email">
								<div className={scss.label}>
									Email<span>*</span>
								</div>
							</label>
							<input
								id="email"
								className={
									errors.email ? `${scss.input_error}` : `${scss.input}`
								}
								type="text"
								placeholder="Напишите ваш email"
								{...register('vendoremail', { minLength: 4, required: true })}
							/>
						</div>
						<div className={scss.input_container}>
							<label htmlFor="password">
								<div className={scss.label}>
									Пароль<span>*</span>
								</div>
							</label>
							<input
								id="password"
								className={
									errors.password ? `${scss.input_error}` : `${scss.input}`
								}
								type={isPassword ? 'text' : 'password'}
								placeholder="Напишите пароль"
								{...register('vendorpassword', {
									minLength: 4,
									required: true
								})}
							/>
							{isPassword ? (
								<div
									onClick={() => {
										setIsPassword(false);
									}}
									className={scss.icon_password}
								>
									<EyeSeeIcon />
								</div>
							) : (
								<div
									onClick={() => {
										setIsPassword(true);
									}}
									className={scss.icon_password}
								>
									<EyeClose />
								</div>
							)}
						</div>
						<div className={scss.input_container}>
							<label htmlFor="confirmPassword">
								<div className={scss.label}>
									Подтвердите пароль<span>*</span>
								</div>
							</label>
							<input
								id="confirmPassword"
								className={
									errors.confirmPassword
										? `${scss.input_error}`
										: `${scss.input}`
								}
								type={isLogPassword ? 'text' : 'password'}
								placeholder="Подтвердите пароль"
								{...register('vendorconfirmPassword', {
									minLength: 4,
									required: true
								})}
							/>
							{isLogPassword ? (
								<div
									onClick={() => {
										setLogPassword(!isLogPassword);
									}}
									className={scss.icon_password}
								>
									<EyeSeeIcon />
								</div>
							) : (
								<div
									onClick={() => {
										setLogPassword(!isLogPassword);
									}}
									className={scss.icon_password}
								>
									<EyeClose />
								</div>
							)}
						</div>
						<div className={scss.follow_checkbox}>
							<label>
								<div className={scss.checkbox_content}>
									<input type="checkbox" />
									<p>
										Подпишитесь на рассылку, чтобы получать новости от eBook{' '}
									</p>
								</div>
							</label>
						</div>
						<div className={scss.btn_container}>
							<button type="submit">Создать аккаунт</button>
							<button>Стать продавцом на eBook</button>
						</div>
					</form>
				</div>
			</div>
		</div>
	);
};

export default Registration;
