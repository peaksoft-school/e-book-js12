import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ConfigProvider, Modal, Tooltip, message } from 'antd';
import { IconInfoCircle, IconUserCircle } from '@tabler/icons-react';
import { IconRedDot, IconSuccess, IconTest } from '@/src/assets/icons';
import LogoeBook from '@/src/ui/logoeBook/LogoeBook';
import CustomAddBookButton from '@/src/ui/customButton/CustomAddBook';
import CustomGenreInput from '@/src/ui/customInpute/CustomGenreInput';
import scss from './Header.module.scss';
import { usePostPromoCodeMutation } from '@/src/redux/api/promo';
import { useSearchBooksQuery } from '@/src/redux/api/search';
import { useGetNotificationQuery } from '@/src/redux/api/notification';

const Header = () => {
	const [headerScroll, setHeaderScroll] = useState<boolean>(false);
	const [isUser, setIsUser] = useState<boolean>(false);
	const [userExit, setUserExit] = useState<boolean>(false);
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [modalSuccess, setModalSuccess] = useState(false);
	const [promoCode, setPromoCode] = useState('');
	const [dateStart, setDateStart] = useState('');
	const [dateEnd, setDateEnd] = useState('');
	const [disCount, setDisCount] = useState<string | number>('');
	const [currentDate, setCurrentDate] = useState<string>('');
	const [createNewPromo] = usePostPromoCodeMutation();
	const [searchTerm, setSearchTerm] = useState<string>('');
	const [showResults, setShowResults] = useState<boolean>(false);
	const [messageAPi, contextMessage] = message.useMessage();
	const { data: searchResults, refetch } = useSearchBooksQuery(
		{ searchTerm },
		{ skip: !searchTerm }
	);
	const { data } = useGetNotificationQuery();

	const navigate = useNavigate();
	const location = useLocation();

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
		const currentDate = new Date().toISOString().split('T')[0];
		setCurrentDate(currentDate);
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
		const result = (await createNewPromo(
			newData
		)) as PROMO.CreatePromoCodeResponse;
		if ('data' in result) {
			if (result.data.httpStatus === 'OK') {
				setIsModalOpen(false);
				setTimeout(() => {
					setModalSuccess(true);
				}, 600);
			}
		}
		if (result.error?.data?.promoCode) {
			console.log(result.error.data?.promoCode);
			messageAPi.open({
				type: 'warning',
				content: result.error.data?.promoCode,
				duration: 5
			});
		}
		if (result.error?.data?.message) {
			console.log(result.error.data.message);
			messageAPi.open({
				type: 'warning',
				content: result.error.data?.message
			});
		}
	};
	const HandleExitVendor = () => {
		setUserExit(!userExit);
		localStorage.setItem('vendor', 'false');
		localStorage.setItem('admin', 'false');
		localStorage.setItem('client', 'false');
		localStorage.removeItem('token');
		localStorage.setItem(
			'EBOOK',
			JSON.stringify({
				role: 'GUEST',
				email: '',
				firstName: '',
				id: 0,
				token: ''
			})
		);
		navigate('/');
	};

	const handleBookClick = (id: number) => {
		navigate(`home/${id}`);
		setShowResults(false);
		setSearchTerm('');
	};

	const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value;
		setSearchTerm(value);
		setShowResults(!!value);
		refetch();
	};

	const handleDateEndChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const selectedDate = e.target.value;
		if (selectedDate < currentDate) {
			alert('Выберите дату, которая еще не прошла!');
		} else {
			setDateEnd(selectedDate);
		}
	};
	const scrollToHeaderSection = () => {
		const element = document.getElementById('headerVendor');
		if (element) {
			window.scrollTo({
				top: element.offsetTop,
				behavior: 'smooth'
			});
		}
	};

	return (
		<>
			<header id="headerVendor" className={scss.Header}>
				<div
					className={
						headerScroll ? `${scss.scroll} ${scss.active}` : `${scss.scroll}`
					}
				>
					<div className="container">
						<div className={scss.content}>
							<div className={scss.header_content}>
								<div className={scss.logo_content}>
									<LogoeBook
										navigateToHome={() => {
											if (location.pathname !== '/vendor/home') {
												navigate('/vendor/home');
												setTimeout(() => {
													scrollToHeaderSection();
												}, 300);
											}
										}}
									/>
								</div>
								<div className={scss.searchResults}>
									<div className={scss.search}>
										<CustomGenreInput
											onChange={handleSearchChange}
											value={searchTerm}
											placeholder="Искать жанр, книги, авторов, издательства..."
										/>
									</div>
									<div className={scss.lii}>
										{showResults && searchResults && (
											<div className={scss.searchResultsLi}>
												<ul>
													{searchResults.map((book) => (
														<li
															onClick={() => handleBookClick(book.id)}
															key={book.id}
														>
															<div>
																<p>{book.title}</p>
															</div>
														</li>
													))}
												</ul>
											</div>
										)}
									</div>
								</div>
								<div className={scss.right_content}>
									<div
										onClick={() => {
											navigate('vendor/notification');
										}}
										className={scss.notice_icon}
									>
										<span>
											<IconTest />
										</span>
										<span>
											{data?.length !== 0 ? (
												<>
													<IconRedDot />
												</>
											) : null}
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
									<div className={isUser ? scss.user_drop : scss.user_down}>
										<ul>
											<li
												onClick={() => {
													setIsUser(false);
													navigate('/vendor/profile');
												}}
											>
												Профиль
											</li>
											<hr />
											<li
												onClick={() => {
													setIsUser(false);
													setUserExit(true);
												}}
											>
												Выйти
											</li>
										</ul>
									</div>
									<Modal
										open={userExit}
										className={scss.modal_exit}
										closable={false}
										footer={false}
									>
										<div className={scss.exit_modal}>
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
														HandleExitVendor();
													}}
												>
													Выйти
												</button>
											</div>
										</div>
									</Modal>
								</div>
							</div>
							<div className={scss.search_input}>
								<CustomGenreInput
									placeholder="Искать жанр, книги, авторов, издательства..."
									value=""
									onChange={() => {}}
								/>
							</div>
							<div className={scss.buttons_contents}>
								<div className={scss.books_header}>
									<div
										className={`customVendorsBooksModal ${scss.promocode_button}`}
									>
										<button onClick={() => setIsModalOpen(true)}>
											Создать промокод
										</button>
										<Tooltip
											className={scss.info_hover}
											title={
												<p className={scss.tooltip_text}>
													Промокод применится ко всем вашим книгам
												</p>
											}
											color="orangered"
											placement="bottomLeft"
										>
											<span>
												<IconInfoCircle />
											</span>
										</Tooltip>
									</div>
									<div className={scss.add_book_button}>
										<CustomAddBookButton
											onClick={() => navigate('/vendor/addBook')}
										>
											+ Добавить книгу
										</CustomAddBookButton>
									</div>
								</div>
								<ConfigProvider
									theme={{ components: { Modal: { lineWidth: 20 } } }}
								>
									<Modal
										className={scss.modal}
										open={isModalOpen}
										closable={false}
										onCancel={() => setIsModalOpen(false)}
										footer={[
											<button
												className={scss.button_add_promo}
												type="submit"
												key="submit"
												onClick={() => {
													onSubmitAddPromo();
												}}
											>
												Создать
											</button>
										]}
									>
										<div className={scss.promocode}>
											{contextMessage}
											<label>Промокод</label>
											<input
												className={scss.promocode_input}
												type="text"
												placeholder="Напишите промокод"
												value={promoCode}
												onChange={(e) => setPromoCode(e.target.value)}
											/>
										</div>
										<div className={scss.inputs}>
											<div className={scss.input_x_label}>
												<label>Дата начала</label>
												<input
													type="date"
													min={new Date().toISOString().split('T')[0]}
													value={dateStart}
													onChange={(e) => setDateStart(e.target.value)}
												/>
											</div>
											<div className={scss.input_x_label}>
												<label>Дата завершения</label>
												<input
													type="date"
													min={new Date().toISOString().split('T')[0]}
													value={dateEnd}
													onChange={handleDateEndChange}
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
													onChange={(e) => setDisCount(e.target.value)}
												/>
											</div>
										</div>
									</Modal>
								</ConfigProvider>
							</div>
							<Modal
								className={scss.modal_success}
								onCancel={() => setModalSuccess(false)}
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
