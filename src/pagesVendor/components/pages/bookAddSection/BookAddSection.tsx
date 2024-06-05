/* eslint-disable @typescript-eslint/no-explicit-any */
import scss from './BookAddSection.module.scss';
import {
	IconBlackCircle,
	IconBlackSquare,
	IconDownIcon,
	IconSuccess,
	IconUpIcon,
	IconWhiteCircle,
	IconWhiteSquare
} from '@/src/assets/icons';
import { ChangeEvent, useState } from 'react';
import CustomUserNameInput from '@/src/ui/customInpute/CustomUserNameInput';
import { Modal } from 'antd';
import CustomBasketButton from '@/src/ui/customButton/CustomBasketButton';
import CustomAudioDownloadInput from '@/src/ui/customAudioInput/CustomAudioDownloadInput';
import CustomPDFDownloadInput from '@/src/ui/customPDFInput/CustomPDFDownloadInput';
import { Link } from 'react-router-dom';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { useAddBookVendorMutation } from '@/src/redux/api/addBookVendor';
import CustomAddPhoto from '@/src/ui/customAddPhoto/CustomAddPhoto';
interface TypeJenre {
	jenreId: number;
	jenreName: string;
	englishName: string;
	isCheked: boolean;
}

interface TypeLanguage {
	id: number;
	language: string;
	languageName: string;
}
interface PhotosState {
	main: File | null;
	second: File | null;
	third: File | null;
}

