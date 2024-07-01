/* eslint-disable react-hooks/exhaustive-deps */
import { useSendEmailForgotPasswordMutation } from '@/src/redux/api/auth';
import { message } from 'antd';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import scss from './ForgotPassword.module.scss';

interface TypeFormData {
	email: string;
}
const ForgotPassword = () => {
	const {
		register,
		formState: { errors },
		handleSubmit
	} = useForm<TypeFormData>();

	const [sendEmail] = useSendEmailForgotPasswordMutation();
	const [messageApi, contextMessage] = message.useMessage();

	const onSubmit = async (data: TypeFormData) => {
		if (data.email !== '') {
			const result = (await sendEmail(
				data.email
			)) as AUTHORIZATION.SendEmailResponse;
			if ('data' in result) {
				if (result.data) {
					messageApi.open({
						type: 'success',
						content: result.data.message
					});
				}
			}
			if (result?.error) {
				if (result.error.status === 404) {
					messageApi.open({
						type: 'warning',
						content: result.error.data.message
					});
				} else {
					messageApi.open({
						type: 'warning',
						content: 'Ошибка сервера'
					});
				}
			}
		}
	};

	return (
		<div className={scss.ForgotPassword}>
			<div className="container">
				<div className={scss.content}>
					{contextMessage}
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
