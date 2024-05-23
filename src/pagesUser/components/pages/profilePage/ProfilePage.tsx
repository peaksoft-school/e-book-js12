import CustomUserNameInput from '@/src/ui/customInpute/CustomUserNameInput';
import scss from './ProfilePage.module.scss';

import CustomPasswordInput from '@/src/ui/customInpute/CustomPasswordInput';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { useClientProfileMutation } from '@/src/redux/api/userProfile';

const ProfilePage = () => {
	const [func] = useClientProfileMutation();

	const { register, handleSubmit, reset } = useForm();

	const onSubmit: SubmitHandler<FieldValues> = async (data) => {
		const newData = {
			firstName: data.firstName,
			email: data.email,
			oldPassword: data.oldPassword,
			newPassword: data.newPassword
		};
		console.log(newData);
		await func(newData);
		reset();
	};
	return (
		<div className="container">
			<div className={scss.section_profile}>
				<form
					onSubmit={handleSubmit(onSubmit)}
					className={scss.profile_info_name}
				>
					<div className={scss.profile_box}>
						<div className={scss.profile_name}>
							<h4 className={scss.text_tree}>Личная информация</h4>
							<div className={scss.input_name_info}>
								<p className={scss.name_info_text}>Мое имя</p>
								<CustomUserNameInput
									placeholder="Напишите ваше имя"
									registerName="firstName"
									register={register}
								/>
							</div>
							<div>
								<p className={scss.email_text}>Email</p>
								<CustomUserNameInput
									placeholder="Напишите ваш Email"
									registerName="email"
									register={register}
								/>
							</div>
							<p className={scss.tex}>Удалить профиль?</p>
						</div>
						<div className={scss.section_new_password}>
							<div>
								<h4 className={scss.change_password}>Изменить пароль</h4>
							</div>
							<div className={scss.new_password}>
								<div className={scss.input_new_password}>
									<p className={scss.current_password}>Текущий пароль</p>
									<CustomPasswordInput
										register={register}
										registerName="oldPassword"
										type="password"
										placeholder="Напишите текущий пароль"
									/>
								</div>
								<div className={scss.input_new_password}>
									<p className={scss.dowland_new_password}>Новый пароль</p>
									<CustomPasswordInput
										type="password"
										placeholder="Напишите новый пароль"
										register={register}
										registerName="newPassword"
									/>
								</div>
								<div className={scss.input_new_password}>
									<p className={scss.confirm_password}>Подтвердите пароль</p>
									<CustomPasswordInput
										register={register}
										registerName="confirmPassword"
										type="password"
										placeholder="Подтвердите пароль"
									/>
								</div>
							</div>
						</div>
					</div>
					<div className={scss.button_section}>
						<div className={scss.button_note}>
							<button className={scss.custom_white_button}>Отменить</button>
						</div>
						<div>
							<button type="submit" className={scss.custom_black_button}>
								Сохранить
							</button>
						</div>
					</div>
				</form>
			</div>
		</div>
	);
};

export default ProfilePage;
