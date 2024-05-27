import CustomGenreInput from '@/src/ui/customInpute/CustomGenreInput';
import scss from './Header.module.scss';
import { useEffect, useState } from 'react';
import { IconRedDot, IconSuccess, IconTest } from '@/src/assets/icons';
import LogoeBook from '@/src/ui/logoeBook/LogoeBook';

import { IconInfoCircle, IconUserCircle } from '@tabler/icons-react';
import { useNavigate } from 'react-router-dom';
import { ConfigProvider, Modal, Tooltip } from 'antd';
import CustomAddBookButton from '@/src/ui/customButton/CustomAddBook';
import { usePostPromoCodeMutation } from '@/src/redux/api/promo';

const Header = () => {
	const [headerScroll, setHeaderScroll] = useState<boolean>(false);
	const [isUser, setIsUser] = useState<boolean>(false);
	const [userExit, setUserExit] = useState<boolean>(false);
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [modalSuccess, setModalSuccess] = useState(false);
	//
	const [promoCode, setPromoCode] = useState('');
	const [dateStart, setDateStart] = useState('');
	const [dateEnd, setDateEnd] = useState('');
	const [disCount, setDisCount] = useState('');
	//
	const [createNewPromo] = usePostPromoCodeMutation();
	//
	const navigate = useNavigate();
	useEffect(() => {
		const changeHeader = () => {
			if (window.scrollY >= 10) {
				setHeaderScroll(true);
			} else {
				setHeaderScroll(false);
			}
		};

		changeHeader();
		window.addEventListener('scroll', changeHeader);

		return () => {
			window.removeEventListener('scroll', changeHeader);
		};
	}, []);
	useEffect(() => {
		if (modalSuccess) {
			setTimeout(() => {
				setModalSuccess(false);
			}, 3000);
		}
	}, [modalSuccess]);

	const onSubmitAddPromo = async () => {
		const newData = {
			promoCode,
			dateStart,
			dateEnd,
			disCount
		};
		const result = await createNewPromo(newData);
		if ('data' in result) {
			const data = result.data;
			console.log(data);
			if (data.httpStatus === 'OK') {
				setTimeout(() => {
					setModalSuccess(true);
				}, 600);
			}
		}
	};
	return (
		<>
			<header className={scss.Header}>
				<div
					className={
						headerScroll ? `${scss.scroll} ${scss.active}` : `${scss.scroll}`
					}
				>
					<div className="container">
						<div className={scss.content}>
							<div className={scss.header_content}>
								<div className={scss.logo_content}>
									<LogoeBook />
								</div>
								<div className={scss.input_vontent}>
									<CustomGenreInput
										placeholder="Искать жанр, книги, авторов, издательства... "
										value={''}
										onChange={function (): void {
											throw new Error('Function not implemented.');
										}}
									/>
								</div>
								<div className={scss.right_content}>
									<div className={scss.notice_icon}>
										<span>
											<IconTest />
										</span>
										<span>
											<IconRedDot />
										</span>
									</div>
									<div
										onClick={() => setIsUser(!isUser)}
										className={scss.profile}
									>
										<p>
											<IconUserCircle />
										</p>
									</div>
									{
										<>
											<div
												className={`${isUser ? scss.user_drop : scss.user_down}`}
											>
												<ul>
													<li
														onClick={() => {
															navigate('/vendor/profile');
														}}
													>
														Профиль
													</li>
													<hr />
													<li
														onClick={() => {
															setUserExit(!userExit);
															setIsUser(false);
														}}
													>
														Выйти
													</li>
												</ul>
											</div>
										</>
									}
									<Modal
										open={userExit}
										className={scss.modal_exit}
										closable={false}
										footer={false}
									>
										<div className={scss.modal_text}>
											<p>Вы уверены, что хотите выйти?</p>
										</div>
										<div className={scss.footer_modal}>
											<button onClick={() => setUserExit(false)}>
												Отменить
											</button>
											<button
												onClick={() => {
													setUserExit(false);
													navigate('/vendor/login');
												}}
											>
												Выйти
											</button>
										</div>
									</Modal>
								</div>
							</div>
							<div className={scss.search_input}>
								<CustomGenreInput
									placeholder="Искать жанр, книги, авторов, издательства... "
									value={''}
									onChange={function (): void {
										throw new Error('Function not implemented.');
									}}
								/>
							</div>
							<div className={scss.buttons_contents}>
								<div className={scss.books_header}>
									<div
										className={`customVendorsBooksModal ${scss.promocode_button}`}
									>
										<button
											onClick={() => {
												setIsModalOpen(true);
											}}
										>
											Создать промокод
										</button>
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
								<>
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
											closable={false}
											onCancel={() => {
												setIsModalOpen(false);
											}}
											footer={[
												<button
													type="submit"
													key="submit"
													onClick={() => {
														onSubmitAddPromo();
														setIsModalOpen(false);
													}}
												>
													Создать
												</button>
											]}
										>
											<>
												<div className={scss.promocode}>
													<label>Промокод</label>
													<input
														className={scss.promocode_input}
														type="text"
														placeholder="Напишите промокод"
														value={promoCode}
														onChange={(e) => {
															setPromoCode(e.target.value);
														}}
													/>
												</div>
												<div className={scss.inputs}>
													<div className={scss.input_x_label}>
														<label>Дата начала</label>
														<input
															type="date"
															value={dateStart}
															onChange={(e) => {
																setDateStart(e.target.value);
															}}
														/>
													</div>
													<div className={scss.input_x_label}>
														<label>Дата завершения</label>
														<input
															type="date"
															value={dateEnd}
															onChange={(e) => {
																setDateEnd(e.target.value);
															}}
														/>
													</div>
													<div
														className={`${scss.input_x_label} ${scss.last_input}`}
													>
														<label>Процент скидки</label>
														<input
															type="text"
															placeholder="%"
															value={disCount}
															onChange={(e) => {
																setDisCount(e.target.value);
															}}
														/>
													</div>
												</div>
											</>
										</Modal>
									</ConfigProvider>
								</>
							</div>
							<Modal
								className={scss.modal_success}
								onCancel={() => {
									setModalSuccess(false);
								}}
								open={modalSuccess}
								closable={false}
								footer={false}
							>
								<div className={scss.success_content}>
									<IconSuccess />
									<p>Промокод успешно создан!</p>
								</div>
							</Modal>
						</div>
					</div>
				</div>
			</header>
		</>
	);
};

export default Header;
