import React, { useState, useEffect } from 'react';
import CustomUserNameInput from '@/src/ui/customInpute/CustomUserNameInput';
import CustomPasswordInput from '@/src/ui/customInpute/CustomPasswordInput';
import scss from './ProfilePage.module.scss';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import {
	useUpdatePasswordUserMutation,
	useClientGetProfileQuery,
	useClientProfileMutation
} from '@/src/redux/api/userProfile';

const ProfileClient: React.FC = () => {
	const { register, handleSubmit, reset, setValue } = useForm();
	const [isEditMode, setIsEditMode] = useState(false);
	const [isPasswordMode, setIsPasswordMode] = useState(false);
	const [updateProfile] = useClientProfileMutation();
	const { data: profileData, refetch } = useClientGetProfileQuery();
	const [updatePassword] = useUpdatePasswordUserMutation();

	useEffect(() => {
		if (profileData) {
			setValue('firstName', profileData.name);
			setValue('email', profileData.email);
			setValue('oldPassword', '');
			setValue('newPassword', '');
			setValue('confirmPassword', '');
		}
	}, [profileData, setValue]);

	const toggleEditMode = () => {
		setIsEditMode(!isEditMode);
		setIsPasswordMode(false);
	};

	const togglePasswordMode = () => {
		setIsPasswordMode(!isPasswordMode);
		setIsEditMode(false);
	};

	const onSubmit: SubmitHandler<FieldValues> = async (data) => {
		console.log(data);
		
		try {
			if (isEditMode) {
				const newData = {
					firstName: data.firstName,
					email: data.email
				};
				await updateProfile(newData);
			} else if (isPasswordMode) {
				const passwordData = {
					currentVendorPassword: data.currentVendorPassword,
					password: data.Password,
					confirmPassword: data.confirmPassword
				};
				console.log(passwordData);

				await updatePassword(passwordData);
			}
			reset();
			refetch();
			setIsEditMode(false);
			setIsPasswordMode(false);
		} catch (error) {
			console.error('Error updating profile:', error);
		}
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
										<p>{profileData?.name}</p>
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
										<p>{profileData?.email}</p>
									)}
								</div>
							</div>
							{isPasswordMode && (
								<div className={scss.section_new_password}>
									<h4 className={scss.change_password}>Изменить пароль</h4>
									<div className={scss.new_password}>
										<div className={scss.input_new_password}>
											<p className={scss.current_password}>Текущий пароль</p>
											<CustomPasswordInput
												type="password"
												placeholder="Напишите текущий пароль"
												register={register}
												registerName="currentVendorPassword"
											/>
										</div>
										<div className={scss.input_new_password}>
											<p className={scss.dowland_new_password}>Новый пароль</p>
											<CustomPasswordInput
												type="password"
												placeholder="Напишите новый пароль"
												register={register}
												registerName="Password"
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
							{!isEditMode && !isPasswordMode && (
								<>
									<div className={scss.button_note}>
										<button
											type="button"
											className={scss.custom_white_button}
											onClick={toggleEditMode}
										>
											Изменить профиль
										</button>
									</div>
									<div className={scss.button_note}>
										<button
											type="button"
											className={scss.custom_white_button}
											onClick={togglePasswordMode}
										>
											Изменить пароль
										</button>
									</div>
								</>
							)}
							{isEditMode && (
								<div>
									<button
										type="button"
										className={scss.custom_white_button}
										onClick={toggleEditMode}
									>
										Отменить
									</button>
									<button type="submit" className={scss.custom_black_button}>
										Сохранить
									</button>
								</div>
							)}
							{isPasswordMode && (
								<div>
									<button
										type="button"
										className={scss.custom_white_button}
										onClick={togglePasswordMode}
									>
										Отменить
									</button>
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

export default ProfileClient;
