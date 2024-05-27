import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useUpdateProfileMutation } from '@/src/redux/api/updateProfile';
import CustomUserNameInput from '@/src/ui/customInpute/CustomUserNameInput';
import CustomPasswordInput from '@/src/ui/customInpute/CustomPasswordInput';
import scss from './ProfileVendor.module.scss';

interface FormData {
    firstName: string;
    lastName: string;
    phoneNumber: string;
    email: string;
    currentPassword: string;
    newPassword: string;
    confirmPassword: string;
}

const ProfileVendor = () => {
    const { register, handleSubmit, reset } = useForm<FormData>(); 
    const [updateProfile, { isLoading, isError, isSuccess, error }] = useUpdateProfileMutation(); 
    const [successMessage, setSuccessMessage] = useState<string | null>(null);

    const onSubmit = async (data: FormData) => {
        setSuccessMessage(null);
        try {
            const response = await updateProfile(data).unwrap();
            if (response.success) {
                setSuccessMessage('Профиль успешно обновлен!');
                reset();
            } else {
                setSuccessMessage(null);
            }
        } catch (err) {
            console.error('Failed to update profile:', err);
        }
    };

    const errorMessage = (error as any)?.data?.message || 'Неизвестная ошибка';

    return (
        <div className="container">
            <form onSubmit={handleSubmit(onSubmit)} className={scss.section_profile}>
                <div className={scss.profile_info_name}>
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
                            <div className={scss.input_sor_name_info}>
                                <p className={scss.sor_name_info_text}>Ваша фамилия</p>
                                <CustomUserNameInput
                                    placeholder="Введите вашу фамилию"
                                    registerName="lastName"
                                    register={register}
                                />
                            </div>
                            <div className={scss.input_phone_info}>
                                <p className={scss.phone_info_text}>Номер телефона</p>
                                <CustomUserNameInput
                                    placeholder="+996 (___) __ __ __"
                                    registerName="phoneNumber"
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
                            <div className={scss.tex_tex}>
                                <p className={scss.tex}>Удалить профиль?</p>
                            </div>
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
                            <button
                                type="submit"
                                className={scss.custom_black_button}
                                disabled={isLoading}
                            >
                                Сохранить
                            </button>
                        </div>
                    </div>
                </div>
                {isError && (
                    <div className={scss.error_message}>
                        Произошла ошибка при обновлении профиля: {errorMessage}
                    </div>
                )}
                {isSuccess && successMessage && (
                    <div className={scss.success_message}>{successMessage}</div>
                )}
            </form>
        </div>
    );
};

export default ProfileVendor;
