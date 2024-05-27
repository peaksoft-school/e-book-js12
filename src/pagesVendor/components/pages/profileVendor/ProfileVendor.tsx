import React from 'react';
import CustomUserNameInput from '@/src/ui/customInpute/CustomUserNameInput';
import scss from './ProfileVendor.module.scss';
import CustomPasswordInput from '@/src/ui/customInpute/CustomPasswordInput';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useUpdateProfileMutation } from '@/src/redux/api/updateProfile';

type FormValues = {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  email: string;
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
};

const ProfileVendor: React.FC = () => {
  const { register, handleSubmit } = useForm<FormValues>();
  const [updateProfile] = useUpdateProfileMutation();

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    try {
      const response = await updateProfile(data).unwrap();
      console.log('Profile updated successfully:', response);
    } catch (error) {
      console.error('Failed to update profile:', error);
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
                  <CustomUserNameInput
                    placeholder="Напишите ваше имя"
                    register={register}
                    registerName="firstName"
                  />
                </div>
                <div className={scss.input_sor_name_info}>
                  <p className={scss.sor_name_info_text}>Ваша фамилия</p>
                  <CustomUserNameInput
                    placeholder="Введите вашу фамилию"
                    register={register}
                    registerName="lastName"
                  />
                </div>
                <div className={scss.input_phone_info}>
                  <p className={scss.phone_info_text}>Номер телефона</p>
                  <CustomUserNameInput
                    placeholder="+996 (___) __ __ __"
                    register={register}
                    registerName="phoneNumber"
                  />
                </div>
                <div>
                  <p className={scss.email_text}>Email</p>
                  <CustomUserNameInput
                    placeholder="Напишите ваш Email"
                    register={register}
                    registerName="email"
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
                    <p className={scss.confirm_password}>Подтвердите пароль</p>
                    <CustomPasswordInput
                      type="password"
                      placeholder="Подтвердите пароль"
                      register={register}
                      registerName="confirmPassword"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className={scss.button_section}>
              <div className={scss.button_note}>
                <button type="button" className={scss.custom_white_button}>
                  Отменить
                </button>
              </div>
              <div>
                <button type="submit" className={scss.custom_black_button}>
                  Сохранить
                </button>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default ProfileVendor;
