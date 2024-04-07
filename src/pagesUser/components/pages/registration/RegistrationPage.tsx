import CustomLoginInput from '@/src/ui/customInpute/CustomLoginInput';
import CustomPasswordInput from '@/src/ui/customInpute/CustomPasswordInput';
import CustomAuthButton from '@/src/ui/customButton/CustomAuthButton';
import scss from './RegistrationPage.module.scss';
import { Link, useLocation } from 'react-router-dom';

const RegistrationPage = () => {
	const location = useLocation();

	return (
		<div className={scss.RegistrationPage}>
			<div className="container">
				<div className={scss.content}>
					<div className={scss.links}>
						<Link
							className={`${scss.loginLink} ${location.pathname === '/login' ? scss.loginLinkActive : ''}`}
							to="/login"
						>
							Войти
						</Link>
						<Link
							className={`${scss.registrationLink} ${location.pathname === '/registration' ? scss.registrationLinkActive : ''}`}
							to="/registration"
						>
							Регистрация
						</Link>
					</div>
					<div className={scss.AuthRegistrationInputs}>
						<label>
							Напишите ваше имя*
							<CustomLoginInput placeholder={'Напишите ваше имя'} type="text" />
						</label>

						<label>
							Email*
							<CustomLoginInput
								placeholder={'Напишите ваш email'}
								type={'email'}
							/>
						</label>
						<label>
							Пароль*
							<CustomPasswordInput
								placeholder={'Напишите пароль'}
								type={'password'}
							/>
						</label>
						<label>
							Подтвердите пароль*
							<CustomPasswordInput
								placeholder={'Подтвердите пароль'}
								type={'password'}
							/>
						</label>
						<CustomAuthButton
							children={'Создать аккаунт'}
							onClick={function (): void {}}
						/>
					</div>
				</div>
			</div>
		</div>
	);
};

export default RegistrationPage;
