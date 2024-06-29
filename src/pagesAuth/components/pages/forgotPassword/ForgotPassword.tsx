/* eslint-disable react-hooks/exhaustive-deps */
// import { useSendEmailForgotPasswordQuery } from '@/src/redux/api/me';
import scss from './ForgotPassword.module.scss';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
// import { useEffect, useState } from 'react';

interface TypeFormData {
	email: string;
}
const ForgotPassword = () => {
	const {
		register,
		formState: { errors },
		handleSubmit
	} = useForm<TypeFormData>();
	// const [emailValue, setEmailValue] = useState('');

	// const { data, isSuccess } = useSendEmailForgotPasswordQuery(emailValue);

	const onSubmit = async (data: TypeFormData) => {
		if (data.email !== '') {
			// setEmailValue(data.email);
		}
	};

	// useEffect(() => {
	// 	if (emailValue !== '') {
	// 		console.log(data);
	// 		if (isSuccess) {
	// 			reset();
	// 		}
	// 	}
	// }, [emailValue]);

	return (
		<div className={scss.ForgotPassword}>
			<div className="container">
				<div className={scss.content}>
					<div className={scss.headline}>
						<Link to="/auth/login">Войти</Link>
						<Link to="/auth/registration">Регистрация</Link>
					</div>
					<form onSubmit={handleSubmit(onSubmit)}>
						<label>
							<p>Введите элктронную почту</p>
							<input
								className={errors.email ? scss.error_innput : ''}
								required={true}
								type="email"
								placeholder="Введите Email"
								{...register('email', { required: true, minLength: 4 })}
							/>
						</label>
						<button type="submit">Отправить</button>
					</form>
				</div>
			</div>
		</div>
	);
};

export default ForgotPassword;
