/* eslint-disable @typescript-eslint/no-explicit-any */
import scss from './BookAddSection.module.scss';

import {
	IconBlackCircle,
	IconBlackSquare,
	IconSuccess,
	IconWhiteCircle,
	IconWhiteSquare
} from '@/src/assets/icons';
import { ChangeEvent, useState } from 'react';
import CustomUserNameInput from '@/src/ui/customInpute/CustomUserNameInput';
import { Modal, Select, Space } from 'antd';
import CustomBasketButton from '@/src/ui/customButton/CustomBasketButton';
import CustomAudioDownloadInput from '@/src/ui/customAudioInput/CustomAudioDownloadInput';
import CustomPDFDownloadInput from '@/src/ui/customPDFInput/CustomPDFDownloadInput';
import { Link } from 'react-router-dom';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { useAddBookVendorMutation } from '@/src/redux/api/addBookVendor';
import CustomAddPhoto from '@/src/ui/customAddPhoto/CustomAddPhoto';

const BookAddSection = () => {
	const [clickRadio, setClickRadio] = useState(false);
	const [audioBook, setAudioBook] = useState(false);
	const { register, handleSubmit, reset } = useForm();
	const [ebook, setEBook] = useState(false);
	const [modal, setModal] = useState(false);

	const [description, setDescription] = useState('');
	const [fragment, setFragment] = useState('');
	// console.log(value);
	const handleChange = (value: any) => {
		console.log(`selected ${value}`);
	};
	const options = [
		{
			label: 'China',
			value: 'china',
			emoji: '🇨🇳',
			desc: 'China (中国)'
		},
		{
			label: 'USA',
			value: 'usa',
			emoji: '🇺🇸',
			desc: 'USA (美国)'
		},
		{
			label: 'Japan',
			value: 'japan',
			emoji: '🇯🇵',
			desc: 'Japan (日本)'
		},
		{
			label: 'Korea',
			value: 'korea',
			emoji: '🇰🇷',
			desc: 'Korea (韩国)'
		}
	];

	interface PhotosState {
		main: File | null;
		second: File | null;
		third: File | null;
	}

	const [addBookVendor] = useAddBookVendorMutation();

	const onSubmit: SubmitHandler<FieldValues> = async (book) => {
		const newBook = {
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
			bestseller: book.bestseller
		};
		// await addBookVendor(newBook);
		reset();
		console.log(newBook);
	};

	const [pdfFile, setPdfFile] = useState<File | null>(null);
	console.log(pdfFile);

	const handleFileChange = (file: File) => {
		setPdfFile(file);
	};

	const [photos, setPhotos] = useState<PhotosState>({
		main: null,
		second: null,
		third: null
	});
	const handlePhotoChange = (
		e: ChangeEvent<HTMLInputElement>,
		position: keyof PhotosState
	) => {
		const file = e.target.files ? e.target.files[0] : null;
		setPhotos((prevPhotos) => ({
			...prevPhotos,
			[position]: file
		}));
	};
	console.log(photos);

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
							Добавить кригу
						</Link>
					</div>
					<div className={scss.add_photo_form}>
						<div className={scss.title_form}>
							<p>
								Загрузите 3 фото <span>*</span>
							</p>
						</div>
						<div className={scss.photos_container}>
							<div className={scss.card_first}>
								<CustomAddPhoto
									onChange={(e) => handlePhotoChange(e, 'main')}
									label="Главное фото"
								/>
							</div>
							<div className={scss.card_second}>
								<CustomAddPhoto
									onChange={(e) => handlePhotoChange(e, 'second')}
									label="Фото 2"
								/>

								<p>2</p>
							</div>
							<div className={scss.card_last}>
								<CustomAddPhoto
									onChange={(e) => handlePhotoChange(e, 'third')}
									label="Фото 3"
								/>

								<p>3</p>
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
										setClickRadio(!clickRadio);
										setAudioBook(false);
										setEBook(false);
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
						{clickRadio === false && audioBook === false && ebook === false ? (
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
											<CustomUserNameInput
												placeholder="Литература, роман, стихи..."
												registerName="title"
												register={register}
											/>
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
												<Select
													mode="multiple"
													style={{
														width: '100%'
													}}
													defaultValue={['china']}
													onChange={handleChange}
													options={options}
													optionRender={(option) => (
														<Space>
															<span role="img" aria-label={option.data.label}>
																{option.data.emoji}
															</span>
															{option.data.desc}
														</Space>
													)}
												/>
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
												<div className={scss.checkbox}>
													{clickRadio ? (
														<IconBlackSquare />
													) : (
														<IconWhiteSquare />
													)}
													<p>Бестселлер</p>
													<input
														type="checkbox"
														{...register('bestseller')}
														checked={clickRadio}
														onChange={() => setClickRadio(!clickRadio)}
														style={{ display: 'none' }}
													/>
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
											<CustomUserNameInput
												placeholder="Литература, роман, стихи..."
												registerName="genre"
												register={register}
											/>
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
												<Select
													mode="multiple"
													style={{
														width: '100%'
													}}
													defaultValue={['china']}
													onChange={handleChange}
													options={options}
													optionRender={(option) => (
														<Space>
															<span role="img" aria-label={option.data.label}>
																{option.data.emoji}
															</span>
															{option.data.desc}
														</Space>
													)}
												/>
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
											<label onClick={() => setClickRadio(!clickRadio)}>
												<div className={scss.checkbox}>
													{clickRadio ? (
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
										<CustomUserNameInput
											placeholder="Литература, роман, стихи..."
											registerName="genre"
											register={register}
										/>
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
											<Select
												placeholder="Русский язык"
												mode="multiple"
												style={{ width: '100%' }}
												defaultValue={['china']}
												onChange={handleChange}
												options={options}
												optionRender={(option) => (
													<Space>
														<span role="img" aria-label={option.data.label}>
															{option.data.emoji}
														</span>
														{option.data.desc}
													</Space>
												)}
											/>
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
										<label onClick={() => setClickRadio(!clickRadio)}>
											<div className={scss.checkbox}>
												{clickRadio ? <IconBlackSquare /> : <IconWhiteSquare />}
												<p>Бестселлер</p>
												<input
													type="checkbox"
													{...register('bestseller')}
													checked={clickRadio}
													onChange={() => setClickRadio(!clickRadio)}
													style={{ display: 'none' }}
												/>
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
											<CustomUserNameInput
												placeholder="Литература, роман, стихи..."
												registerName="genre"
												register={register}
											/>
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
													<Select
														mode="multiple"
														style={{ width: '100%' }}
														defaultValue={['china']}
														onChange={handleChange}
														options={options}
														optionRender={(option) => (
															<Space>
																<span role="img" aria-label={option.data.label}>
																	{option.data.emoji}
																</span>
																{option.data.desc}
															</Space>
														)}
													/>
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
														setClickRadio(!clickRadio);
														setAudioBook(false);
														setEBook(false);
													}}
												>
													<div className={scss.checkbox}>
														{clickRadio ? (
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
