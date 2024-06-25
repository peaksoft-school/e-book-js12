import React, { useState, useEffect } from 'react';
import CustomUserNameInput from '@/src/ui/customInpute/CustomUserNameInput';
import CustomPasswordInput from '@/src/ui/customInpute/CustomPasswordInput';
import scss from './ProfileVendor.module.scss';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import {
	useUpdatePasswordMutation,
	useGetProfileQuery,
	useUpdateProfileMutation,
	useDeletVendorProfileMutation
} from '@/src/redux/api/updateProfile';
import { Link, useNavigate } from 'react-router-dom';
import { Modal } from 'antd';

const ProfileVendor: React.FC = () => {
	const { register, handleSubmit, reset, setValue } = useForm();
	const [isEditMode, setIsEditMode] = useState(false);
	const [isPasswordMode, setIsPasswordMode] = useState(false);
	const [updateProfile] = useUpdateProfileMutation();
	const { data: profileData, refetch } = useGetProfileQuery();
	const [updatePassword] = useUpdatePasswordMutation();
	const [handleDelVendorProfile] = useDeletVendorProfileMutation();
	const [isModalOpen, setIsModalOpen] = useState(false);

	const navigate = useNavigate();

	const handleDeletNavigate = async () => {
		try {
			await handleDelVendorProfile();
			navigate('/auth/login');
		} catch (error) {
			console.error('err', error);
			return false;
		}
	};

	useEffect(() => {
		if (profileData) {
			setValue('firstName', profileData.firstName);
			setValue('lastName', profileData.lastName);
			setValue('phoneNumber', profileData.phoneNumber);
			setValue('email', profileData.email);
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
		if (isEditMode) {
			const newData = {
				firstName: data.firstName,
				lastName: data.lastName,
				phoneNumber: data.phoneNumber,
				email: data.email
			};
			await updateProfile(newData);
		} else if (isPasswordMode) {
			const passwordData = {
				currentVendorPassword: data.currentPassword,
				password: data.newPassword,
				confirmPassword: data.confirmPassword
			};
			await updatePassword(passwordData);
		}
		reset();
		refetch();
		setIsEditMode(false);
		setIsPasswordMode(false);
	};

	const showModal = () => {
		setIsModalOpen(true);
	};

	const handleOk = () => {
		setIsModalOpen(false);
	};

	const handleCancel = () => {
		setIsModalOpen(false);
	};

	return (
		<div className="container">
			<form onSubmit={handleSubmit(onSubmit)}>
				<div className={scss.section_profile}>
					<div className={scss.profile_info_name}>
						<div className={scss.profile_box}>
							<div className={scss.profile_name}>
								<div className={scss.navi}>
									<Link
										to={'/vendor/home'}
										className={`${scss.link_to_home} ${location.pathname === '/vendor' ? scss.link_to_home_active : ''}`}
									>
										Главная
									</Link>
									/ <span>Профиль</span>
								</div>
								<h4 className={scss.text_tree}>Личная информация</h4>
								<div className={scss.input_name_info}>
									<p className={scss.name_info_text}>Ваше имя</p>
									{isEditMode ? (
										<CustomUserNameInput
											refError={false}
											validateError={false}
											placeholder="Напишите ваше имя"
											register={register}
											registerName="firstName"
										/>
									) : (
										<p>{profileData?.firstName}</p>
									)}
								</div>
								<div className={scss.input_sor_name_info}>
									<p className={scss.sor_name_info_text}>Ваша фамилия</p>
									{isEditMode ? (
										<CustomUserNameInput
											refError={false}
											validateError={false}
											placeholder="Введите вашу фамилию"
											register={register}
											registerName="lastName"
										/>
									) : (
										<p>{profileData?.lastName}</p>
									)}
								</div>
								<div className={scss.input_phone_info}>
									<p className={scss.phone_info_text}>Номер телефона</p>
									{isEditMode ? (
										<CustomUserNameInput
											refError={false}
											validateError={false}
											placeholder="+996 (___) __ __ __"
											register={register}
											registerName="phoneNumber"
										/>
									) : (
										<p>{profileData?.phoneNumber}</p>
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
								<div>
									<p onClick={showModal} className={scss.delete_profile_vendor}>
										Удалить профиль?
									</p>
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
								<div className={scss.custom_white_black}>
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
								<div className={scss.custom_white_black}>
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
				<Modal
					open={isModalOpen}
					onOk={handleOk}
					onCancel={handleCancel}
					footer={false}
				>
					<div className={scss.delete_modal}>
						<p>Вы уверены, что хотите удалить профиль?</p>
						<div className={scss.buttons_modal}>
							<button
								onClick={() => {
									setIsModalOpen(false);
								}}
							>
								Отменить
							</button>
							<button
								onClick={() => {
									setIsModalOpen(false);
									handleDeletNavigate();
								}}
							>
								Удалить
							</button>
						</div>
					</div>
				</Modal>
			</form>
		</div>
	);
};

export default ProfileVendor;
