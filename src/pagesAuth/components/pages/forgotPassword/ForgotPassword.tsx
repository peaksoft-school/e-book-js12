import scss from './ForgotPassword.module.scss';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';

interface TypeFormData {
	email: string;
}
const ForgotPassword = () => {
	const {
		register,
		reset,
		formState: { errors },
		handleSubmit
	} = useForm<TypeFormData>();

	const onSubmit = async (data: TypeFormData) => {
		const newData = {
			email: data.email
		};
		console.log(newData);
	};

	return (
		<div className={scss.ForgotPassword}>
			<div className="container">
				<div className={scss.content}>
					<div className={scss.headline}>
						<Link to="/auth/login">Войти</Link>
						<Link to="/auth/registration">Регистрация</Link>
					</div>
					<form onSubmit={handleSubmit(onSubmit)}>
						<label>
							<p>Введите элктронную почту</p>
							<input
								required={true}
								type="email"
								placeholder="Введите Email"
								{...register('email', { required: true, minLength: 4 })}
							/>
						</label>
						<button type='submit'>Отправить</button>
					</form>
				</div>
			</div>
		</div>
	);
};

export default ForgotPassword;
