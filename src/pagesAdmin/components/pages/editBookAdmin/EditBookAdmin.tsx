/* eslint-disable react-hooks/exhaustive-deps */
import CustomUserNameInput from '@/src/ui/customInpute/CustomUserNameInput';
import scss from './EditBookAdmin.module.scss';
import { Modal, message } from 'antd';
import {
	IconBlackCircle,
	IconBlackSquare,
	IconDownIcon,
	IconSuccess,
	IconUpIcon,
	IconWhiteCircle,
	IconWhiteSquare
} from '@/src/assets/icons';
import CustomAddPhoto from '@/src/ui/customAddPhoto/CustomAddPhoto';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { ChangeEvent, useEffect, useState } from 'react';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import {
	useEditBookMutation,
	useEditPhotoUrlMutation,
	usePostFileMutation,
	useUpDateAudioFileMutation,
	useUpDateFragmentAudioFileMutation,
	useUpDatePdfMutation
} from '@/src/redux/api/addBook';
import CustomAudioDownloadInput from '@/src/ui/customAudioInput/CustomAudioDownloadInput';
import CustomBasketButton from '@/src/ui/customButton/CustomBasketButton';
import CustomPDFDownloadInput from '@/src/ui/customPDFInput/CustomPDFDownloadInput';
import { useGetBookByIdVendorQuery } from '@/src/redux/api/book';

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

