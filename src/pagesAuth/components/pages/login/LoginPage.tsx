import { useForm } from 'react-hook-form';
import { Link, useLocation } from 'react-router-dom';
import scss from './LoginPage.module.scss';
import CustomLoginInput from '@/src/ui/customInpute/CustomLoginInput';
import CustomPasswordInput from '@/src/ui/customInpute/CustomPasswordInput';
import CustomAuthButton from '@/src/ui/customButton/CustomAuthButton';

const LoginPage = () => {
	const location = useLocation();

	const {
		register,
		handleSubmit,
		formState: { errors }
	} = useForm();

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const onSubmit = (data: any) => {
		console.log(data);
	};

	console.log(errors.password);

	return (
		<>
			<div className={scss.LoginPage}>
				<div className="container">
					<div className={scss.content}>
						<div className={scss.links}>
							<Link
								className={`${scss.loginLink} ${
									location.pathname === '/auth/login'
										? scss.loginLinkActive
										: ''
								}`}
								to="/auth/login"
							>
								Войти
							</Link>
							<Link
								className={`${scss.registrationLink} ${
									location.pathname === '/auth/registration'
										? scss.registrationLinkActive
										: ''
								}`}
								to="/auth/registration"
							>
								Регистрация
							</Link>
						</div>
						<div className={scss.AuthLoginInputs}>
							<form onSubmit={handleSubmit(onSubmit)}>
								<div className={scss.labelInput}>
									<label>Напишите email*</label>
									<CustomLoginInput
										placeholder={'напишите email'}
										type={'email'}
										{...register('email', { required: true })}
									/>
								</div>
								<div className={scss.labelInput}>
									<label>Напишите пароль*</label>
									<CustomPasswordInput
										styleError={errors.password}
										placeholder={'напишите пароль'}
										type={'password'}
										{...register('password', { required: true })}
									/>
								</div>
								<CustomAuthButton
									children={'войти'}
									onClick={function (): void {
										console.log('Function not implemented.');
									}}
								/>
							</form>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default LoginPage;
