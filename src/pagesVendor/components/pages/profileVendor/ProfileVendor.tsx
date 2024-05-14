import CustomUserNameInput from '@/src/ui/customInpute/CustomUserNameInput';
import scss from './ProfileVendor.module.scss';

import CustomPasswordInput from '@/src/ui/customInpute/CustomPasswordInput';
import { ConfigProvider, Modal, Tooltip } from 'antd';
import { IconInfoCircle } from '@tabler/icons-react';
import CustomAddBookButton from '@/src/ui/customButton/CustomAddBook';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

const ProfileVendor = () => {
	const navigate = useNavigate();
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [modalSuccess, setModalSuccess] = useState(false);
	const showModal = () => {
		setIsModalOpen(true);
	};
	const handleOk = () => {
		setIsModalOpen(false);
	};

	const openModalSuccess = () => {
		Modal.success({
			title: 'Промокод успешно создан!',
			closeIcon: true,
			closable: true,
			afterClose() {
				setTimeout(() => {
					setModalSuccess(false);
				}, 3000);
			}
		});
	};
	return (
		<div className="container">
			<div className={scss.section_profile}>
				<div className={scss.books_header}>
					<div className={`customVendorsBooksModal ${scss.promocode_button}`}>
						<button onClick={showModal}>Создать промокод</button>
						<ConfigProvider
							theme={{
								components: {
									Modal: {
										lineWidth: 20
									}
								}
							}}
						>
							<Modal
								className={scss.modal}
								open={isModalOpen}
								onCancel={() => {
									setIsModalOpen(false);
								}}
								footer={[
									<button
										key="submit"
										onClick={() => {
											handleOk();
											setModalSuccess(true);
											setTimeout(() => {
												modalSuccess ? openModalSuccess() : null;
											}, 300);
										}}
									>
										Создать
									</button>
								]}
							>
								<div className={scss.promocode}>
									<label>Промокод</label>
									<input
										className={scss.promocode_input}
										type="text"
										placeholder="Напишите промокод"
									/>
								</div>
								<div className={scss.inputs}>
									<div className={scss.input_x_label}>
										<label>Дата начала</label>

										<input type="date" />
									</div>
									<div className={scss.input_x_label}>
										<label>Дата завершения</label>
										<input type="date" />
									</div>
									<div className={`${scss.input_x_label} ${scss.last_input}`}>
										<label>Процент скидки</label>
										<input type="text" placeholder="%" />
									</div>
								</div>
							</Modal>
						</ConfigProvider>
						<Tooltip
							className={scss.info_hover}
							title="Промокод применится ко всем вашим книгам"
							color={'orangered'}
							placement="bottomLeft"
						>
							<span>
								<IconInfoCircle />
							</span>
						</Tooltip>
					</div>
					<div className={scss.add_book_button}>
						<CustomAddBookButton
							children="+ Добавить книгу"
							onClick={() => {
								navigate('vendor/addBook');
							}}
						/>
					</div>
				</div>
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
									/>
								</div>
								<div className={scss.input_new_password}>
									<p className={scss.dowland_new_password}>Новый пароль</p>
									<CustomPasswordInput
										type="password"
										placeholder="Напишите новый пароль"
									/>
								</div>
								<div className={scss.input_new_password}>
									<p className={scss.confirm_password}>Подтвердите пароль</p>
									<CustomPasswordInput
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
							<button className={scss.custom_black_button}>Сохранить</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ProfileVendor;
