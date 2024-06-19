import { Link, useNavigate } from 'react-router-dom';
import scss from './Registration.module.scss';
import { useState } from 'react';
import EyeSeeIcon from '@/src/assets/icons/icon-eyeSee';
import EyeClose from '@/src/assets/icons/icon-eyeClose';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { PhoneInput } from 'react-international-phone';
import 'react-international-phone/style.css';
import { usePostVendorRegistrationMutation } from '@/src/redux/api/me';
import { ToastContainer, toast } from 'react-toastify';

interface TypeData {
	firstName: string;
	lastName: string;
	phoneNumber: string;
	email: string;
	password: string;
	confirmPassword: string;
}

const VendorRegistration = () => {
	const [isPassword, setIsPassword] = useState(false);
	const navigate = useNavigate();
	const [isLogPassword, setLogPassword] = useState(false);
	const [password, setPassword] = useState('');
	const [postVendor] = usePostVendorRegistrationMutation();

	const {
		formState: { errors },
		control,
		register,
		reset,
		handleSubmit
	} = useForm<TypeData>();

	const onSubmit: SubmitHandler<TypeData> = async (data) => {
		if (data.confirmPassword === data.password) {
			const newData = {
				firstName: data.firstName,
				lastName: data.lastName,
				phoneNumber: data.phoneNumber,
				email: data.email,
				password: data.password
			};
			const results = await postVendor(newData);
			if ('data' in results) {
				const { token } = results.data;
				localStorage.setItem('token', token);
				localStorage.setItem('isAuth', 'false');
				localStorage.setItem('isVendor', 'true');
				localStorage.setItem('isAdmin', 'false');
				reset();
				navigate('/vendor/home');
				setPassword('');
			}
		} else {
			toast(`Подтвердите пароль`, {
				position: 'top-right',
				autoClose: 5000,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
				progress: undefined,
				theme: 'light'
			});
		}
	};

	return (
		<div onSubmit={handleSubmit(onSubmit)} className={scss.Registration}>
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
									errors.firstName ? `${scss.input_error}` : `${scss.input}`
								}
								{...register('firstName', { minLength: 4, required: true })}
								type="text"
								placeholder="Напишите ваше имя"
							/>
						</label>
						<label>
							<div className={scss.label}>
								Ваша фамилия<span>*</span>
							</div>
							<input
								className={
									errors.lastName ? `${scss.input_error}` : `${scss.input}`
								}
								{...register('lastName', { minLength: 4, required: true })}
								type="text"
								placeholder="Напишите вашу фамилию"
							/>
						</label>
						<label>
							<div className={scss.label}>
								Номер вашего телефона<span>*</span>
							</div>
							<Controller
								name="phoneNumber"
								control={control}
								defaultValue=""
								rules={{ required: true }}
								render={({ field }) => (
									<PhoneInput defaultCountry={'kg'} {...field} />
								)}
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
								{...register('password', {
									minLength: 4,
									required: true,
									onChange: (event) => {
										setPassword(event.target.value);
									}
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
						</label>
						<label>
							<div className={scss.label}>
								Подтвердите пароль<span>*</span>
							</div>
							<input
								className={
									errors.confirmPassword
										? `${scss.input_error}`
										: `${scss.input}`
								}
								type={isLogPassword ? 'text' : 'password'}
								placeholder="Подтвердите пароль"
								{...register('confirmPassword', {
									required: true,
									minLength: 4,
									validate: (value) => {
										return value === password;
									}
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
						</label>
						<ToastContainer />
						<div className={scss.btn_container}>
							<button type="submit">Создать аккаунт</button>
						</div>
					</form>
				</div>
			</div>
		</div>
	);
};

export default VendorRegistration;
