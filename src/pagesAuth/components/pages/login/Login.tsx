/* eslint-disable @typescript-eslint/no-explicit-any */
import CustomLoginInput from '@/src/ui/customInpute/CustomLoginInput';
import scss from './Login.module.scss';
import CustomPasswordInput from '@/src/ui/customInpute/CustomPasswordInput';
import { Link } from 'react-router-dom';
import { SubmitHandler, useForm } from 'react-hook-form';
import { usePostLoginMutation } from '@/src/redux/api/me';
interface IFormInput {
	email: string;
	password: string;
}
const Login = () => {
	const [postLogin] = usePostLoginMutation();
	const { register, reset, handleSubmit } = useForm<IFormInput>();

	const onSubmit: SubmitHandler<IFormInput> = async (data: any) => {
		console.log(data);
		const response = await postLogin(data);
		if('data' in response){
			console.log(response.data);
		}
		reset();
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
							<button type="submit">Войти</button>
						</div>
					</form>
				</div>
			</div>
		</div>
	);
};

export default Login;
