/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import scss from './Section.module.scss';
import WhiteSquareIcon from '@/src/assets/icons/icon-whiteSquare';
import BlackSquareIcon from '@/src/assets/icons/icon-blackSquare';
import 'react-toastify/dist/ReactToastify.css';
import {
	IconArrowBottom,
	IconBlackCircle,
	IconBlackLike,
	IconBurgerMenu,
	IconDeleteX,
	IconHeadphoneOrange,
	IconUpIcon,
	IconWhiteCircle,
	IconWhiteLike
} from '@/src/assets/icons';
import CustomBasketButton from '@/src/ui/customButton/CustomBasketButton';
import { Slider, ConfigProvider } from 'antd';
import { useNavigate } from 'react-router-dom';
import { usePostSortBookMutation } from '@/src/redux/api/sort';
import { usePostFavoriteUnFavoriteMutation } from '@/src/redux/api/favorite';
import { ToastContainer, toast } from 'react-toastify';
import { SORT } from '@/src/redux/api/sort/types';
import { useAddBookToBasketMutation } from '@/src/redux/api/basket';

const SearchSection = () => {
	// 	const useDebounce = (value:number[], delay: number) => {
	// 		const [debouncedValue, setDebouncedValue] = useState(value);

	// 		useEffect(() => {
	// 			const handler = setTimeout(() => {
	// 				setDebouncedValue(value);
	// 			}, delay);

	// 			return () => {
	// 				clearTimeout(handler);
	// 			};
	// 		}, [value, delay]);

	// 		return debouncedValue;
	// 	};
	const [value, setValue] = useState<number[]>([100, 9990]);
	// const debouncedValue = useDebounce(value, 1000);

	const [isGenre, setIsGenre] = useState(false);
	const [isSort, setIsSort] = useState(false);
	const navigate = useNavigate();

	const [filterType, setFilterType] = useState(false);
	const [clickRadio, setClickRadio] = useState(false);

	const [priceGenre, setPriceGenre] = useState(false);

	const [language, setLanguage] = useState(false);

	const [menufilters, setMenuFilters] = useState(false);

	const [totalBooks, setTotalBooks] = useState<number>();
	const [page, setPage] = useState<number>(1);

	const [postFillter] = usePostSortBookMutation();
	const [addBookFavorite] = usePostFavoriteUnFavoriteMutation();
	const [addBookToBasket] = useAddBookToBasketMutation();
	const [jenreData, setJenreData] = useState([
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
			jenreName: 'НАУКА И ТЕХНОЛОГИЯ',
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
	]);
	const [typesBookData, setTypesBookData] = useState([
		{
			typeId: 1,
			typeName: 'Бумажная книга',
			englishName: 'PAPER_BOOK',
			isRadio: false
		},
		{
			typeId: 2,
			typeName: 'Аудиокнига',
			englishName: 'AUDIO_BOOK',
			isRadio: false
		},
		{
			typeId: 3,
			typeName: 'Электронная книга',
			englishName: 'ONLINE_BOOK',
			isRadio: false
		}
	]);

	const [selected, setSelected] = useState('');
	const [idSort, setIdSort] = useState<null | number>(null);
	const [sortData] = useState([
		{
			id: 1,
			nameSort: 'Все',
			englishSort: ' '
		},
		{
			id: 2,
			nameSort: 'Новинки',
			englishSort: 'new'
		},
		{
			id: 3,
			nameSort: 'Бестселлеры',
			englishSort: 'best-sellers'
		}
	]);

	// const filterBooks =
	// 	selected === 'Сортировать'
	// 		? sortData
	// 		: sortData.filter((book) => book.id === selected);

	const [dataBooks, setDataBooks] = useState<SORT.TypeDataBook[]>([]);

	const [languageBooksData, setLanguageBooksData] = useState([
		{
			languageId: 1,
			languege: 'Кыргызский язык',
			englishNameLanguage: 'KYRGYZ',
			isCheked: false
		},
		{
			languageId: 2,
			languege: 'Русский язык',
			englishNameLanguage: 'RUSSIAN',
			isCheked: false
		},
		{
			languageId: 3,
			languege: 'Английский язык',
			englishNameLanguage: 'ENGLISH',
			isCheked: false
		}
	]);

	const hanleAddBookFavorite = async (id: number) => {
		await addBookFavorite(id);
		handleChangeFillter();
	};

	const handleAddBookToBasket = async (id: number) => {
		const result = await addBookToBasket(id);
		if ('data' in result) {
			const { httpStatus } = result.data!;
			if (httpStatus === 'OK') {
				toast.success('Успешно добавили в корзину!', {
					position: 'top-right',
					autoClose: 5000,
					hideProgressBar: false,
					closeOnClick: true,
					pauseOnHover: true,
					draggable: true,
					progress: undefined,
					theme: 'light'
				});
			} else if (httpStatus === 'ALREADY_REPORTED') {
				toast('Вы уже добавили эту книгу в корзину!', {
					position: 'top-right',
					autoClose: 5000,
					hideProgressBar: false,
					closeOnClick: true,
					pauseOnHover: true,
					draggable: true,
					progress: undefined,
					theme: 'light'
				});
			}
		}
		handleChangeFillter();
	};

	const deleteIsFalseJenre = (id: number) => {
		setJenreData((prev) =>
			prev.map((item) =>
				item.jenreId === id ? { ...item, isCheked: false } : item
			)
		);
	};

	const deleteIsRadioType = (id: number) => {
		setTypesBookData((prev) =>
			prev.map((item) =>
				item.typeId === id ? { ...item, isRadio: false } : item
			)
		);
	};

	const deleteIsCheckLanguage = (id: number) => {
		setLanguageBooksData((prev) =>
			prev.map((item) =>
				item.languageId === id ? { ...item, isCheked: false } : item
			)
		);
	};

	const handleLanguageFilter = (id: number) => {
		setLanguageBooksData((prev) =>
			prev.map((item) =>
				item.languageId === id ? { ...item, isCheked: !item.isCheked } : item
			)
		);
	};

	const handleJenreCheckedFucn = (id: number) => {
		setJenreData((prev) =>
			prev.map((item) =>
				item.jenreId === id ? { ...item, isCheked: !item.isCheked } : item
			)
		);
	};

	const typeBooksFunc = (id: number) => {
		setTypesBookData((prev) =>
			prev.map((item) =>
				item.typeId === id ? { ...item, isRadio: !item.isRadio } : item
			)
		);
	};

	const handleChangeFillter = async () => {
		const filterJnereName = jenreData.filter((item) => {
			if (item.isCheked) {
				return item.isCheked;
			}
		});

		const englsihNameJenre = filterJnereName.map((item) => item.englishName);

		const sortCheckFilter = sortData.find((item) => {
			if (item.id === idSort) {
				return item.englishSort;
			}
		});
		const sortValue = sortCheckFilter?.englishSort
			? sortCheckFilter.englishSort
			: ' ';

		const typesFiltredIsRadio = typesBookData.filter((item) => {
			if (item.isRadio) {
				return item.isRadio;
			}
		});
		const typeEnglishName = typesFiltredIsRadio.map((item) => item.englishName);

		const languageFilter = languageBooksData.filter((item) => {
			if (item.isCheked) {
				return item.englishNameLanguage;
			}
		});

		const nameLanguageBook = languageFilter.map((item) => {
			return item.englishNameLanguage;
		});

		const newData = {
			genres: englsihNameJenre === []! ? null : [...englsihNameJenre],
			bookTypes: [...typeEnglishName],
			languages: [...nameLanguageBook],
			price: {
				from: value[0],
				to: value[1]
			},
			sort: sortValue
		};
		const pagination = {
			page: page,
			size: 12
		};

		const result = await postFillter({ newData, pagination });
		if ('data' in result) {
			const booksData = result.data!.books;
			setTotalBooks(result.data!.totalNumberOfBooks);
			setDataBooks(booksData);
		}
	};

	useEffect(() => {
		handleChangeFillter();
	}, [jenreData, idSort, typesBookData, languageBooksData, value, page]);

	return (
		<section className={scss.SearchSection}>
			<div className="container">
				<div className={scss.content}>
					<ToastContainer />
					<div className={scss.title_navigate}></div>
					<div className={scss.info_filtred}>
						<div className={scss.left_content}>
							<p>Найдены {totalBooks} книг</p>
						</div>
						<div className={scss.center_content}>
							{jenreData
								.filter((fill) => fill.isCheked)
								.map((item) => (
									<div className={scss.selcet_filter}>
										<p>{item.jenreName}</p>
										<button
											onClick={() => {
												deleteIsFalseJenre(item.jenreId);
											}}
										>
											<IconDeleteX />
										</button>
									</div>
								))}
							{typesBookData
								.filter((fill) => fill.isRadio)
								.map((item) => (
									<div className={scss.selcet_filter}>
										<p>{item.typeName}</p>
										<button
											onClick={() => {
												deleteIsRadioType(item.typeId);
											}}
										>
											<IconDeleteX />
										</button>
									</div>
								))}
							{languageBooksData
								.filter((fill) => fill.isCheked)
								.map((item) => (
									<>
										<div className={scss.selcet_filter}>
											<p>{item.languege}</p>
											<button
												onClick={() => {
													deleteIsCheckLanguage(item.languageId);
												}}
											>
												<IconDeleteX />
											</button>
										</div>
									</>
								))}
						</div>
						<div className={scss.right_content}>
							<div className={scss.iconText} onClick={() => setIsSort(!isSort)}>
								{selected === 'Все'
									? 'Все'
									: selected === 'Новинки'
										? 'Новинки'
										: selected === 'Бестселлеры'
											? 'Бестселлеры'
											: 'Сортировать'}
							</div>
							<div className={scss.rightIcon}>
								<div onClick={() => setIsSort(!isSort)}>
									<div className={isSort ? scss.arrow_bottom : scss.arrow_top}>
										<IconArrowBottom />
									</div>
									<></>
								</div>
							</div>
						</div>
						<>
							<div className={`${isSort ? scss.sort_drop : scss.sort_down}`}>
								<ul>
									{sortData.map((item) => (
										<>
											<li
												key={item.id}
												onClick={() => {
													setIdSort(item.id);
													setSelected(item.nameSort);
													setIsSort(false);
												}}
											>
												{item.nameSort}
											</li>
											<hr />
										</>
									))}
								</ul>
							</div>
						</>
					</div>
					<div className={scss.container}>
						<div
							onClick={() => setMenuFilters(!menufilters)}
							className={scss.burgermenu_filters}
						>
							<IconBurgerMenu />
						</div>
						<div
							className={`${menufilters ? scss.filtred_container : `${scss.none_style} ${scss.filtred_container}`}`}
						>
							<div
								onClick={() => {
									setIsGenre(!isGenre);
								}}
								className={scss.genre_fillter}
							>
								<p>Жанры</p>
								<div className={isGenre ? scss.arrow_bottom : scss.arrow_top}>
									<IconArrowBottom />
								</div>
								<></>
							</div>
							<hr />
							<>
								<div className={`${isGenre ? scss.fillters : scss.none}`}>
									{jenreData.map((jenre) => (
										<>
											<div
												key={jenre.jenreId}
												onClick={() => {
													handleJenreCheckedFucn(jenre.jenreId);
												}}
												className={scss.checkbox}
											>
												<div className={scss.checkbox_jenre}>
													{jenre.isCheked ? (
														<>
															<BlackSquareIcon />
														</>
													) : (
														<>
															<WhiteSquareIcon />
														</>
													)}
												</div>
												<p>{jenre.jenreName}</p>
											</div>
										</>
									))}
								</div>
							</>
							<div
								onClick={() => {
									setFilterType(!filterType);
								}}
								className={scss.type_fillter}
							>
								<p>Тип</p>
								<div
									className={filterType ? scss.arrow_bottom : scss.arrow_top}
								>
									<IconArrowBottom />
								</div>
								<></>
							</div>
							<hr />
							<div
								onClick={() => setClickRadio(!clickRadio)}
								className={`${filterType ? scss.fillters : scss.none}`}
							>
								{typesBookData.map((types) => (
									<>
										<div
											className={scss.checkbox}
											onClick={() => {
												typeBooksFunc(types.typeId);
											}}
										>
											{types.isRadio ? (
												<>
													<IconBlackCircle />
												</>
											) : (
												<>
													<IconWhiteCircle />
												</>
											)}
											<p>{types.typeName}</p>
										</div>
									</>
								))}
							</div>
							<div
								onClick={() => {
									setPriceGenre(!priceGenre);
								}}
								className={scss.price_fillter}
							>
								<p>Стоимость</p>
								<div
									className={priceGenre ? scss.arrow_bottom : scss.arrow_top}
								>
									<IconArrowBottom />
								</div>
								<></>
							</div>
							<hr />
							<div className={`${priceGenre ? scss.fillters : scss.none}`}>
								<div className={scss.checkbox}>
									<div className={scss.price_value_content}>
										<div className={scss.value_price}>
											<p>
												от <span>{value[0]}</span>
											</p>
											<p>
												до <span>{value[1]}</span>
											</p>
										</div>
										<ConfigProvider
											theme={{
												token: {
													borderRadius: 2
												}
											}}
										>
											<Slider
												range
												max={10000}
												min={100}
												onChange={(event) => {
													setValue(event);
												}}
												tooltip={{ visible: false }}
												value={value}
												defaultValue={value}
												className={scss.price_range}
											/>
										</ConfigProvider>
									</div>
								</div>
							</div>
							<div
								onClick={() => {
									setLanguage(!language);
								}}
								className={scss.language_fillter}
							>
								<p>Язык издания</p>
								<div className={language ? scss.arrow_bottom : scss.arrow_top}>
									<IconArrowBottom />
								</div>
								<></>
							</div>
							<hr />
							<>
								<div className={`${language ? scss.fillters : scss.none}`}>
									{languageBooksData.map((long) => (
										<>
											<div
												onClick={() => {
													handleLanguageFilter(long.languageId);
												}}
												className={scss.checkbox}
											>
												{long.isCheked ? (
													<>
														<BlackSquareIcon />
													</>
												) : (
													<>
														<WhiteSquareIcon />
													</>
												)}
												<p>{long.languege}</p>
											</div>
										</>
									))}
								</div>
							</>
						</div>
						<div className={scss.container_books}>
							{dataBooks.map((item) => (
								<div className={scss.card_book} key={item.id}>
									<div
										onClick={() => {
											hanleAddBookFavorite(item.id);
										}}
										className={scss.favorite_icon}
									>
										{item.inFavorites ? (
											<>
												<IconBlackLike />
											</>
										) : (
											<>
												<IconWhiteLike />
											</>
										)}
									</div>
									<div className={scss.audio_icon}>
										{item.isAudioBook ? (
											<>
												<IconHeadphoneOrange />
											</>
										) : null}
									</div>
									<img
										onClick={() => navigate(`/search_book/${item.id}`)}
										src={item.cover}
										alt=""
									/>
									<div
										onClick={() => navigate(`/search_book/${item.id}`)}
										className={scss.card_description}
									>
										<h3>{item.title}</h3>
										<p>{item.authorFullName}</p>
										<p>{item.price} с</p>
									</div>
									<div className={scss.btn_basket}>
										<CustomBasketButton
											nameClass=""
											onClick={() => {
												handleAddBookToBasket(item.id);
											}}
										>
											<p>Добавить в корзину</p>
										</CustomBasketButton>
									</div>
								</div>
							))}
							<div className={scss.btn_morebook}>
								<button
									onClick={() => {
										setPage(page + 1);
									}}
								>
									Смотреть больше
								</button>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};

export default SearchSection;
