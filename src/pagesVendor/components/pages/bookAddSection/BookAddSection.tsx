import scss from './BookAddSection.module.scss';
import {
	IconArrowBottom,
	IconBlackCircle,
	IconBlackSquare,
	IconDownIcon,
	IconSuccess,
	IconUpIcon,
	IconWhiteCircle,
	IconWhiteSquare
} from '@/src/assets/icons';
import { ChangeEvent, useEffect, useRef, useState } from 'react';
import CustomUserNameInput from '@/src/ui/customInpute/CustomUserNameInput';
import { Modal, message } from 'antd';
import CustomBasketButton from '@/src/ui/customButton/CustomBasketButton';
import CustomAudioDownloadInput from '@/src/ui/customAudioInput/CustomAudioDownloadInput';
import CustomPDFDownloadInput from '@/src/ui/customPDFInput/CustomPDFDownloadInput';
import { Link, useNavigate } from 'react-router-dom';
import {
	FieldErrors,
	FieldValues,
	SubmitHandler,
	useForm
} from 'react-hook-form';
import {
	useAddBookVendorMutation,
	usePostFileMutation
} from '@/src/redux/api/addBook';
import CustomAddPhoto from '@/src/ui/customAddPhoto/CustomAddPhoto';
import CustomAudioFragmentInput from '@/src/ui/customAudioInput/CustomAudioFragmenInput';
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

type FormValues = {
	title: string;
	authorsFullName: string;
	publishingHouse: string;
};

