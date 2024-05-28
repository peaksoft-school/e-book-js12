import React, { useState } from 'react';
import CustomUserNameInput from '@/src/ui/customInpute/CustomUserNameInput';
import CustomPasswordInput from '@/src/ui/customInpute/CustomPasswordInput';
import scss from './ProfileVendor.module.scss';
import { SubmitHandler, useForm } from 'react-hook-form';

interface MyForm {
	firstName: string;
	lastName: string;
	phoneNumber: string;
	email: string;
	currentPassword: string;
	newPassword: string;
	confirmPassword: string;
}

const ProfileVendor: React.FC = () => {
	const { register, handleSubmit } = useForm<MyForm>({
		defaultValues: {
			firstName: 'Айбек',
			lastName: 'Хайрулла уулу',
			phoneNumber: '500815251',
			email: 'aibekxairullauulu@gmail.com',
			currentPassword: '',
			newPassword: '',
			confirmPassword: ''
		}
	});

	const [isEditMode, setIsEditMode] = useState(false);

	const toggleEditMode = () => {
		setIsEditMode(!isEditMode);
	};

	const onSubmit: SubmitHandler<MyForm> = (data) => {
		console.log(data);
	};

	return (
		<div className="container">
			<form onSubmit={handleSubmit(onSubmit)}>
				<div className={scss.section_profile}>
					<div className={scss.profile_info_name}>
						<div className={scss.profile_box}>
							<div className={scss.profile_name}>
								<h4 className={scss.text_tree}>Личная информация</h4>
								<div className={scss.input_name_info}>
									<p className={scss.name_info_text}>Мое имя</p>
									{isEditMode ? (
										<CustomUserNameInput
											placeholder="Напишите ваше имя"
											register={register}
											registerName="firstName"
										/>
									) : (
										<p>Айбек</p>
									)}
								</div>
								<div className={scss.input_sor_name_info}>
									<p className={scss.sor_name_info_text}>Ваша фамилия</p>
									{isEditMode ? (
										<CustomUserNameInput
											placeholder="Введите вашу фамилию"
											register={register}
											registerName="lastName"
										/>
									) : (
										<p>Хайрулла уулу</p>
									)}
								</div>
								<div className={scss.input_phone_info}>
									<p className={scss.phone_info_text}>Номер телефона</p>
									{isEditMode ? (
										<CustomUserNameInput
											placeholder="+996 (___) __ __ __"
											register={register}
											registerName="phoneNumber"
										/>
									) : (
										<p>500815251</p>
									)}
								</div>
								<div>
									<p className={scss.email_text}>Email</p>
									{isEditMode ? (
										<CustomUserNameInput
											placeholder="Напишите ваш Email"
											register={register}
											registerName="email"
										/>
									) : (
										<p>aibekxairullauulu@gmail.com</p>
									)}
								</div>
								<p className={scss.tex}>Удалить профиль?</p>
							</div>
							{isEditMode && (
								<div className={scss.section_new_password}>
									<div>
										<h4 className={scss.change_password}>Изменить пароль</h4>
									</div>
									<div className={scss.new_password}>
										<div className={scss.input_new_password}>
											<p className={scss.current_password}>Текущий пароль</p>
											<CustomPasswordInput
												type="password"
												placeholder="Напишите текущий пароль"
												register={register}
												registerName="currentPassword"
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
											<p className={scss.confirm_password}>
												Подтвердите пароль
											</p>
											<CustomPasswordInput
												type="password"
												placeholder="Подтвердите пароль"
												register={register}
												registerName="confirmPassword"
											/>
										</div>
									</div>
								</div>
							)}
						</div>
						<div className={scss.button_section}>
							<div className={scss.button_note}>
								<button
									type="button"
									className={scss.custom_white_button}
									onClick={toggleEditMode}
								>
									{isEditMode ? 'Отменить' : 'Изменить'}
								</button>
							</div>
							{isEditMode && (
								<div>
									<button type="submit" className={scss.custom_black_button}>
										Сохранить
									</button>
								</div>
							)}
						</div>
					</div>
				</div>
			</form>
		</div>
	);
};

export default ProfileVendor;
