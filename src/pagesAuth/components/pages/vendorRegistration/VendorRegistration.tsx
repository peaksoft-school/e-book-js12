import { Link, useNavigate } from 'react-router-dom';
import scss from './Registration.module.scss';
import { useState } from 'react';
import EyeSeeIcon from '@/src/assets/icons/icon-eyeSee';
import EyeClose from '@/src/assets/icons/icon-eyeClose';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { PhoneInput } from 'react-international-phone';
import 'react-international-phone/style.css';
import {
	useConfirmEmailMutation,
	usePostVendorRegistrationMutation
} from '@/src/redux/api/auth';
import { Modal, message } from 'antd';

interface TypeData {
	firstName: string;
	lastName: string;
	phoneNumber: string;
	email: string;
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
			phoneNumber: string;
		};
	};
}

const VendorRegistration = () => {
	const [isPassword, setIsPassword] = useState(false);
	const navigate = useNavigate();
	const [isLogPassword, setLogPassword] = useState(false);
	const [password, setPassword] = useState('');
	const [postVendor] = usePostVendorRegistrationMutation();
	const [modalConfirm, setModalConfirm] = useState(false);
	const [valueCode, setValueCode] = useState<string | number>('');
	const [email, setEmail] = useState('');
	const [confirmEmail, { error }] = useConfirmEmailMutation();
	const [messageApi, contextHolder] = message.useMessage();
	const {
		formState: { errors },
		control,
		register,
		reset,
		handleSubmit
	} = useForm<TypeData>();

	console.log(error);

	const onSubmit: SubmitHandler<TypeData> = async (data) => {
		if (data.confirmPassword === data.password) {
			const newData = {
				firstName: data.firstName,
				lastName: data.lastName,
				phoneNumber: data.phoneNumber,
				email: data.email,
				password: data.password
			};
			const results = (await postVendor(newData)) as RegistrationResponse;
			if ('data' in results) {
				setEmail(data.email);
				setModalConfirm(true);
				reset();
				setPassword('');
			} else if (results.error) {
				if (results.error.data.password) {
					const inputString = results.error.data.password;
					const outputString = inputString.replace(/{/g, '').replace(/}/g, '');
					messageApi.open({
						type: 'warning',
						content: outputString
					});
				} else if (results.error.data.email) {
					const inputString = results.error.data.email;
					const outputString = inputString.replace(/{/g, '').replace(/}/g, '');
					messageApi.open({
						type: 'warning',
						content: outputString
					});
				} else if (results.error.data.phoneNumber) {
					const inputString = results.error.data.phoneNumber;
					const outputString = inputString.replace(/{/g, '').replace(/}/g, '');
					messageApi.open({
						type: 'warning',
						content: outputString
					});
				}
			}
		}
	};

	const handleConfirmEmail = async () => {
		if (valueCode !== '') {
			const newData = {
				email: email,
				code: valueCode
			};
			const response = await confirmEmail(newData);

			if ('data' in response) {
				const token = response.data?.data?.token;
				localStorage.setItem('token', token!);
				localStorage.setItem('client', 'false');
				localStorage.setItem('vendor', 'true');
				localStorage.setItem('admin', 'false');
				navigate('/vendor/home');
				console.log(response.data.data);

				localStorage.setItem(
					'EBOOK',
					JSON.stringify({
						email: email,
						firstName: response.data.data?.firstName,
						id: 4,
						role: 'VENDOR',
						token: response.data.data?.token
					})
				);
				setValueCode('');
			}
			if (error) {
				const responseError = error as AUTHORIZATION.ConfirmEmailError;
				if (error) {
					const inputString = responseError.data?.message;
					const outputString = inputString?.replace(/{/g, '').replace(/}/g, '');
					messageApi.open({
						type: 'warning',
						content: outputString
					});
				} else if (responseError.status === 500) {
					messageApi.open({
						type: 'warning',
						content: 'Ошибка сервера'
					});
				}
				if (valueCode.toString().length <= 3) {
					messageApi.open({
						type: 'warning',
						content: 'Код должен содержать 4 цифр'
					});
				}
			}
		}
	};

	return (
		<div onSubmit={handleSubmit(onSubmit)} className={scss.Registration}>
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
									Ваше имя
									<span>*</span>
								</p>
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
								<p>
									Ваша фамилия
									<span>*</span>
								</p>
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
								<p>
									Номер вашего телефона
									<span>*</span>
								</p>
							</div>
							<Controller
								name="phoneNumber"
								control={control}
								defaultValue="+996"
								rules={{ required: true, minLength: 5 }}
								render={({ field }) => (
									<PhoneInput
										className={errors.phoneNumber ? scss.input_error : ''}
										defaultCountry={'kg'}
										{...register('phoneNumber', { required: true })}
										{...field}
									/>
								)}
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
									required: true,
									minLength: 9,
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
						<div className={scss.btn_container}>
							<button type="submit">Создать аккаунт</button>
						</div>
					</form>
					<Modal
						open={modalConfirm}
						onCancel={() => setModalConfirm(false)}
						footer={false}
					>
						<div className={scss.confirm_email}>
							{contextHolder}
							<div className={scss.title}>
								<p>Пожалуйста, введите код, который вы получили на почту</p>
							</div>
							<div className={scss.code_confirm}>
								<input
									type="text"
									onKeyPress={(e) => {
										if (e.key === 'Enter') {
											handleConfirmEmail();
										}
									}}
									value={valueCode}
									onChange={(e) => {
										setValueCode(e.target.value);
									}}
									placeholder="Введите код"
									maxLength={4}
								/>
							</div>
							<div className={scss.btn}>
								<button
									onClick={() => {
										handleConfirmEmail();
									}}
								>
									Отправить
								</button>
							</div>
						</div>
					</Modal>
				</div>
			</div>
		</div>
	);
};

export default VendorRegistration;
