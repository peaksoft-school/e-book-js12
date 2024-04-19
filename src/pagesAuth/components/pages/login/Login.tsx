import CustomLoginInput from '@/src/ui/customInpute/CustomLoginInput';
import scss from './Login.module.scss';
import CustomPasswordInput from '@/src/ui/customInpute/CustomPasswordInput';
import { Link } from 'react-router-dom';
const Login = () => {
	return (
		<div className={scss.Login}>
			<div className="container">
				<div className={scss.content}>
					<div className={scss.headline}>
						<Link to="/auth/login">Войти</Link>
						<Link to="/auth/registration">Регистрация</Link>
					</div>
					<form className={scss.form_container}>
						<div className={scss.email_content}>
							<label>
								Email<span>*</span>
							</label>
							<CustomLoginInput type="text" placeholder="Напишите email" />
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
