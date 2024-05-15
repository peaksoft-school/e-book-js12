import CustomGenreInput from '@/src/ui/customInpute/CustomGenreInput';
import scss from './Header.module.scss';
import { useEffect, useState } from 'react';
import { IconRedDot, IconTest } from '@/src/assets/icons';
import LogoeBook from '@/src/ui/logoeBook/LogoeBook';
import { IconUserCircle } from '@tabler/icons-react';
import { useNavigate } from 'react-router-dom';
import ExitModal from '@/src/ui/customModals/ExitModal';
import { ConfigProvider, Modal, Tooltip } from 'antd';
import { IconInfoCircle } from '@tabler/icons-react';
import CustomAddBookButton from '@/src/ui/customButton/CustomAddBook';

const Header = () => {
	const [headerScroll, setHeaderScroll] = useState<boolean>(false);
	const [isUser, setIsUser] = useState<boolean>(false);
	const [userExit, setUserExit] = useState<boolean>(false);
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
								<div
									onClick={() => {
										navigate('/vendor');
									}}
									className={scss.logo_content}
								>
									<LogoeBook />
								</div>
								<div className={scss.input_vontent}>
									<CustomGenreInput placeholder="Искать жанр, книги, авторов, издательства... " />
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
															navigate('vendor/profile');
															setIsUser(false);
														}}
													>
														Профиль
													</li>
													<hr />
													<li onClick={() => setUserExit(!userExit)}>Выйти</li>
												</ul>
											</div>
										</>
									}
									{userExit ? (
										<>
											<ExitModal
												isOpen={userExit}
												onClose={() => setUserExit(false)}
												btnClose={() => {
													navigate('/auth/login');
												}}
											/>
										</>
									) : null}
								</div>
							</div>

							<div className={scss.search_input}>
								<CustomGenreInput placeholder="Искать жанр, книги, авторов, издательства... " />
							</div>
						</div>
						<div className={scss.books_header}>
							<div
								className={`customVendorsBooksModal ${scss.promocode_button}`}
							>
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
											<div
												className={`${scss.input_x_label} ${scss.last_input}`}
											>
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
					</div>
				</div>
			</header>
		</>
	);
};

export default Header;
