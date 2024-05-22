import CustomUserNameInput from '@/src/ui/customInpute/CustomUserNameInput';
import scss from './ProfileVendor.module.scss';
import CustomPasswordInput from '@/src/ui/customInpute/CustomPasswordInput';
import { useForm } from 'react-hook-form';

const ProfileVendor = () => {
	const { register } = useForm();
	return (
		<div className="container">
			<div className={scss.section_profile}>
				<div className={scss.profile_info_name}>
					<div className={scss.profile_box}>
						<div className={scss.profile_name}>
							<h4 className={scss.text_tree}>Личная информация</h4>
							<div className={scss.input_name_info}>
								<p className={scss.name_info_text}>Мое имя</p>
								<CustomUserNameInput placeholder="Напишите ваше имя" />
							</div>
							<div className={scss.input_sor_name_info}>
								<p className={scss.sor_name_info_text}>Ваша фамилие</p>
								<CustomUserNameInput placeholder="Введите вашу фамилию" />
							</div>
							<div className={scss.input_phone_info}>
								<p className={scss.phone_info_text}>Номер телефона</p>
								<CustomUserNameInput placeholder="+996 (___) __ __ __" />
							</div>

							<div>
								<p className={scss.email_text}>Email</p>
								<CustomUserNameInput placeholder="Напишите ваш Email" />
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
										registerName={'ff'}
									/>
								</div>
								<div className={scss.input_new_password}>
									<p className={scss.dowland_new_password}>Новый пароль</p>
									<CustomPasswordInput
										type="password"
										placeholder="Напишите новый пароль"
										register={register}
										registerName={'ff'}
									/>
								</div>
								<div className={scss.input_new_password}>
									<p className={scss.confirm_password}>Подтвердите пароль</p>
									<CustomPasswordInput
										type="password"
										placeholder="Подтвердите пароль"
										register={register}
										registerName={'ff'}
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
							<button className={scss.custom_black_button}>Сохранить</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ProfileVendor;
