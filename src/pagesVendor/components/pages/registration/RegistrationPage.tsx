import CustomLoginInput from '@/src/ui/customInpute/CustomLoginInput';
import CustomPasswordInput from '@/src/ui/customInpute/CustomPasswordInput';
import CustomAuthButton from '@/src/ui/customButton/CustomAuthButton';
import scss from './RegistrationPage.module.scss';
import { Link, useLocation } from 'react-router-dom';
import CustomUserNameInput from '@/src/ui/customInpute/CustomUserNameInput';

const RegistrationPage = () => {
	const location = useLocation();

	return (
		<div className={scss.RegistrationPage}>
			<div className="container">
				<div className={scss.content}>
					<div className={scss.links}>
						<Link
							className={`${scss.loginLink} ${location.pathname === 'vendor/login' ? scss.loginLinkActive : ''}`}
							to="/vendor/login"
						>
							Войти
						</Link>
						<Link
							className={`${scss.registrationLink} ${location.pathname === 'vendor/registration' ? scss.registrationLinkActive : ''}`}
							to="vendor/registration"
						>
							Регистрация
						</Link>
					</div>
					<div className={scss.AuthRegistrationInputs}>
						<label>
							Напишите ваше имя*
							<CustomUserNameInput placeholder={'Напишите ваше имя'} />
						</label>
						<label>
							Напишите вашу фамилию*
							<CustomUserNameInput placeholder={'Напишите вашу фамилию'} />
						</label>
						<label>
							Номер вашего телефона*
							<CustomLoginInput
								placeholder={'+996 (_ _ _) _ _ _  _ _ _'}
								type="tel"
							/>
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
