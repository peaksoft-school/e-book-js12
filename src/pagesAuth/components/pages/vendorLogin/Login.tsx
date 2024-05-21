/* eslint-disable @typescript-eslint/no-explicit-any */
import { Link } from 'react-router-dom';
import scss from './Login.module.scss';
import { useForm } from 'react-hook-form';
import CustomLoginInput from '@/src/ui/customInpute/CustomLoginInput';
import CustomPasswordInput from '@/src/ui/customInpute/CustomPasswordInput';
import { usePostLoginMutation } from '@/src/redux/api/me';

const Login = () => {
	const [postLogin] = usePostLoginMutation()
	const {
		// control,
		register,
		reset,
		handleSubmit
	} = useForm();

	const handleOnSubmit = async (data: any) => {
		console.log(data);
		await postLogin(data)
		reset();
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
