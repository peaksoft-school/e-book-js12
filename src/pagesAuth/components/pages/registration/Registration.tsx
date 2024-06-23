import { Link, useNavigate } from 'react-router-dom';
import scss from './Registration.module.scss';
import { useState } from 'react';
import EyeSeeIcon from '@/src/assets/icons/icon-eyeSee';
import EyeClose from '@/src/assets/icons/icon-eyeClose';
import { SubmitHandler, useForm } from 'react-hook-form';
import {
	useConfirmEmailMutation,
	usePostRegistrationMutation,
	usePostWithGoogleMutation
} from '@/src/redux/api/me';
import { signInWithPopup } from 'firebase/auth';
import { auth, provider } from '@/src/configs/firebase';
import { IconGoogleLogo } from '@/src/assets/icons';
import { ToastContainer, toast } from 'react-toastify';
import { Modal, message } from 'antd';

interface TypeData {
	email: string;
	name: string;
	password: string;
	confirmPassword: string;
}
interface RegistrationResponse {
	data?: {
		data: {
			httpStatus: string;
			message: string;
		};
	};
	error: {
		data: {
			password: string;
			email: string;
		};
	};
}

const Registration = () => {
	const [isPassword, setIsPassword] = useState(false);
	const [isLogPassword, setLogPassword] = useState(false);
	const [password, setPassword] = useState('');
	const [postUser, { isLoading }] = usePostRegistrationMutation();
	const [postGoogleToken] = usePostWithGoogleMutation();
	const [email, setEmail] = useState('');
	const [code, setCode] = useState<number | string>('');
	const [confirmCode, {error: errorEmail}] = useConfirmEmailMutation();
	const [confirmModal, setConfirmModa] = useState(false);
	const [messageApi, contextHolder] = message.useMessage();
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
		if (!isLoading) {
			if (data.confirmPassword === data.password) {
				const newData = {
					firstName: data.name,
					email: data.email,
					password: data.password
				};
				const results = (await postUser(newData)) as RegistrationResponse;
				if ('data' in results) {
					if (results.data?.data.httpStatus === 'OK') {
						setEmail(data.email);
						setConfirmModa(true);
					} else if (results.data?.data.httpStatus === 'ALREADY_REPORTED') {
						messageApi.open({
							type: 'warning',
							content:
								'Электронная почта: ibrahimorunbaev59@gmail.com уже существует!'
						});
					}
				} else if ('data' in results.error && results.error.data) {
					console.log(results.error.data);

					if (results.error.data.password) {
						const inputString = results.error.data.password;
						const outputString = inputString
							.replace(/{/g, '')
							.replace(/}/g, '');
						messageApi.open({
							type: 'warning',
							content: outputString
						});
					} else if (results.error.data.email) {
						const inputString = results.error.data.email;
						const outputString = inputString
							.replace(/{/g, '')
							.replace(/}/g, '');
						messageApi.open({
							type: 'warning',
							content: outputString
						});
					}
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
		}
	};

	const handleConfirmCode = async () => {
		const newData = {
			email: email,
			code: code!
		};
		const result = await confirmCode(newData);
		if ('data' in result) {
			const { token } = result.data.data;
			const { firstName } = result.data.data;
			localStorage.setItem('NameClient', firstName);
			localStorage.setItem('token', token!);
			localStorage.setItem('client', 'true');
			localStorage.setItem('vendor', 'false');
			localStorage.setItem('admin', 'false');
			reset();
			navigate('/');
			setCode('');
		}else if(errorEmail){
			const confirmEmailError = errorEmail as AUTHORIZATION.ConfirmEmailError
			if(confirmEmailError){
				const inputString = confirmEmailError.data.message;
				const outputString = inputString?.replace(/{/g, '').replace(/}/g, '');
				messageApi.open({
					type: 'warning',
					content: outputString
				});
			}
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
					{contextHolder}
					<div className={scss.headline}>
						<Link to="/auth/login">Войти</Link>
						<Link to="/auth/registration">Регистрация</Link>
					</div>
					<form className={scss.form_container}>
						<label>
							<div className={scss.label}>
								<p>
									Ваше имя<span>*</span>
								</p>
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
								<p>
									Email<span>*</span>
								</p>
							</div>
							<input
								className={
									errors.email ? `${scss.input_error}` : `${scss.input}`
								}
								type="email"
								placeholder="Напишите ваш email"
								{...register('email', { minLength: 4, required: true })}
							/>
						</label>
						<label>
							<div className={scss.label}>
								<p>
									Пароль<span>*</span>
								</p>
							</div>
							<input
								className={
									errors.password ? `${scss.input_error}` : `${scss.input}`
								}
								type={isPassword ? 'text' : 'password'}
								placeholder="Напишите пароль"
								{...register('password', {
									minLength: 9,
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
								<p>
									Подтвердите пароль<span>*</span>
								</p>
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
									minLength: 9,
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
			<Modal
				open={confirmModal}
				onCancel={() => setConfirmModa(false)}
				footer={false}
			>
				<div className={scss.confirm_email}>
					<div className={scss.title}>
						<p>Пожалуйста, введите код, который вы получили на почту</p>
					</div>
					<div className={scss.code_confirm}>
						<input
							type="text"
							onKeyPress={(e) => {
								if (e.key === 'Enter') {
									handleConfirmCode();
								}
							}}
							value={code}
							onChange={(e) => {
								setCode(e.target.value);
							}}
							placeholder="Введите код"
							maxLength={4}
						/>
					</div>
					<div className={scss.btn}>
						<button
							onClick={() => {
								handleConfirmCode();
							}}
						>
							Отправить
						</button>
					</div>
				</div>
			</Modal>
		</div>
	);
};

export default Registration;