const BookAddSection = () => {
	const [clickRadio, setClickRadio] = useState(true);
	const [audioBook, setAudioBook] = useState(false);
	const [ebook, setEBook] = useState(false);
	const [modal, setModal] = useState(false);
	const [iconjenre, setIconJenre] = useState(false);
	const [testFile, setTestFile] = useState<string>();
	const [secondTest, setSecondTest] = useState<string>();

	const [selectLanguage, setSelectLanguage] = useState(false);

	const [languageSeleced, setLanguageSelected] = useState<
		TypeLanguage | undefined
	>({
		id: 2,
		language: 'RUSSIAN',
		languageName: 'Русский язык'
	});

	const [bookType, setBookType] = useState('');
	console.log(bookType);

	const [clickBestseller, setClickBestseller] = useState(false);

	const [selectDataJenre, setSelectDataJenre] = useState<TypeJenre>();

	const [description, setDescription] = useState('');

	const [pdfFile, setPdfFile] = useState<File | null>(null);
	console.log(pdfFile);
	const { register, handleSubmit, reset } = useForm();

	const [fragment, setFragment] = useState('');

	const [addBookVendor] = useAddBookVendorMutation();

	const [photos, setPhotos] = useState([]);
	const song = JSON.stringify(photos);

	const jenreData = [
		{
			jenreId: 1,
			jenreName: 'ХУДОЖЕСТВЕННАЯ ЛИТЕРАТУРА',
			englishName: 'ARTISTIC_LITERATURE',
			isCheked: false
		},
		{
			jenreId: 2,
			jenreName: 'ОБРАЗОВАНИЕ',
			englishName: 'EDUCATION',
			isCheked: false
		},
		{
			jenreId: 3,
			jenreName: 'КНИГИ ДЛЯ ДЕТЕЙ',
			englishName: 'BOOKS_FOR_CHILDREN',
			isCheked: false
		},
		{
			jenreId: 4,
			jenreName: 'НАУКА И ТЕХНОЛОГИЯ БРАЗОВАНИЕ',
			englishName: 'SCIENCE_AND_TECHNOLOGY',
			isCheked: false
		},
		{
			jenreId: 5,
			jenreName: 'СООБЩЕСТВО',
			englishName: 'COMMUNITY',
			isCheked: false
		},
		{
			jenreId: 6,
			jenreName: 'БИЗНЕС ЛИТЕРАТУРА',
			englishName: 'BUSINESS_LITERATURE',
			isCheked: false
		},
		{
			jenreId: 7,
			jenreName: 'КРАСОТА ЗДОРОВЬЕ СПОРТ',
			englishName: 'BEAUTY_HEALTH_SPORT',
			isCheked: false
		},
		{
			jenreId: 8,
			jenreName: 'УВЛЕЧЕНИЯ',
			englishName: 'HOBBIES',
			isCheked: false
		},
		{
			jenreId: 9,
			jenreName: 'ПСИХОЛОГИЯ',
			englishName: 'PSYCHOLOGY',
			isCheked: false
		}
	];
	const options = [
		{
			id: 1,
			language: 'KYRGYZ',
			languageName: 'Кыргызский язык'
		},
		{
			id: 2,
			language: 'RUSSIAN',
			languageName: 'Русский язык'
		},
		{
			id: 3,
			language: 'ENGLISH',
			languageName: 'Английский язык'
		}
	];

	const onSubmit: SubmitHandler<FieldValues> = async (book) => {
		console.log(book);

		// const newBook = {
		// 	multipartFiles: [testFile, secondTest],
		// 	title: book.title,
		// 	authorsFullName: book.authorsFullName,
		// 	publishingHouse: book.publishingHouse,
		// 	description: description,
		// 	fragment: fragment,
		// 	publishedYear: book.publishedYear,
		// 	volume: book.volume,
		// 	amountOfBook: book.amountOfBook,
		// 	discount: book.discount,
		// 	price: book.price,
		// 	bestseller: clickBestseller
		// };
		const newUpDateBook = {
			imageUrls: [song],
			fragmentAudUrl: '',
			fullAudUrl: '',
			pdfUrl: '',
			duration: 0,
			title: book.title,
			authorsFullName: book.authorsFullName,
			publishingHouse: book.publishingHouse,
			description: description,
			fragment: fragment,
			publishedYear: book.publishedYear,
			volume: book.volume,
			amountOfBook: book.amountOfBook,
			discount: book.discount,
			price: book.price,
			bestseller: clickBestseller
		};
		console.log(newUpDateBook);

		await addBookVendor({
			newUpDateBook,
			genre: selectDataJenre?.englishName,
			language: languageSeleced?.language,
			bookType: bookType
		}).unwrap();
		reset();
	};

	const handleFileChange = (file: File) => {
		setPdfFile(file);
	};

	const handlePhotoChange = (
		e: ChangeEvent<HTMLInputElement>,
		position: keyof PhotosState
	) => {
		const file = e.target.files ? e.target.files[0] : null;
		setTestFile(file);
		if (file) {
			const photoURL = URL.createObjectURL(file);
			setPhotos((prevPhotos) => ({
				...prevPhotos,
				[position]: photoURL
			}));
			// setTestFile(photoURL);
		}
	};
	const handleSecondPhotoChange = (
		e: ChangeEvent<HTMLInputElement>,
		position: keyof PhotosState
	) => {
		const file = e.target.files ? e.target.files[0] : null;

		if (file) {
			const photoURL = URL.createObjectURL(file);
			setSecondTest(file);
			setPhotos((prevPhotos) => ({
				...prevPhotos,
				[position]: photoURL
			}));

			// setSecondTest(photoURL);
		}
	};

	const selectedJenres = (id: number) => {
		const findData = jenreData.find((item) =>
			item.jenreId === id ? item.jenreName : null
		);
		setSelectDataJenre(findData);
	};

	const selectedOptionLanguage = (id: number) => {
		const findData = options.find((item) =>
			item.id === id ? item : item.id === 3 ? item.languageName : null
		);
		setLanguageSelected(findData);
	};

	return (
		<section className={scss.AddBookSection}>
			<div className={scss.container}>
				<form onSubmit={handleSubmit(onSubmit)} className={scss.content}>
					<div className={scss.links}>
						<Link
							to={'/vendor'}
							className={`${scss.link_to_home} ${location.pathname === '/vendor' ? scss.link_to_home_active : ''}`}
						>
							Главная
						</Link>
						/
						<Link
							to={'vendor/addBook'}
							className={`${scss.link_to_addBook} ${location.pathname === '/addBook' ? scss.link_to_addBook_active : ''}`}
						>
							Добавить книгу
						</Link>
					</div>
					<div className={scss.add_photo_form}>
						<div className={scss.title_form}>
							<p>
								Загрузите 3 фото <span>*</span>
							</p>
						</div>
						<div className={scss.photos_container}>
							<div className={scss.container_add_photo}>
								<div className={scss.card_first}>
									<CustomAddPhoto
										onChange={(e) => handlePhotoChange(e, 'main')}
										label="Главное фото"
									/>
								</div>
								<div className={scss.card_second}>
									<CustomAddPhoto
										onChange={(e) => handleSecondPhotoChange(e, 'second')}
										label="Фото 2"
									/>

									<p>2</p>
								</div>
							</div>
							<div className={scss.warning_card}>
								<div className={scss.warning_title}>
									<p>
										Публикации с качественными фото получают больше откликов!
									</p>
								</div>
								<div className={scss.warning_txt}>
									<h2>Фотографии должны быть:</h2>
									<ul>
										<li>
											<p>
												Фон должен быть нейтральным, без теней, рисунков,
												посторонних объектов или засветов
											</p>
										</li>
										<li>
											<p>Фото обязательно должно быть цветным</p>
										</li>
										<li>
											<span>Фото</span>
										</li>
									</ul>
								</div>
							</div>
						</div>
					</div>
					<div className={scss.inputs_container}>
						<div className={scss.type_book}>
							<p>Тип</p>
							<div className={scss.types}>
								<label
									onClick={() => {
										setClickRadio(true);
										setAudioBook(false);
										setEBook(false);
										setBookType('');
										setBookType('PAPER_BOOK');
									}}
								>
									{clickRadio ? (
										<>
											<IconBlackCircle />
										</>
									) : (
										<>
											<IconWhiteCircle />
										</>
									)}
									<p>Бумажная</p>
								</label>
								<label
									onClick={() => {
										setAudioBook(!audioBook);
										setClickRadio(false);
										setEBook(false);
										setBookType('');
										setBookType('AUDIO_BOOK');
									}}
								>
									{audioBook ? (
										<>
											<IconBlackCircle />
										</>
									) : (
										<>
											<IconWhiteCircle />
										</>
									)}
									<p>Аудиокнига</p>
								</label>
								<label
									onClick={() => {
										setEBook(!ebook);
										setAudioBook(false);
										setClickRadio(false);
										setBookType('');
										setBookType('ONLINE_BOOK');
									}}
								>
									{ebook ? (
										<>
											<IconBlackCircle />
										</>
									) : (
										<>
											<IconWhiteCircle />
										</>
									)}
									<p>Электронная книга</p>
								</label>
							</div>
						</div>
						{/*  !Бумажная*/}

						{clickRadio === true && audioBook === false && ebook === false ? (
							<>
								<div className={scss.inputs_content}>
									<div className={scss.left_inputs}>
										<label>
											Название книги
											<CustomUserNameInput
												placeholder="Напишите полное название книги"
												registerName="title"
												register={register}
											/>
										</label>
										<label>
											ФИО автора
											<CustomUserNameInput
												placeholder="Напишите ФИО автора"
												registerName="authorsFullName"
												register={register}
											/>
										</label>
										<label>
											Выберите жанр
											<div
												className={scss.jenre_select}
												onClick={() => {
													setIconJenre(!iconjenre);
												}}
											>
												<p className={iconjenre ? scss.click : scss.un_ulick}>
													{selectDataJenre ? (
														selectDataJenre.jenreName
													) : (
														<>Литература, роман, стихи...</>
													)}
												</p>
												{
													<div className={scss.icon_arrow}>
														{iconjenre ? (
															<>
																<IconUpIcon />
															</>
														) : (
															<>
																<IconDownIcon />
															</>
														)}
													</div>
												}
												<div
													className={
														iconjenre ? scss.oprions_jenre : scss.close_jenre
													}
												>
													{jenreData.map((jenre) => (
														<>
															<div
																key={jenre.jenreId}
																className={scss.option}
																onClick={() => {
																	selectedJenres(jenre.jenreId);
																}}
															>
																<p>{jenre.jenreName}</p>
															</div>
														</>
													))}
												</div>
											</div>
										</label>
										<label>
											Издательство
											<CustomUserNameInput
												placeholder="Напишите название издательства"
												registerName="publishingHouse"
												register={register}
											/>
										</label>
										{}
										<label>
											О книге
											<textarea
												rows={636}
												cols={264}
												maxLength={1234}
												placeholder="Напишите о книге"
												onChange={(e) => setDescription(e.target.value)}
											/>
											<p>{description.length} / 1234</p>
										</label>
										<label>
											Фрагмент книги
											<textarea
												rows={636}
												cols={264}
												maxLength={1234}
												placeholder="Напишите фрагмент книги"
												onChange={(e) => setFragment(e.target.value)}
											/>
											<p>{fragment.length} / 1234</p>
										</label>
									</div>
									<div className={scss.right_inputs}>
										<div className={scss.left_i}>
											<label>
												<p className={scss.language}>Язык</p>
												<div
													onClick={() => {
														setSelectLanguage(!selectLanguage);
													}}
													className={scss.language_content}
												>
													<p>{languageSeleced?.languageName}</p>
													{selectLanguage ? (
														<div className={scss.icon_language}>
															<IconUpIcon />
														</div>
													) : (
														<div className={scss.icon_language}>
															<IconDownIcon />
														</div>
													)}
													<div
														className={
															selectLanguage
																? scss.options_container
																: scss.close_container
														}
													>
														{options.map((item) => (
															<>
																<div
																	onClick={() => {
																		if (selectLanguage) {
																			setLanguageSelected(undefined);
																			selectedOptionLanguage(item.id);
																		}
																	}}
																	key={item.id}
																	className={scss.option_language}
																>
																	<p>{item.languageName}</p>
																</div>
															</>
														))}
													</div>
												</div>
											</label>
											<label>
												Объем
												<div className={scss.input}>
													<span>стр.</span>
													<input type="text" {...register('volume')} />
												</div>
											</label>
											<label>
												Стоимость
												<div className={scss.input}>
													<span>сом</span>
													<input type="text" {...register('price')} />
												</div>
											</label>
											<label>
												<div
													onClick={() => {
														setClickBestseller(!clickBestseller);
													}}
													className={scss.checkbox}
												>
													{clickBestseller ? (
														<>
															<IconBlackSquare />
														</>
													) : (
														<>
															<IconWhiteSquare />
														</>
													)}
													<p>Бестселлер</p>
												</div>
											</label>
										</div>
										<div className={scss.right_i}>
											<label>
												Год выпуска
												<div className={scss.input}>
													<span>гг</span>
													<input type="text" {...register('publishedYear')} />
												</div>
											</label>
											<label>
												Кол-во книг
												<div className={scss.input}>
													<span>шт.</span>

													<input type="text" {...register('amountOfBook')} />
												</div>
											</label>
											<label>
												Скидка
												<div className={scss.input}>
													<span>%</span>
													<input type="text" {...register('discount')} />
												</div>
											</label>
										</div>
									</div>
								</div>
							</>
						) : null}

						{/* ! Аудиокнига */}
						{audioBook && !ebook && !clickRadio ? (
							<div className={scss.inputs_content}>
								<div className={scss.left_inputs}>
									<label>
										Название книги
										<CustomUserNameInput
											placeholder="Напишите полное название книги"
											registerName="title"
											register={register}
										/>
									</label>
									<label>
										ФИО автора
										<CustomUserNameInput
											placeholder="Напишите ФИО автора"
											registerName="authorsFullName"
											register={register}
										/>
									</label>
									<label>
										Выберите жанр
										<div
											className={scss.jenre_select}
											onClick={() => {
												setIconJenre(!iconjenre);
											}}
										>
											<p className={iconjenre ? scss.click : scss.un_ulick}>
												{selectDataJenre ? (
													selectDataJenre.jenreName
												) : (
													<>Литература, роман, стихи...</>
												)}
											</p>
											{
												<div className={scss.icon_arrow}>
													{iconjenre ? (
														<>
															<IconUpIcon />
														</>
													) : (
														<>
															<IconDownIcon />
														</>
													)}
												</div>
											}
											<div
												className={
													iconjenre ? scss.oprions_jenre : scss.close_jenre
												}
											>
												{jenreData.map((jenre) => (
													<>
														<div
															key={jenre.jenreId}
															className={scss.option}
															onClick={() => {
																selectedJenres(jenre.jenreId);
															}}
														>
															<p>{jenre.jenreName}</p>
														</div>
													</>
												))}
											</div>
										</div>
									</label>
									<label>
										О книге
										<textarea
											rows={4}
											maxLength={1234}
											placeholder="Напишите о книге"
											onChange={(e) => setDescription(e.target.value)}
										/>
										<p>{description.length} / 1234</p>
									</label>
								</div>
								<div className={`${scss.right_inputs} ${scss.audio_inputs}`}>
									<div className={scss.box_first}>
										<label>
											<p className={scss.language}>Язык</p>
											<div
												onClick={() => {
													setSelectLanguage(!selectLanguage);
												}}
												className={scss.language_content}
											>
												<p>{languageSeleced?.languageName}</p>
												{selectLanguage ? (
													<div className={scss.icon_language}>
														<IconUpIcon />
													</div>
												) : (
													<div className={scss.icon_language}>
														<IconDownIcon />
													</div>
												)}
												<div
													className={
														selectLanguage
															? scss.options_container
															: scss.close_container
													}
												>
													{options.map((item) => (
														<>
															<div
																onClick={() => {
																	if (selectLanguage) {
																		setLanguageSelected(undefined);
																		selectedOptionLanguage(item.id);
																	}
																}}
																key={item.id}
																className={scss.option_language}
															>
																<p>{item.languageName}</p>
															</div>
														</>
													))}
												</div>
											</div>
										</label>
										<label>
											Год выпуска
											<div className={scss.input}>
												<span>гг</span>
												<input type="text" {...register('publishedYear')} />
											</div>
										</label>
									</div>
									<div className={scss.box_second}>
										<label>
											Длительность
											<div className={scss.duration}>
												<div className={scss.input}>
													<span>ч</span>
													<input type="text" {...register('durationHours')} />
												</div>
												<div className={scss.input}>
													<span>мин</span>
													<input type="text" {...register('durationMinutes')} />
												</div>
												<div className={scss.input}>
													<span>сек</span>
													<input type="text" {...register('durationSeconds')} />
												</div>
											</div>
										</label>
									</div>
									<div className={scss.checkbox_content}>
										<label
											onClick={() => {
												setClickBestseller(!clickBestseller);
											}}
										>
											<div className={scss.checkbox}>
												{clickBestseller ? (
													<IconBlackSquare />
												) : (
													<IconWhiteSquare />
												)}
												<p>Бестселлер</p>
											</div>
										</label>
									</div>
									<div className={scss.box_three}>
										<label>
											Стоимость
											<div className={scss.input}>
												<span>сом</span>
												<input type="text" {...register('price')} />
											</div>
										</label>
										<label>
											Скидка
											<div className={scss.input}>
												<span>%</span>
												<input type="text" {...register('discount')} />
											</div>
										</label>
									</div>
									<div className={scss.box_last}>
										<label>
											Загрузите фрагмент аудиозаписи
											<div className={scss.audio_input}>
												<CustomAudioDownloadInput
													accept="audio/*"
													onChange={() => {}}
												/>
												<span>максимум 10 мин.</span>
											</div>
										</label>
										<label>
											Загрузите аудиозапись
											<div className={scss.audio_input}>
												<CustomAudioDownloadInput
													accept="audio/*"
													onChange={() => {}}
												/>
											</div>
										</label>
									</div>
								</div>
							</div>
						) : null}

						{/* !Электронная книга */}
						{ebook === true && clickRadio === false && audioBook === false ? (
							<>
								<div className={scss.inputs_content}>
									<div className={scss.left_inputs}>
										<label>
											Название книги
											<CustomUserNameInput
												placeholder="Напишите полное название книги"
												registerName="title"
												register={register}
											/>
										</label>
										<label>
											ФИО автора
											<CustomUserNameInput
												placeholder="Напишите ФИО автора"
												registerName="authorsFullName"
												register={register}
											/>
										</label>
										<label>
											Выберите жанр
											<div
												className={scss.jenre_select}
												onClick={() => {
													setIconJenre(!iconjenre);
												}}
											>
												<p className={iconjenre ? scss.click : scss.un_ulick}>
													{selectDataJenre ? (
														selectDataJenre.jenreName
													) : (
														<>Литература, роман, стихи...</>
													)}
												</p>
												{
													<div className={scss.icon_arrow}>
														{iconjenre ? (
															<>
																<IconUpIcon />
															</>
														) : (
															<>
																<IconDownIcon />
															</>
														)}
													</div>
												}
												<div
													className={
														iconjenre ? scss.oprions_jenre : scss.close_jenre
													}
												>
													{jenreData.map((jenre) => (
														<>
															<div
																key={jenre.jenreId}
																className={scss.option}
																onClick={() => {
																	selectedJenres(jenre.jenreId);
																}}
															>
																<p>{jenre.jenreName}</p>
															</div>
														</>
													))}
												</div>
											</div>
										</label>
										<label>
											Издательство
											<CustomUserNameInput
												placeholder="Напишите название издательства"
												registerName="publishingHouse"
												register={register}
											/>
										</label>
										<label>
											О книге
											<textarea
												rows={6}
												cols={40}
												maxLength={1234}
												placeholder="Напишите о книге"
												onChange={(e) => setDescription(e.target.value)}
											/>
											<p>{description.length} / 1234</p>
										</label>
										<label>
											Фрагмент книги
											<textarea
												rows={6}
												cols={40}
												maxLength={1234}
												placeholder="Напишите фрагмент книги"
												onChange={(e) => setFragment(e.target.value)}
											/>
											<p>{fragment.length} / 1234</p>
										</label>
									</div>
									<div className={scss.right_inputs}>
										<div className={scss.ebook}>
											<div className={scss.box_first}>
												<label>
													<p className={scss.language}>Язык</p>
													<div
														onClick={() => {
															setSelectLanguage(!selectLanguage);
														}}
														className={scss.language_content}
													>
														<p>{languageSeleced?.languageName}</p>
														{selectLanguage ? (
															<div className={scss.icon_language}>
																<IconUpIcon />
															</div>
														) : (
															<div className={scss.icon_language}>
																<IconDownIcon />
															</div>
														)}
														<div
															className={
																selectLanguage
																	? scss.options_container
																	: scss.close_container
															}
														>
															{options.map((item) => (
																<>
																	<div
																		onClick={() => {
																			if (selectLanguage) {
																				setLanguageSelected(undefined);
																				selectedOptionLanguage(item.id);
																			}
																		}}
																		key={item.id}
																		className={scss.option_language}
																	>
																		<p>{item.languageName}</p>
																	</div>
																</>
															))}
														</div>
													</div>
												</label>
												<label>
													Год выпуска
													<div className={scss.input}>
														<span>гг</span>
														<input type="text" {...register('publishedYear')} />
													</div>
												</label>
											</div>
											<div className={scss.box_second}>
												<label>
													Объем
													<div className={scss.input}>
														<span>стр.</span>
														<input type="text" {...register('volume')} />
													</div>
												</label>
												<label
													onClick={() => {
														setClickBestseller(!clickBestseller);
													}}
												>
													<div className={scss.checkbox}>
														{clickBestseller ? (
															<IconBlackSquare />
														) : (
															<IconWhiteSquare />
														)}
														<p>Бестселлер</p>
													</div>
												</label>
											</div>
											<div className={scss.box_three}>
												<label>
													Стоимость
													<div className={scss.input}>
														<span>сом</span>
														<input type="text" {...register('price')} />
													</div>
												</label>
												<label>
													Скидка
													<div className={scss.input}>
														<span>%</span>
														<input type="text" {...register('discount')} />
													</div>
												</label>
											</div>
											<div className={scss.box_last}>
												<CustomPDFDownloadInput
													onChange={handleFileChange}
													accept="application/pdf"
												/>
												{pdfFile && <p>Выбранный файл: {pdfFile.name}</p>}
											</div>
										</div>
									</div>
								</div>
							</>
						) : null}

						<div className={scss.btn_content}>
							<CustomBasketButton
								nameClass={scss.button}
								type="submit"
								onClick={() => {
									// setModal(!modal);
								}}
							>
								Отправить
							</CustomBasketButton>
							{<></>}
							<Modal
								className={scss.modal_succes}
								open={modal}
								afterClose={() => {
									setTimeout(() => {
										setModal(false);
									}, 4000);
								}}
								footer={false}
								onCancel={() => setModal(false)}
							>
								<div className={scss.modal_container}>
									<IconSuccess />
									<div className={scss.info_text}>
										<p>
											<span>“Гарри Поттер и Тайная комната”</span> <br />
											успешно добавлен!
										</p>
									</div>
								</div>
							</Modal>
						</div>
					</div>
				</form>
			</div>
		</section>
	);
};

export default BookAddSection;
