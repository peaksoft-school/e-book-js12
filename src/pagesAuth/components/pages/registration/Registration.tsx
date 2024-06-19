import { Link, useNavigate } from 'react-router-dom';
import scss from './Registration.module.scss';
import { useState } from 'react';
import EyeSeeIcon from '@/src/assets/icons/icon-eyeSee';
import EyeClose from '@/src/assets/icons/icon-eyeClose';
import { SubmitHandler, useForm } from 'react-hook-form';
import {
	usePostRegistrationMutation,
	usePostWithGoogleMutation
} from '@/src/redux/api/me';
import { signInWithPopup } from 'firebase/auth';
import { auth, provider } from '@/src/configs/firebase';
import { IconGoogleLogo } from '@/src/assets/icons';
import { ToastContainer, toast } from 'react-toastify';

interface TypeData {
	email: string;
	name: string;
	password: string;
	confirmPassword: string;
}

const Registration = () => {
	const [isPassword, setIsPassword] = useState(false);
	const [isLogPassword, setLogPassword] = useState(false);
	const [password, setPassword] = useState('');
	const [postUser] = usePostRegistrationMutation();
	const [postGoogleToken] = usePostWithGoogleMutation();
	const navigate = useNavigate();

	const {
		formState: { errors },
		// control, ! Это нам понадобится
		register,
		reset,
		handleSubmit
	} = useForm<TypeData>({
		defaultValues: { email: '', name: '', password: '', confirmPassword: '' }
	});

	const onHandleChange: SubmitHandler<TypeData> = async (data) => {
		if (data.confirmPassword === data.password) {
			const newData = {
				firstName: data.name,
				email: data.email,
				password: data.password
			};
			const results = await postUser(newData);
			if ('data' in results) {
				const { token } = results.data;
				const { firstName } = results.data;
				localStorage.setItem('NameClient', firstName);
				localStorage.setItem('token', token);
				localStorage.setItem('isAuth', 'true');
				localStorage.setItem('vendor', 'false');
				localStorage.setItem('admin', 'false');
				console.log(firstName);

				reset();
				navigate('/');
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
	const signInWithGoogleHandler = async () => {
		const result = await signInWithPopup(auth, provider);
		const user = result.user;
		const idToken = await user.getIdToken();
		const data = {
			idToken: idToken
		};
		const results = await postGoogleToken(data);
		if ('data' in results) {
			const { token } = results.data;
			const { displayName } = result.user;
			localStorage.setItem('NameClient', displayName!);
			localStorage.setItem('token', token);
			localStorage.setItem('isAuth', 'true');
			localStorage.setItem('vendor', 'false');
			localStorage.setItem('admin', 'false');
			navigate('/');
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
								{...register('password', {
									minLength: 4,
									required: true,
									onChange(event) {
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
									minLength: 4,
									required: true,

									validate: (value) => {
										return value === password || 'Пароль не совпадает';
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
						<div className={scss.btn_container}>
							<button type="submit">Создать аккаунт</button>
						</div>
					</form>
					<ToastContainer />
					<div className={scss.btn_with_google}>
						<button onClick={signInWithGoogleHandler}>
							<div className={scss.content_btn}>
								<IconGoogleLogo />
								<p>Sign up with Google</p>
							</div>
						</button>
					</div>
					<div className={scss.vendor_btn}>
						<button
							onClick={() => {
								navigate('/auth/vendor/registration');
							}}
						>
							Стать продавцом на eBook
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Registration;
