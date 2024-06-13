import { Link, useNavigate } from 'react-router-dom';
import scss from './Login.module.scss';
import { useForm } from 'react-hook-form';
import CustomLoginInput from '@/src/ui/customInpute/CustomLoginInput';
import CustomPasswordInput from '@/src/ui/customInpute/CustomPasswordInput';
import { usePostLoginMutation } from '@/src/redux/api/me';
interface IFormInput {
	email: string;
	password: string;
}

const Login = () => {
	const navigate = useNavigate();
	const [postLogin] = usePostLoginMutation();
	const {
		// control,
		register,
		reset,
		handleSubmit
	} = useForm<IFormInput>();

	const handleOnSubmit = async (data: IFormInput) => {
		const results = await postLogin(data);
		if ('data' in results) {
			const token = results.data?.token;
			localStorage.setItem('tokenVendor', token!);
			localStorage.setItem('isVendor', 'true');
			localStorage.setItem('isAuth', 'false');
			localStorage.removeItem('token');
			reset();
			navigate('/vendor/home');
		}
	};
	return (
		<div className={scss.Login}>
			<div className="container">
				<div className={scss.content}>
					<div className={scss.headline}>
						<Link to="/vendor/login">Войти</Link>
						<Link to="/vendor/registration">Регистрация</Link>
					</div>
					<form
						className={scss.form_container}
						onSubmit={handleSubmit(handleOnSubmit)}
					>
						<div className={scss.email_content}>
							<label>
								Email<span>*</span>
							</label>
							<CustomLoginInput
								register={register}
								registerName={'email'}
								type="text"
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
								register={register}
								registerName="password"
								type="password"
								placeholder="Напишите пароль"
							/>
						</div>
						<div className={scss.btn_login}>
							<button type="submit">Войти</button>
						</div>
					</form>
				</div>
			</div>
		</div>
	);
};

export default Login;
