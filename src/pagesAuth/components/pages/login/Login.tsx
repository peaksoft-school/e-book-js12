import CustomLoginInput from '@/src/ui/customInpute/CustomLoginInput';
import scss from './Login.module.scss';
import CustomPasswordInput from '@/src/ui/customInpute/CustomPasswordInput';
import { Link, useNavigate } from 'react-router-dom';
import { SubmitHandler, useForm } from 'react-hook-form';
import { usePostLoginMutation } from '@/src/redux/api/auth';
import { message } from 'antd';
interface IFormInput {
	email: string;
	password: string;
}
const Login = () => {
	const [postLogin, { isLoading }] = usePostLoginMutation();
	const navigate = useNavigate();
	const { register, reset, handleSubmit } = useForm<IFormInput>();
	const [messageApi, handleMessage] = message.useMessage();

	const onSubmit: SubmitHandler<IFormInput> = async (data) => {
		const results = (await postLogin(data)) as AUTHORIZATION.LoginResponse;
		if ('data' in results) {
			if (results.data?.role === 'CLIENT') {
				const { token } = results.data;
				const { firstName } = results.data;
				localStorage.setItem('NameClient', firstName);
				localStorage.setItem('token', token);
				localStorage.setItem('client', 'true');
				localStorage.setItem('vendor', 'false');
				localStorage.setItem('admin', 'false');
				localStorage.setItem('EBOOK', JSON.stringify(results.data));
				reset();
				navigate('/');
			} else if (results.data?.role === 'VENDOR') {
				const { token } = results.data;
				localStorage.setItem('token', token);
				localStorage.setItem('client', 'false');
				localStorage.setItem('vendor', 'true');
				localStorage.setItem('admin', 'false');
				localStorage.setItem('EBOOK', JSON.stringify(results.data));
				reset();
				navigate('/');
			} else if (results.data?.role === 'ADMIN') {
				const { token } = results.data;
				localStorage.setItem('token', token);
				localStorage.setItem('client', 'false');
				localStorage.setItem('vendor', 'false');
				localStorage.setItem('admin', 'true');
				localStorage.setItem('EBOOK', JSON.stringify(results.data));
				reset();
				navigate('/');
			}
		}

		if (results.error) {
			if (results.error.status === 400) {
				if (results.error.data.password && results.error.data.email) {
					messageApi.open({
						type: 'warning',
						content: results.error.data.password
					});
					messageApi.open({
						type: 'warning',
						content: results.error.data.email
					});
				} else if (results.error.data?.email) {
					messageApi.open({
						type: 'warning',
						content: results.error.data.email
					});
				} else if (results.error.data?.password) {
					messageApi.open({
						type: 'warning',
						content: results.error.data.password
					});
				}
			}
		}
	};

	return (
		<div className={scss.Login}>
			<div className="container">
				<div className={scss.content}>
					{handleMessage}
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
								type="email"
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
							<button type="submit" disabled={isLoading ? true : false}>
								{isLoading ? 'Вход...' : 'Войти'}
							</button>
						</div>
					</form>
					<button
						className={scss.forgot_password}
						onClick={() => {
							navigate('/auth/forgot-password');
						}}
					>
						Забыли пароль ?
					</button>
				</div>
			</div>
		</div>
	);
};

export default Login;
