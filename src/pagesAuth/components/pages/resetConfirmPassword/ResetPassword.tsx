import { Link, useLocation } from 'react-router-dom';
import scss from './ResetPassowrd.module.scss';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useResetPasswordMutation } from '@/src/redux/api/auth';
import { useState } from 'react';
import { message } from 'antd';
import { IconEye, IconEyeClose } from '@/src/assets/icons';

interface TypeDataForm {
	password: string;
	confirmPassword: string;
}
const ResetPassword = () => {
	const { register, handleSubmit, reset } = useForm<TypeDataForm>();
	const [messageApi, contextMessage] = message.useMessage();
	const [typePassowrd, setTypePassword] = useState(false);
	const [typeConfirmPassword, setConfirmPassword] = useState(false);

	const location = useLocation();
	console.log(location);

	const [resetPassword] = useResetPasswordMutation();

	const onSubmit: SubmitHandler<TypeDataForm> = async (data) => {
		if (data.confirmPassword === data.password) {
			const newData = {
				token: '',
				password: data.password
			};
			const result = await resetPassword(newData);
			if ('data' in result) {
				if (result.data) {
					console.log(result.data);
					reset();
				}
			}
		} else {
			messageApi.open({
				type: 'warning',
				content: 'Пароли не совподают'
			});
		}
	};

	return (
		<section className={scss.ResetPassoword}>
			<div className="container">
				<div className={scss.content}>
					{contextMessage}
					<div className={scss.headline}>
						<Link to="/auth/login">Войти</Link>
						<Link to="/auth/registration">Регистрация</Link>
					</div>
					<form onSubmit={handleSubmit(onSubmit)}>
						<label>
							<p>Введите новый пароль</p>
							<div
								className={scss.type_password}
								onClick={() => {
									setTypePassword(!typePassowrd);
								}}
							>
								{typePassowrd ? <IconEye /> : <IconEyeClose />}
							</div>
							<input
								required={true}
								type={`${typePassowrd ? 'text' : 'password'}`}
								placeholder="Введите новый пароль"
								{...register('password', { required: true, minLength: 4 })}
							/>
						</label>
						<label>
							<p>Подтвердите новый пароль</p>
							<div
								className={scss.type_password}
								onClick={() => setConfirmPassword(!typeConfirmPassword)}
							>
								{typeConfirmPassword ? <IconEye /> : <IconEyeClose />}
							</div>
							<input
								required={true}
								type={`${typeConfirmPassword ? 'text' : 'password'}`}
								placeholder="Подтвердите новый пароль"
								{...register('confirmPassword', {
									required: true,
									minLength: 4
								})}
							/>
						</label>
						<button type="submit">Отправить</button>
					</form>
				</div>
			</div>
		</section>
	);
};

export default ResetPassword;