const EditBook = () => {
	const paramsId = useParams();
	const bookId = Number(paramsId.id);
	const { data, isSuccess } = useGetBookByIdVendorQuery(bookId);

	const [peperBook, setPeperBook] = useState(true);
	const [audioBook, setAudioBook] = useState(false);
	const [ebook, setEBook] = useState(false);
	const [modal, setModal] = useState(false);
	const [delPhoto, setDelPhoto] = useState(false);
	const [iconjenre, setIconJenre] = useState(false);
	const [firstPhoto, setFirstPhoto] = useState<string>('');
	const [secondPhoto, setSecondPhoto] = useState<string>('');
	const [duration, setDuration] = useState(0);
	const [durationFragment, setDuratoinFragment] = useState(0);
	const [hourValue, setHourValue] = useState('');
	const [minutsValue, setMinutsValue] = useState('');
	const [secondValue, setSecondValue] = useState('');
	const [pdfFileName, setPdfFileName] = useState<File>();
	const [selectLanguage, setSelectLanguage] = useState(false);
	const [bookType, setBookType] = useState(data?.bookType);
	const [bookNmae, setBookName] = useState('');
	const [clickBestseller, setClickBestseller] = useState<boolean | undefined>(
		false
	);
	const [selectDataJenre, setSelectDataJenre] = useState<TypeJenre | null>();
	const [description, setDescription] = useState<string | undefined>('');
	const [pdfFile, setPdfFile] = useState(' ');
	const [fragment, setFragment] = useState<string | undefined>('');
	const [inintialImg, setInitialImg] = useState<string | undefined>('');
	const [initialImgSecond, setInitialImgSecond] = useState<string | undefined>(
		''
	);
	const [isUploadedPdfFile, setIsUploadedPdfFile] = useState(false);
	const navigate = useNavigate();

	const [updateAudioFile] = useUpDateAudioFileMutation();
	const [updateFragmentAudioFile] = useUpDateFragmentAudioFileMutation();
	const [updatePdfFile] = useUpDatePdfMutation();

	const [languageSeleced, setLanguageSelected] = useState<
		TypeLanguage | undefined
	>({
		id: 2,
		language: 'RUSSIAN',
		languageName: 'Русский язык'
	});

	const [postFile] = usePostFileMutation();
	const [updatePhoto] = useEditPhotoUrlMutation();

	const { register, handleSubmit, reset, getValues } = useForm();
	useEffect(() => {
		if (isSuccess && data) {
			reset({
				title: data.title || '',
				authorsFullName: data.authorsFullName || '',
				publishingHouse: data.publishingHouse || '',
				publishedYear: data.publishedYear || '',
				volume: data.volume || '',
				discount: data.discount || '',
				price: data.price || '',
				amountOfBook: data.amountOfBook || ''
			});
		}
	}, [isSuccess, data, reset]);

	const [addBookVendor] = useEditBookMutation();
	const [newPhoto, setNewPhoto] = useState('');
	const [secondNewPhoto, setSecondNewPhoto] = useState('');
	const [newAudioFile, setNewAudioFile] = useState('');
	const [fragmentNewAudioFile, setFragmentNewAudioFile] = useState('');
	const [messageApi, handleMessage] = message.useMessage();

	const [isFileUploadedFragment, setIsFileUploadedFragment] = useState(false);
	const [isFileUploaded, setIsFileUploaded] = useState(false);

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

	console.log(description);

	useEffect(() => {
		const EditPhotoFirst = async () => {
			if (newPhoto !== '') {
				const newData = {
					oldUrl: inintialImg,
					newUrl: newPhoto
				};
				const result = await updatePhoto({ newData, bookId });

				if ('data' in result) {
					if (result.data?.httpStatus === 'OK') {
						messageApi.open({
							type: 'success',
							content: result.data.message
						});
					} else {
						messageApi.open({
							type: 'warning',
							content: result.data?.error.data.message
						});
					}
				}
			}
		};
		EditPhotoFirst();
	}, [firstPhoto]);

	useEffect(() => {
		const EditPhotoSecond = async () => {
			if (secondNewPhoto !== '') {
				const newData = {
					oldUrl: initialImgSecond,
					newUrl: secondNewPhoto
				};
				const result = await updatePhoto({
					newData,
					bookId
				});

				if ('data' in result) {
					if (result.data?.httpStatus === 'OK') {
						messageApi.open({
							type: 'success',
							content: result.data.message
						});
					} else {
						messageApi.open({
							type: 'warning',
							content: result.data?.error.data.message
						});
					}
				}
			}
		};
		EditPhotoSecond();
	}, [secondNewPhoto]);

	const onSubmit: SubmitHandler<FieldValues> = async () => {
		const book = getValues();
		const newUpDateBook = {
			title: book.title,
			authorsFullName: book.authorsFullName,
			publishingHouse:
				book.publishingHouse !== '' || book.publishingHouse !== undefined
					? book.publishingHouse
					: ' ',
			description: description,
			fragment: fragment,
			publishedYear: book.publishedYear,
			volume: book.volume !== '' ? book.volume : 0,
			amountOfBook: book.amountOfBook === '' ? 0 : book.amountOfBook,
			discount: book.discount,
			price: book.price,
			bestseller: clickBestseller
		};

		const result = await addBookVendor({
			bookId,
			newUpDateBook,
			genre: selectDataJenre!.englishName,
			language: languageSeleced!.language,
			bookType: bookType!
		}).unwrap();

		if (result.httpStatus === 'OK') {
			setBookName(newUpDateBook.title);
			setModal(true);
			reset();
			setClickBestseller(false);
			setFragment('');
			setDescription('');
			setPdfFile('');
			setFirstPhoto('');
			setSecondPhoto('');
			setDelPhoto(false);
			setTimeout(() => {
				navigate('/vendor/home');
			}, 3000);
		}
	};

	const handleFileChange = async (file: File) => {
		setPdfFileName(file);
		const result = await postFile(file);
		if ('data' in result) {
			const status = result.data!.httpStatus;
			if (status === 'OK') {
				setPdfFile(result.data!.message);
				setIsUploadedPdfFile(true);
			}
		}
	};
	useEffect(() => {
		const editPdfFile = async () => {
			if (pdfFile !== '') {
				const result = await updatePdfFile({ pdfFile, id: bookId });
				console.log(result);
			}
		};
		editPdfFile();
	}, [pdfFile]);

	const handlePhotoChange = async (e: ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files ? e.target.files[0] : null;
		const result = await postFile(file!);
		if ('data' in result) {
			if (result.data!.httpStatus === 'OK') {
				setFirstPhoto(result.data.message);
				setNewPhoto(result.data.message);
			}
		}
	};

	const handleSecondPhotoChange = async (e: ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files ? e.target.files[0] : null;
		const result = await postFile(file!);
		if ('data' in result) {
			if (result.data!.httpStatus === 'OK') {
				setSecondPhoto(result.data!.message);
				setSecondNewPhoto(result.data?.message);
			}
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
		setLanguageSelected(findData!);
	};

	const handleAudioFragmetChange = async (e: File) => {
		const result = await postFile(e);
		if ('data' in result) {
			if (result.data!.httpStatus === 'OK') {
				setFragmentNewAudioFile(result.data.message);
				setIsFileUploadedFragment(true);
			}
		}
	};

	const handleAudioChange = async (e: File) => {
		const result = await postFile(e);
		if ('data' in result) {
			if (result.data!.httpStatus === 'OK') {
				setNewAudioFile(result.data.message);
				setIsFileUploaded(true);
			}
		}
	};
	const editAudioFile = async () => {
		if (newAudioFile !== '') {
			const newData = {
				audFullUrl: newAudioFile,
				duration: duration
			};
			await updateAudioFile({ newData, bookId });
		}
	};

	const editFragmentAudioFile = async () => {
		if (fragmentNewAudioFile !== '') {
			const newData = {
				audFullUrl: fragmentNewAudioFile,
				duration: durationFragment
			};
			await updateFragmentAudioFile({ newData, bookId });
		}
	};

	const convertSecondsToHoursMinutesAndSeconds = (totalSeconds: number) => {
		const hours = Math.floor(totalSeconds / 3600);
		totalSeconds %= 3600;
		const minutes = Math.floor(totalSeconds / 60);
		const seconds = totalSeconds % 60;
		setHourValue(hours.toFixed());
		setMinutsValue(minutes.toFixed());
		setSecondValue(seconds.toFixed());
	};

	useEffect(() => {
		if (data?.bookType === 'PAPER_BOOK') {
			setPeperBook(true);
			setAudioBook(false);
			setEBook(false);
		} else if (data?.bookType === 'AUDIO_BOOK') {
			setAudioBook(true);
			setPeperBook(false);
			setEBook(false);
		} else if (data?.bookType === 'ONLINE_BOOK') {
			setEBook(true);
			setAudioBook(false);
			setPeperBook(false);
		}
		const defaultLanguage = options.find((item) =>
			item.language === data?.language ? item.languageName : null
		);
		setLanguageSelected(defaultLanguage);
		const ganre = jenreData.find((item) =>
			item.englishName === data?.genre ? item.jenreName : null
		);

		setSelectDataJenre(ganre);
		setInitialImg(data?.imageUrlFirst);
		setInitialImgSecond(data?.imageUrlLast);
		setClickBestseller(data?.bestseller);
		setDescription(data?.description);
		setFragment(data?.fragment);
		if (modal === true) {
			setTimeout(() => {
				setModal(false);
			}, 3000);
		}
		editAudioFile();
		editFragmentAudioFile();

		convertSecondsToHoursMinutesAndSeconds(durationFragment);
	}, [data, firstPhoto, secondPhoto, modal, newAudioFile]);

	return (
		<section className={scss.EditBook}>
			<div className={scss.container}>
				<div className={scss.content}>
					{handleMessage}
					<div className={scss.links}>
						<Link
							to={'/vendor/home'}
							className={`${scss.link_to_home} ${location.pathname === '/vendor' ? scss.link_to_home_active : ''}`}
						>
							Главная
						</Link>
						/
						<Link
							to={'/vendor/addBook'}
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
										onChange={(e) => {
											e.preventDefault();
											e.stopPropagation();
											handlePhotoChange(e);
										}}
										label="Главное фото"
										initialState={inintialImg!}
										setDelPhoto={setDelPhoto}
										delPhoto={delPhoto}
										editPhoto={firstPhoto}
									/>
									<p>Главное фото</p>
								</div>
								<div className={scss.card_second}>
									<CustomAddPhoto
										onChange={(e) => handleSecondPhotoChange(e)}
										label="Фото 2"
										initialState={initialImgSecond!}
										delPhoto={delPhoto}
										setDelPhoto={setDelPhoto}
										editPhoto={secondPhoto}
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
					<form
						onSubmit={(e) => {
							e.preventDefault();
							e.stopPropagation();
							handleSubmit(onSubmit);
						}}
						className={scss.inputs_container}
					>
						<div className={scss.type_book}>
							<p>Тип</p>
							<div className={scss.types}>
								<label
									onClick={() => {
										setPeperBook(true);
										setAudioBook(false);
										setEBook(false);
										setBookType('');
										setBookType('PAPER_BOOK');
									}}
								>
									{peperBook ? (
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
										setAudioBook(true);
										setPeperBook(false);
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
										setEBook(true);
										setAudioBook(false);
										setPeperBook(false);
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

						{peperBook === true && audioBook === false && ebook === false ? (
							<>
								<div className={scss.inputs_content}>
									<div className={scss.left_inputs}>
										<label>
											Название книги
											<CustomUserNameInput
												refError={false}
												validateError={false}
												placeholder="Напишите полное название книги"
												registerName="title"
												register={register}
											/>
										</label>
										<label>
											ФИО автора
											<CustomUserNameInput
												refError={false}
												validateError={false}
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
													{selectDataJenre !== null ? (
														selectDataJenre?.jenreName
													) : (
														<p></p>
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
													{jenreData.map((jenre, index) => (
														<>
															<div
																key={index}
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
												refError={false}
												validateError={false}
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
												value={description}
												placeholder="Напишите о книге"
												onChange={(e) => setDescription(e.target.value)}
											/>
											<p>{description?.length} / 1234</p>
										</label>
										<label>
											Фрагмент книги
											<textarea
												rows={636}
												cols={264}
												maxLength={1234}
												value={fragment}
												placeholder="Напишите фрагмент книги"
												onChange={(e) => setFragment(e.target.value)}
											/>
											<p>{fragment?.length} / 1234</p>
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
						{audioBook && !ebook && !peperBook ? (
							<div className={scss.inputs_content}>
								<div className={scss.left_inputs}>
									<label>
										Название книги
										<CustomUserNameInput
											refError={false}
											validateError={false}
											placeholder="Напишите полное название книги"
											registerName="title"
											register={register}
										/>
									</label>
									<label>
										ФИО автора
										<CustomUserNameInput
											refError={false}
											validateError={false}
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
													<p>Литература, роман, стихи...</p>
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
											defaultValue={data?.description}
											placeholder="Напишите о книге"
											onChange={(e) => setDescription(e.target.value)}
										/>
										<p>{description?.length} / 1234</p>
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
													<input type="text" value={hourValue} readOnly />
												</div>
												<div className={scss.input}>
													<span>мин</span>
													<input type="text" value={minutsValue} readOnly />
												</div>
												<div className={scss.input}>
													<span>сек</span>
													<input type="text" value={secondValue} readOnly />
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
											Загрузите фрагмент аудиозаписи для редактировании
											<div className={scss.audio_input}>
												<CustomAudioDownloadInput
													isFileUploaded={isFileUploadedFragment}
													setDuration={setDuratoinFragment}
													accept="audio/*"
													onChange={(e) => {
														handleAudioFragmetChange(e);
													}}
												/>
												<span>максимум 10 мин.</span>
											</div>
										</label>
										<label>
											Загрузите аудиозапись для редактировании
											<div className={scss.audio_input}>
												<CustomAudioDownloadInput
													isFileUploaded={isFileUploaded}
													setDuration={setDuration}
													accept="audio/*"
													onChange={(e) => {
														handleAudioChange(e);
													}}
												/>
											</div>
										</label>
									</div>
								</div>
							</div>
						) : null}

						{/* !Электронная книга */}
						{ebook === true && peperBook === false && audioBook === false ? (
							<>
								<div className={scss.inputs_content}>
									<div className={scss.left_inputs}>
										<label>
											Название книги
											<CustomUserNameInput
												refError={false}
												validateError={false}
												placeholder="Напишите полное название книги"
												registerName="title"
												register={register}
											/>
										</label>
										<label>
											ФИО автора
											<CustomUserNameInput
												refError={false}
												validateError={false}
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
														<p>Литература, роман, стихи...</p>
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
												refError={false}
												validateError={false}
											/>
										</label>
										<label>
											О книге
											<textarea
												rows={6}
												cols={40}
												maxLength={1234}
												defaultValue={data?.description}
												placeholder="Напишите о книге"
												onChange={(e) => setDescription(e.target.value)}
											/>
											<p>{description?.length} / 1234</p>
										</label>
										<label>
											Фрагмент книги
											<textarea
												rows={6}
												cols={40}
												maxLength={1234}
												defaultValue={data?.fragment}
												placeholder="Напишите фрагмент книги"
												onChange={(e) => setFragment(e.target.value)}
											/>
											<p>{fragment?.length} / 1234</p>
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
														setModal(true);
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
													isFileUploaded={isUploadedPdfFile}
													accept="application/pdf"
												/>
												{pdfFileName && (
													<p>Выбранный файл: {pdfFileName.name}</p>
												)}
											</div>
										</div>
									</div>
								</div>
							</>
						) : null}

						<div className={scss.btn_content}>
							<CustomBasketButton
								children={'Редактировать'}
								onClick={onSubmit}
								nameClass={scss.button}
								type="submit"
							/>
							{<></>}
							<Modal
								className={scss.modal_succes}
								open={modal}
								footer={false}
								onCancel={() => setModal(false)}
							>
								<div className={scss.modal_container}>
									<IconSuccess />
									<div className={scss.info_text}>
										<p>
											<span>“{bookNmae}”</span> <br />
											успешно Редактировано!
										</p>
									</div>
								</div>
							</Modal>
						</div>
					</form>
				</div>
			</div>
		</section>
	);
};

export default EditBook;
