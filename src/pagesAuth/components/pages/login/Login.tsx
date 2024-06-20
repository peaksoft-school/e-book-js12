import CustomLoginInput from '@/src/ui/customInpute/CustomLoginInput';
import scss from './Login.module.scss';
import CustomPasswordInput from '@/src/ui/customInpute/CustomPasswordInput';
import { Link, useNavigate } from 'react-router-dom';
import { SubmitHandler, useForm } from 'react-hook-form';
import { usePostLoginMutation } from '@/src/redux/api/me';
import { useState } from 'react';
interface IFormInput {
	email: string;
	password: string;
}
const Login = () => {
	const [postLogin] = usePostLoginMutation();
	const navigate = useNavigate();
	const { register, reset, handleSubmit } = useForm<IFormInput>();
	const [isLoading, setIsLoading] = useState<boolean>(false);

	const onSubmit: SubmitHandler<IFormInput> = async (data) => {
		setIsLoading(true);
		const results = await postLogin(data);
		if ('data' in results) {
			if (results.data?.role === 'CLIENT') {
				const { token } = results.data;
				const { firstName } = results.data;
				localStorage.setItem('NameClient', firstName);
				localStorage.setItem('token', token);
				localStorage.setItem('isAuth', 'true');
				localStorage.setItem('vendor', 'false');
				localStorage.setItem('admin', 'false');
				reset();
				navigate('/');
			} else if (results.data?.role === 'VENDOR') {
				const { token } = results.data;
				localStorage.setItem('token', token);
				localStorage.setItem('isAuth', 'false');
				localStorage.setItem('isVendor', 'true');
				localStorage.setItem('isAdmin', 'false');
				reset();
				navigate('/vendor/home');
			} else if (results.data?.role === 'ADMIN') {
				const { token } = results.data;
				localStorage.setItem('token', token);
				localStorage.setItem('isAuth', 'false');
				localStorage.setItem('isVendor', 'false');
				localStorage.setItem('isAdmin', 'true');
				reset();
				navigate('/admin');
			}
		}
	};

	return (
		<div className={scss.Login}>
			<div className="container">
				<div className={scss.content}>
					<div className={scss.headline}>
						<Link to="/auth/login">Войти</Link>
						<Link to="/auth/registration">Регистрация</Link>
					</div>
					<form
						className={scss.form_container}
						onSubmit={handleSubmit(onSubmit)}
					>
						<div className={scss.email_content}>
							<label>
								Email<span>*</span>
							</label>
							<CustomLoginInput
								type="text"
								register={register}
								registerName={'email'}
								placeholder="Напишите email"
							/>
						</div>
						<div
							className={scss.password_content}
							onSubmit={(e) => {
								e.preventDefault();
							}}
						>
							<label>
								Пароль<span>*</span>
							</label>
							<CustomPasswordInput
								type="password"
								placeholder="Напишите пароль"
								register={register}
								registerName="password"
							/>
						</div>
						<div className={scss.btn_login}>
							<button type="submit" disabled={isLoading || isLoading}>
								{isLoading || isLoading ? 'Вход...' : 'Войти'}
							</button>
						</div>
					</form>
				</div>
			</div>
		</div>
	);
};

export default Login;
