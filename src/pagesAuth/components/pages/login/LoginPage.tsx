import CustomLoginInput from '@/src/ui/customInpute/CustomLoginInput';
import CustomPasswordInput from '@/src/ui/customInpute/CustomPasswordInput';
import CustomAuthButton from '@/src/ui/customButton/CustomAuthButton';

import scss from './LoginPage.module.scss';
import { Link, useLocation } from 'react-router-dom';

const LoginPage = () => {
	const location = useLocation();

	return (
		<>
			<div className={scss.LoginPage}>
				<div className="container">
					<div className={scss.content}>
						<div className={scss.links}>
							<Link
								className={`${scss.loginLink} ${location.pathname === '/auth/login' ? scss.loginLinkActive : ''}`}
								to="/auth/login"
							>
								Войти
							</Link>
							<Link
								className={`${scss.registrationLink} ${location.pathname === '/auth/registration' ? scss.registrationLinkActive : ''}`}
								to="/auth/registration"
							>
								Регистрация
							</Link>
						</div>
						<div className={scss.AuthLoginInputs}>
							<label>
								напишите email*
								<CustomLoginInput
									placeholder={'напишите email'}
									type={'email'}
								/>
							</label>
							<label>
								напиште пароль*
								<CustomPasswordInput
									placeholder={'напиште пароль'}
									type={'password'}
								/>
							</label>
							<CustomAuthButton
								children={'войти'}
								onClick={function (): void {}}
							/>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default LoginPage;