const BookAddSection = () => {
	const navigate = useNavigate();
	const [nameBook, setNameBook] = useState('');
	const [clickRadio, setClickRadio] = useState(true);
	const [audioBook, setAudioBook] = useState(false);
	const [ebook, setEBook] = useState(false);
	const [modal, setModal] = useState(false);
	const [delPhoto, setDelPhoto] = useState(false);
	const [iconjenre, setIconJenre] = useState(false);
	const [firstPhoto, setFirstPhoto] = useState<string>('');
	const [secondPhoto, setSecondPhoto] = useState<string>('');
	const [audioFileFragment, setAudioFileFragment] = useState('');
	const [audioFile, setAudioFile] = useState('');
	const [duration, setDuration] = useState(0);
	const [hourValue, setHourValue] = useState<number>(0);
	const [minutsValue, setMinutsValue] = useState<number>(0);
	const [secondValue, setSecondValue] = useState<number>(0);
	const [durationFragment, setDurationFragment] = useState<number>(0);
	const [pdfFileName, setPdfFileName] = useState<File | null>();
	const [postFile] = usePostFileMutation();
	const [selectLanguage, setSelectLanguage] = useState(false);
	const [languageSeleced, setLanguageSelected] = useState<
		TypeLanguage | undefined
	>({
		id: 2,
		language: 'RUSSIAN',
		languageName: 'Русский язык'
	});

	const [bookType, setBookType] = useState('PAPER_BOOK');

	const [clickBestseller, setClickBestseller] = useState(false);

	const [selectDataJenre, setSelectDataJenre] = useState<TypeJenre>();

	const [description, setDescription] = useState('');
	const [isFileUploadedFragment, setIsFileUploadedFragment] = useState(false);
	const [isFileUploaded, setIsFileUploaded] = useState(false);
	const [isPdfFileUploaded, setIsPdfFileUploaded] = useState(false);
	const [messageApi, contextHolder] = message.useMessage();

	const [pdfFile, setPdfFile] = useState(' ');
	const {
		register,
		handleSubmit,
		reset,
		formState: { errors }
	} = useForm();
	const errorRef = useRef<FieldErrors<FormValues>>(errors);
	const [fragment, setFragment] = useState(' ');

	const [addBookVendor] = useAddBookVendorMutation();
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
		setNameBook(book.title);

		const newUpDateBook = {
			imageUrls: [firstPhoto, secondPhoto],
			fragmentAudUrl: audioFileFragment,
			fullAudUrl: audioFile,
			pdfUrl: pdfFile,
			duration: duration,
			title: book.title,
			authorsFullName: book.authorsFullName,
			publishingHouse: book.publishingHouse !== '' ? book.publishingHouse : ' ',
			description: description,
			fragment: book.fragment,
			publishedYear: book.publishedYear,
			volume: book.volume !== ' ' ? book.volume : 0,
			amountOfBook: book.amountOfBook,
			discount: book.discount !== '' ? book.discount : 0,
			price: book.price,
			bestseller: clickBestseller,
			durationFragment: durationFragment
		};
		const result = (await addBookVendor({
			newUpDateBook,
			genre: selectDataJenre!.englishName,
			language: languageSeleced!.language,
			bookType: bookType
		})) as ADDBOOKVENDOR.AddBookVendorResponse;

		if (result.error) {
			if (result.error.status === 400) {
				if (result.error.data.authorsFullName) {
					messageApi.open({
						type: 'warning',
						content: result.error.data.authorsFullName
					});
				} else if (result.error.data.publishedYear) {
					messageApi.open({
						type: 'warning',
						content: result.error.data.publishedYear
					});
				} else if (result.error.data.price) {
					messageApi.open({
						type: 'warning',
						content: result.error.data.price
					});
				}
			}
		} else {
			if (result.data?.httpStatus === 'OK') {
				setModal(true);
				reset();
				setClickBestseller(false);
				setFragment('');
				setDescription('');
				setPdfFile('');
				setAudioFile('');
				setAudioFileFragment('');
				setFirstPhoto('');
				setSecondPhoto('');
				setDelPhoto(false);
				setPdfFileName(null);
			}
		}
	};

	const handleFileChange = async (file: File) => {
		setPdfFileName(file);
		const result = await postFile(file);
		if ('data' in result) {
			const status = result.data!.httpStatus;
			if (status === 'OK') {
				setPdfFile(result.data!.message);
				setIsPdfFileUploaded(true);
			}
		}
	};
	const handlePhotoChange = async (e: ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files ? e.target.files[0] : null;
		const result = await postFile(file!);
		if ('data' in result) {
			if (result.data!.httpStatus === 'OK') {
				setFirstPhoto(result.data!.message);
			}
		}
	};
	const handleSecondPhotoChange = async (e: ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files ? e.target.files[0] : null;
		const result = await postFile(file!);
		console.log(result);
		if ('data' in result) {
			if (result.data!.httpStatus === 'OK') {
				setSecondPhoto(result.data!.message);
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
		setLanguageSelected(findData);
	};

	const handleAudioFragmetChange = async (e: File) => {
		const result = await postFile(e);
		if ('data' in result) {
			if (result.data!.httpStatus === 'OK') {
				setAudioFileFragment(result.data!.message);
				setIsFileUploadedFragment(true);
			}
		}
	};

	const handleAudioChange = async (e: File) => {
		const result = await postFile(e);
		if ('data' in result) {
			if (result.data!.httpStatus === 'OK') {
				setAudioFile(result.data!.message);
				setIsFileUploaded(true);
			}
		}
	};

	const convertSecondsToHoursMinutesAndSeconds = (totalSeconds: number) => {
		const hours = Math.floor(totalSeconds / 3600);
		totalSeconds %= 3600;
		const minutes = Math.floor(totalSeconds / 60);
		const seconds = totalSeconds % 60;

		const hourN = hours.toFixed();
		const minutsN = minutes.toFixed();
		const secondsN = seconds.toFixed();

		setHourValue(Number(hourN));
		setMinutsValue(Number(minutsN));
		setSecondValue(Number(secondsN));
	};
	if (modal === true) {
		setTimeout(() => {
			setModal(false);
			navigate('/vendor/home');
		}, 3000);
	}

	useEffect(() => {
		convertSecondsToHoursMinutesAndSeconds(durationFragment);
	}, [durationFragment]);

	return (
		<section className={scss.AddBookSection}>
			<div className={scss.container}>
				{contextHolder}
				<form onSubmit={handleSubmit(onSubmit)} className={scss.content}>
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
										editPhoto=""
										initialState=""
										onChange={(e) => handlePhotoChange(e)}
										label="Главное фото"
										setDelPhoto={setDelPhoto}
										delPhoto={delPhoto}
									/>
									<p>Главное фото</p>
								</div>
								<div className={scss.card_second}>
									<CustomAddPhoto
										editPhoto=""
										initialState=""
										onChange={(e) => handleSecondPhotoChange(e)}
										label="Фото 2"
										delPhoto={delPhoto}
										setDelPhoto={setDelPhoto}
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
												refError={errorRef}
												validateError={errors.title}
												placeholder="Напишите полное название книги"
												registerName="title"
												register={register}
											/>
										</label>
										<label>
											ФИО автора
											<CustomUserNameInput
												refError={errorRef}
												placeholder="Напишите ФИО автора"
												registerName="authorsFullName"
												register={register}
												validateError={errors.authorsFullName}
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
														<div
															className={
																iconjenre ? scss.arrow_bottom : scss.arrow_top
															}
														>
															<IconArrowBottom />
														</div>
														<></>
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
												refError={errorRef}
												validateError={errors.publishingHouse}
												placeholder="Напишите название издательства"
												registerName="publishingHouse"
												register={register}
											/>
										</label>
										<label>
											О книге
											<textarea
												className={
													errors.description ? scss.textarea_error : ''
												}
												rows={636}
												cols={264}
												required={true}
												maxLength={1234}
												placeholder="Напишите о книге"
												{...register('description', {
													required: true,
													minLength: {
														value: 20,
														message: 'Минимальная длина описании 20 слов'
													},
													onChange(e) {
														setDescription(e.target.value);
													}
												})}
											/>
											<div className={scss.deg_info}>
												<p>
													{errors.description &&
														errors.description.message === 'string' &&
														errors.description.message}
												</p>
												<p>{description.length} / 1234</p>
											</div>
										</label>
										<label>
											Фрагмент книги{' '}
											<textarea
												className={errors.fragment ? scss.textarea_error : ''}
												rows={636}
												required={true}
												cols={264}
												maxLength={1234}
												placeholder="Напишите фрагмент книги"
												{...register('fragment', {
													required: true,
													minLength: {
														value: 20,
														message: 'Минимальная длина фрагмента 20 слов'
													},
													onChange(event) {
														setFragment(event.target.value);
													}
												})}
											/>
											<div className={scss.deg_info}>
												<p>
													{' '}
													{errors.fragment &&
														errors.fragment.message === 'string' &&
														errors.fragment.message}
												</p>
												<p>{fragment.length} / 1234</p>
											</div>
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
												<div
													className={
														errors.volume ? scss.input_error : scss.input
													}
												>
													<span>стр.</span>
													<input
														required={true}
														minLength={2}
														type="text"
														{...register('volume', {
															required: true,
															minLength: 4,
															validate: (value) =>
																!isNaN(value) || 'Введите только числа'
														})}
													/>
												</div>
											</label>
											<label>
												Стоимость
												<div
													className={
														errors.price ? scss.input_error : scss.input
													}
												>
													<span>сом</span>
													<input
														required={true}
														minLength={3}
														type="text"
														{...register('price', {
															required: true,
															minLength: 3,
															validate: (value) =>
																!isNaN(value) || 'Введите только числа'
														})}
													/>
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
												<div
													className={
														errors.publishedYear ? scss.input_error : scss.input
													}
												>
													<span>гг</span>
													<input
														required={true}
														minLength={4}
														maxLength={4}
														type="text"
														{...register('publishedYear', {
															required: true,
															minLength: 4,
															validate: (value) =>
																!isNaN(value) || 'Введите только числа'
														})}
													/>
												</div>
											</label>
											<label>
												Кол-во книг
												<div
													className={
														errors.amountOfBook ? scss.input_error : scss.input
													}
												>
													<span>шт.</span>
													<input
														type="text"
														required={true}
														minLength={1}
														{...register('amountOfBook', {
															required: true,
															minLength: 1,
															validate: (value) =>
																!isNaN(value) || 'Введите только числа'
														})}
													/>
												</div>
											</label>
											<label>
												Скидка
												<div
													className={
														errors.discount ? scss.input_error : scss.input
													}
												>
													<span>%</span>
													<input
														type="text"
														{...register('discount', {
															validate: (value) =>
																!isNaN(value) || 'Введите только числа'
														})}
													/>
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
											refError={errorRef}
											validateError={errors.title}
											placeholder="Напишите полное название книги"
											registerName="title"
											register={register}
										/>
									</label>
									<label>
										ФИО автора
										<CustomUserNameInput
											refError={errorRef}
											validateError={errors.authorsFullName}
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
													<div
														className={
															iconjenre ? scss.arrow_bottom : scss.arrow_top
														}
													>
														<IconArrowBottom />
													</div>
													<></>
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
										<div className={scss.deg_info}>
											<p>
												{errors.description &&
													errors.description.message === 'string' &&
													errors.description.message}
											</p>
											<p>{description.length} / 1234</p>
										</div>
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
											<div
												className={
													errors.publishedYear ? scss.input_error : scss.input
												}
											>
												<span>гг</span>
												<input
													type="text"
													required={true}
													minLength={4}
													maxLength={4}
													{...register('publishedYear', {
														required: true,
														minLength: 4,
														validate: (value) =>
															!isNaN(value) || 'Введите только числа'
													})}
												/>
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
											<div
												className={errors.price ? scss.input_error : scss.input}
											>
												<span>сом</span>
												<input
													required={true}
													minLength={3}
													type="text"
													{...register('price', {
														required: true,
														minLength: 3,
														validate: (value) =>
															!isNaN(value) || 'Введите только числа'
													})}
												/>
											</div>
										</label>
										<label>
											Скидка
											<div
												className={
													errors.discount ? scss.input_error : scss.input
												}
											>
												<span>%</span>
												<input
													type="text"
													{...register('discount', {
														validate: (value) =>
															!isNaN(value) || 'Введите только числа'
													})}
												/>
											</div>
										</label>
									</div>
									<div className={scss.box_last}>
										<label>
											Загрузите фрагмент аудиозаписи
											<div className={scss.audio_input}>
												<CustomAudioFragmentInput
													setDuration={setDurationFragment}
													isFileUploaded={isFileUploadedFragment}
													accept="audio/*"
													onChange={(e) => {
														handleAudioFragmetChange(e);
													}}
												/>
												<span>максимум 10 мин.</span>
											</div>
										</label>
										<label>
											Загрузите аудиозапись
											<div className={scss.audio_input}>
												<CustomAudioDownloadInput
													setDuration={setDuration}
													isFileUploaded={isFileUploaded}
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
						{ebook === true && clickRadio === false && audioBook === false ? (
							<>
								<div className={scss.inputs_content}>
									<div className={scss.left_inputs}>
										<label>
											Название книги
											<CustomUserNameInput
												refError={errorRef}
												validateError={errors.title}
												placeholder="Напишите полное название книги"
												registerName="title"
												register={register}
											/>
										</label>
										<label>
											ФИО автора
											<CustomUserNameInput
												refError={errorRef}
												validateError={errors.authorsFullName}
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
														<div
															className={
																iconjenre ? scss.arrow_bottom : scss.arrow_top
															}
														>
															<IconArrowBottom />
														</div>
														<></>
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
												refError={errorRef}
												validateError={errors.publishingHouse}
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
												{...register('description', {
													required: true,
													minLength: {
														value: 20,
														message: 'Минимальная длина описании 20 слов'
													},
													onChange(e) {
														setDescription(e.target.value);
													}
												})}
											/>
											<div className={scss.deg_info}>
												<p>
													{errors.description &&
														errors.description.message === 'string' &&
														errors.description.message}
												</p>
												<p>{description.length} / 1234</p>
											</div>
										</label>
										<label>
											Фрагмент книги
											<textarea
												rows={6}
												cols={40}
												maxLength={1234}
												placeholder="Напишите фрагмент книги"
												{...register('fragment', {
													required: true,
													minLength: {
														value: 20,
														message: 'Минимальная длина фрагмента 20 слов'
													},
													onChange(event) {
														setFragment(event.target.value);
													}
												})}
											/>
											<div className={scss.deg_info}>
												<p>
													{errors.fragment &&
														errors.fragment.message === 'string' &&
														errors.fragment.message}
												</p>
												<p>{fragment.length} / 1234</p>
											</div>
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
													<div
														className={
															errors.publishedYear
																? scss.input_error
																: scss.input
														}
													>
														<span>гг</span>
														<input
															type="text"
															required={true}
															maxLength={4}
															minLength={4}
															{...register('publishedYear', {
																required: true,
																minLength: 4,
																validate: (value) =>
																	!isNaN(value) || 'Введите только числа'
															})}
														/>
													</div>
												</label>
											</div>
											<div className={scss.box_second}>
												<label>
													Объем
													<div
														className={
															errors.volume ? scss.input_error : scss.input
														}
													>
														<span>стр.</span>
														<input
															type="text"
															required={true}
															minLength={2}
															{...register('volume', {
																required: true,
																minLength: 4,
																validate: (value) =>
																	!isNaN(value) || 'Введите только числа'
															})}
														/>
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
													<div
														className={
															errors.price ? scss.input_error : scss.input
														}
													>
														<span>сом</span>
														<input
															type="text"
															required={true}
															minLength={3}
															{...register('price', {
																required: true,
																minLength: 3,
																validate: (value) =>
																	!isNaN(value) || 'Введите только числа'
															})}
														/>
													</div>
												</label>
												<label>
													Скидка
													<div
														className={
															errors.discount ? scss.input_error : scss.input
														}
													>
														<span>%</span>
														<input
															type="text"
															{...register('discount', {
																validate: (value) =>
																	!isNaN(value) || 'Введите только числа'
															})}
														/>
													</div>
												</label>
											</div>
											<div className={scss.box_last}>
												<CustomPDFDownloadInput
													onChange={handleFileChange}
													accept="application/pdf"
													isFileUploaded={isPdfFileUploaded}
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
								children={'Отправить'}
								onClick={() => {}}
								nameClass={scss.button}
								type="submit"
							/>
							{<></>}
							<Modal
								open={modal}
								className={scss.modal_succes}
								footer={false}
								onCancel={() => setModal(false)}
							>
								<div className={scss.modal_container}>
									<IconSuccess />
									<div className={scss.info_text}>
										<p>
											<span>“{nameBook}”</span> <br />
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
