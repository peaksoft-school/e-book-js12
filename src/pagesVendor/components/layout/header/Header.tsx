import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CustomGenreInput from '@/src/ui/customInpute/CustomGenreInput';
import scss from './Header.module.scss';
import { IconRedDot, IconSuccess, IconTest } from '@/src/assets/icons';
import LogoeBook from '@/src/ui/logoeBook/LogoeBook';
import { IconInfoCircle, IconUserCircle } from '@tabler/icons-react';
import { ConfigProvider, Modal, Tooltip } from 'antd';
import CustomAddBookButton from '@/src/ui/customButton/CustomAddBook';
import { usePostPromoCodeMutation } from '@/src/redux/api/promo';
import { useSearchBooksQuery } from '@/src/redux/api/search';

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
	const [createNewPromo] = usePostPromoCodeMutation();
	const [searchTerm, setSearchTerm] = useState<string>('');
	const [showResults, setShowResults] = useState<boolean>(false);
	const { data: searchResults, refetch } = useSearchBooksQuery(
		{ searchTerm },
		{ skip: !searchTerm }
	);
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

	const HandleExitVendor = () => {
		setUserExit(!userExit);
		localStorage.setItem('isVendor', 'false');
		localStorage.setItem('isAdmin', 'false');
		localStorage.setItem('isAuth', 'false');
		localStorage.removeItem('token');
	};

	const handleBookClick = (id: number) => {
		navigate(`home/${id}`);
		setShowResults(false);
	};

	const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value;
		setSearchTerm(value);
		setShowResults(!!value);
		refetch();
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
								<div className={scss.searchResults}>
									<div className={scss.search}>
										<CustomGenreInput
											onChange={handleSearchChange}
											value={searchTerm}
											placeholder="Искать жанр, книги, авторов, издательства..."
										/>
									</div>
									<div>
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
									{isUser && (
										<div className={scss.user_drop}>
											<ul>
												<li onClick={() => navigate('/vendor/profile')}>
													Профиль
												</li>
												<hr />
												<li
													onClick={() => {
														HandleExitVendor();
														setIsUser(false);
													}}
												>
													Выйти
												</li>
											</ul>
										</div>
									)}
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
														navigate('/auth/login');
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
											title="Промокод применится ко всем вашим книгам"
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
													setIsModalOpen(false);
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
												value={promoCode}
												onChange={(e) => setPromoCode(e.target.value)}
											/>
										</div>
										<div className={scss.inputs}>
											<div className={scss.input_x_label}>
												<label>Дата начала</label>
												<input
													type="date"
													value={dateStart}
													onChange={(e) => setDateStart(e.target.value)}
												/>
											</div>
											<div className={scss.input_x_label}>
												<label>Дата завершения</label>
												<input
													type="date"
													value={dateEnd}
													onChange={(e) => setDateEnd(e.target.value)}
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
