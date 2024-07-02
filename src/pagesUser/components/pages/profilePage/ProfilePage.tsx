/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import CustomUserNameInput from '@/src/ui/customInpute/CustomUserNameInput';
import CustomPasswordInput from '@/src/ui/customInpute/CustomPasswordInput';
import scss from './ProfilePage.module.scss';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import {
	useUpdatePasswordUserMutation,
	useClientGetProfileQuery,
	useClientProfileMutation,
	useDeletUserProfileMutation
} from '@/src/redux/api/userProfile';
import { useNavigate } from 'react-router-dom';
import { Modal } from 'antd';

const ProfileClient: React.FC = () => {
	const { data: profileData, refetch } = useClientGetProfileQuery();

	const defaultValues = {
		firstName: profileData?.name,
		email: profileData?.email,
		oldPassword: '',
		newPassword: '',
		confirmPassword: ''
	};
	const { register, handleSubmit, reset, setValue } = useForm({
		defaultValues
	});
	const [isEditMode, setIsEditMode] = useState(false);
	const [isPasswordMode, setIsPasswordMode] = useState(false);
	const [updateProfile] = useClientProfileMutation();
	const [updatePassword] = useUpdatePasswordUserMutation();
	const [handleDeleteProfile] = useDeletUserProfileMutation();
	const [isModalOpen, setIsModalOpen] = useState(false);
	const navigate = useNavigate();
	const tokenAuth = localStorage.getItem('token');

	useEffect(() => {
		refetch();
	}, [tokenAuth]);

	const handleDeleteAndNavigate = async () => {
		try {
			await handleDeleteProfile();
			navigate('/auth/login');
		} catch (error) {
			console.error('Error deleting profile:', error);
		}
	};

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
		try {
			if (isEditMode) {
				const result = await updateProfile({
					firstName: data.firstName,
					email: data.email
				});
				if ('data' in result) {
					if (result.data) {
						localStorage.setItem('NameClient', data.firstName);
					}
				}
			} else if (isPasswordMode) {
				await updatePassword({
					currentVendorPassword: data.currentVendorPassword,
					password: data.password,
					confirmPassword: data.confirmPassword
				});
			}
			reset();
			refetch();
			setIsEditMode(false);
			setIsPasswordMode(false);
		} catch (error) {
			console.error('Error updating profile:', error);
		}
	};

	const showModal = () => setIsModalOpen(true);
	const handleOk = () => setIsModalOpen(false);
	const handleCancel = () => setIsModalOpen(false);

	return (
		<section className={scss.ProfileSection}>
			<div className="container">
				<div className={scss.content}>
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
													refError={false}
													validateError={false}
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
													refError={false}
													validateError={false}
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
													<p className={scss.current_password}>
														Текущий пароль
													</p>
													<CustomPasswordInput
														type="password"
														placeholder="Напишите текущий пароль"
														register={register}
														registerName="currentVendorPassword"
													/>
												</div>
												<div className={scss.input_new_password}>
													<p className={scss.dowland_new_password}>
														Новый пароль
													</p>
													<CustomPasswordInput
														type="password"
														placeholder="Напишите новый пароль"
														register={register}
														registerName="password"
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
										<div className={scss.update_buttons}>
											<button
												type="button"
												className={scss.custom_white_button}
												onClick={toggleEditMode}
											>
												Изменить профиль
											</button>
											<button
												type="button"
												className={scss.custom_white_button}
												onClick={togglePasswordMode}
											>
												Изменить пароль
											</button>
										</div>
									)}
									<button
										className={scss.delete_user_profile}
										onClick={showModal}
									>
										Удалить профиль?
									</button>
									{(isEditMode || isPasswordMode) && (
										<div className={scss.update_buttons}>
											<button
												type="button"
												className={scss.custom_white_button}
												onClick={
													isEditMode ? toggleEditMode : togglePasswordMode
												}
											>
												Отменить
											</button>
											<button
												type="submit"
												className={scss.custom_black_button}
											>
												Сохранить
											</button>
										</div>
									)}
								</div>
							</div>
						</div>
						<Modal
							open={isModalOpen}
							onOk={handleOk}
							onCancel={handleCancel}
							footer={null}
						>
							<div className={scss.delete_modal}>
								<p>Вы уверены, что хотите удалить профиль?</p>
								<div className={scss.buttons_modal}>
									<button onClick={handleCancel}>Отменить</button>
									<button
										onClick={() => {
											handleCancel();
											handleDeleteAndNavigate();
										}}
									>
										Удалить
									</button>
								</div>
							</div>
						</Modal>
					</form>
				</div>
			</div>
		</section>
	);
};

export default ProfileClient;
