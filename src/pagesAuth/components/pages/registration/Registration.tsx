/* eslint-disable @typescript-eslint/no-explicit-any */
import { Link, useNavigate } from 'react-router-dom';
import scss from './Registration.module.scss';
import { useState } from 'react';
import EyeSeeIcon from '@/src/assets/icons/icon-eyeSee';
import EyeClose from '@/src/assets/icons/icon-eyeClose';
import { SubmitHandler, useForm } from 'react-hook-form';
import { usePostRegistrationMutation } from '@/src/redux/api/me';

interface TypeData {
	email: string;
	name: string;
	password: string | number;
}

const Registration = () => {
	const [isPassword, setIsPassword] = useState(false);
	const [isLogPassword, setLogPassword] = useState(false);
	const [checkPassword, setCheckPassword] = useState('');
	const [postUser] = usePostRegistrationMutation();
	const navigate = useNavigate();

	const {
		formState: { errors },
		// control, ! Это нам понадобится
		register,
		reset,
		handleSubmit
	} = useForm<TypeData>({
		defaultValues: { email: '', name: '', password: '' }
	});

	const onHandleChange: SubmitHandler<TypeData> = async (data) => {
		if (checkPassword === data.password) {
			await postUser(data);
			reset();
			setCheckPassword('');
			navigate('/auth/login');
		} else {
			alert('confirm password ');
		}
	};

	return (
		<div onSubmit={handleSubmit(onHandleChange)} className={scss.Registration}>
			<div className="container">
				<div className={scss.content}>
					<div className={scss.headline}>
						<Link to="/auth/login">Войти</Link>
						<Link to="/auth/registration">Регистрация</Link>
					</div>
					<form className={scss.form_container}>
						<label>
							<div className={scss.label}>
								Ваше имя<span>*</span>
							</div>
							<input
								className={
									errors.name ? `${scss.input_error}` : `${scss.input}`
								}
								{...register('name', { minLength: 4, required: true })}
								type="text"
								placeholder="Напишите ваше имя"
							/>
						</label>
						<label>
							<div className={scss.label}>
								Email<span>*</span>
							</div>
							<input
								className={
									errors.email ? `${scss.input_error}` : `${scss.input}`
								}
								type="text"
								placeholder="Напишите ваш email"
								{...register('email', { minLength: 4, required: true })}
							/>
						</label>
						<label>
							<div className={scss.label}>
								Пароль<span>*</span>
							</div>
							<input
								className={
									errors.password ? `${scss.input_error}` : `${scss.input}`
								}
								type={isPassword ? 'text' : 'password'}
								placeholder="Напишите пароль"
								{...register('password', { minLength: 4, required: true })}
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
						</label>
						<label>
							<div className={scss.label}>
								Подтвердите пароль<span>*</span>
							</div>
							<input
								className={
									errors.password ? `${scss.input_error}` : `${scss.input}`
								}
								type={isLogPassword ? 'text' : 'password'}
								placeholder="Подтвердите пароль"
								value={checkPassword}
								onChange={(e) => setCheckPassword(e.target.value)}
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
						</label>
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
