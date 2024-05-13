import { useState } from 'react';
import history_img from '../../../../assets/booksImg/img-History-books.png';
import scss from './Section.module.scss';
import CustomGenreInput from '@/src/ui/customInpute/CustomGenreInput';
import WhiteSquareIcon from '@/src/assets/icons/icon-whiteSquare';
import BlackSquareIcon from '@/src/assets/icons/icon-blackSquare';
import {
	IconArrowBottom,
	IconBlackCircle,
	IconBlackLike,
	IconBurgerMenu,
	IconDeleteX,
	IconUpIcon,
	IconWhiteCircle,
	IconWhiteLike
} from '@/src/assets/icons';
import CustomBasketButton from '@/src/ui/customButton/CustomBasketButton';
import { Slider, ConfigProvider } from 'antd';
import { useNavigate } from 'react-router-dom';

const SearchSection = () => {
	const [isGenre, setIsGenre] = useState(false);
	const [checkGenre, setCheckGenre] = useState(false);
	const [isSort, setIsSort] = useState(false);
	const navigate = useNavigate();

	const [filterType, setFilterType] = useState(false);
	const [clickRadio, setClickRadio] = useState(false);

	const [priceGenre, setPriceGenre] = useState(false);

	const [favoriteBook, setFavoriteBook] = useState(false);
	const [value, setValue] = useState<number[]>([500, 10000]);

	const [language, setLanguage] = useState(false);

	const [menufilters, setMenuFilters] = useState(false);

	const data = [
		{
			id: 1,
			image: history_img,
			title: 'История Книги',
			aftor: 'Э. Эггер, А. Бахтияров',
			price: '549 с'
		},
		{
			id: 2,
			image: history_img,
			title: 'История Книги',
			aftor: 'Э. Эггер, А. Бахтияров',
			price: '549 с'
		},
		{
			id: 3,
			image: history_img,
			title: 'История Книги',
			aftor: 'Э. Эггер, А. Бахтияров',
			price: '549 с'
		},
		{
			id: 4,
			image: history_img,
			title: 'История Книги',
			aftor: 'Э. Эггер, А. Бахтияров',
			price: '549 с'
		}
	];

	return (
		<section className={scss.SearchSection}>
			<div className="container">
				<div className={scss.content}>
					<div className={scss.title_navigate}>
						<p
							onClick={() => {
								navigate('/');
							}}
						>
							Главная/<span>Психология</span>
						</p>
					</div>
					<div className={scss.info_filtred}>
						<div className={scss.left_content}>
							<p>Найдены 2344 книг</p>
						</div>
						<div className={scss.center_content}>
							<div className={scss.selcet_filter}>
								<p>Зарубежная литература</p>
								<IconDeleteX />
							</div>
							<div className={scss.selcet_filter}>
								<p>Русский язык</p>
								<IconDeleteX />
							</div>
						</div>
						<div className={scss.tool}></div>
						<div
							className={scss.right_content}
							onClick={() => setIsSort(!isSort)}
						>
							<p>Сортировать</p>
							{isSort ? (
								<>
									<IconUpIcon />
								</>
							) : (
								<>
									<IconArrowBottom />
								</>
							)}
						</div>
						{
							<>
								<div className={`${isSort ? scss.sort_drop : scss.sort_down}`}>
									<ul>
										<li>Новинки</li>
										<hr />
										<li>Бестселлеры</li>
									</ul>
								</div>
							</>
						}
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
								{isGenre ? (
									<>
										<IconUpIcon />
									</>
								) : (
									<>
										<IconArrowBottom />
									</>
								)}
							</div>
							<hr />
							<>
								<div className={`${isGenre ? scss.fillters : scss.none}`}>
									<CustomGenreInput placeholder="Я ищу..." />
									<div
										onClick={() => setCheckGenre(!checkGenre)}
										className={scss.checkbox}
									>
										{checkGenre ? (
											<>
												<BlackSquareIcon />
											</>
										) : (
											<>
												<WhiteSquareIcon />
											</>
										)}
										<p>Зарубежная литература</p>
									</div>
								</div>
							</>
							<div
								onClick={() => {
									setFilterType(!filterType);
								}}
								className={scss.type_fillter}
							>
								<p>Тип</p>
								{filterType ? (
									<>
										<IconUpIcon />
									</>
								) : (
									<>
										<IconArrowBottom />
									</>
								)}
							</div>
							<hr />
							<div
								onClick={() => setClickRadio(!clickRadio)}
								className={`${filterType ? scss.fillters : scss.none}`}
							>
								<div className={scss.checkbox}>
									{clickRadio ? (
										<>
											<IconBlackCircle />
										</>
									) : (
										<>
											<IconWhiteCircle />
										</>
									)}
									<p>audio</p>
								</div>
							</div>
							<div
								onClick={() => {
									setPriceGenre(!priceGenre);
								}}
								className={scss.price_fillter}
							>
								<p>Стоимость</p>
								{priceGenre ? (
									<>
										<IconUpIcon />
									</>
								) : (
									<>
										<IconArrowBottom />
									</>
								)}
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
												tooltipVisible={false}
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
								{language ? (
									<>
										<IconUpIcon />
									</>
								) : (
									<>
										<IconArrowBottom />
									</>
								)}
							</div>
							<hr />
							<>
								<div className={`${language ? scss.fillters : scss.none}`}>
									<div
										onClick={() => setCheckGenre(!checkGenre)}
										className={scss.checkbox}
									>
										{checkGenre ? (
											<>
												<BlackSquareIcon />
											</>
										) : (
											<>
												<WhiteSquareIcon />
											</>
										)}
										<p>Кыргызский язык</p>
									</div>
									<div
										onClick={() => setCheckGenre(!checkGenre)}
										className={scss.checkbox}
									>
										{checkGenre ? (
											<>
												<BlackSquareIcon />
											</>
										) : (
											<>
												<WhiteSquareIcon />
											</>
										)}
										<p>Русский язык</p>
									</div>
									<div
										onClick={() => setCheckGenre(!checkGenre)}
										className={scss.checkbox}
									>
										{checkGenre ? (
											<>
												<BlackSquareIcon />
											</>
										) : (
											<>
												<WhiteSquareIcon />
											</>
										)}
										<p>Английский язык</p>
									</div>
								</div>
							</>
						</div>
						<div className={scss.container_books}>
							{data.map((item) => (
								<div className={scss.card_book} key={item.id}>
									<div
										onClick={() => setFavoriteBook(!favoriteBook)}
										className={scss.favorite_icon}
									>
										{favoriteBook ? (
											<>
												<IconBlackLike />
											</>
										) : (
											<>
												<IconWhiteLike />
											</>
										)}
									</div>
									<img src={item.image} alt="" />
									<div className={scss.card_description}>
										<h3>{item.title}</h3>
										<p>{item.aftor}</p>
										<p>{item.price}</p>
									</div>
									<div className={scss.btn_basket}>
										<CustomBasketButton nameClass="" onClick={() => {}}>
											<p>Добавить в корзину</p>
										</CustomBasketButton>
									</div>
								</div>
							))}
							<div className={scss.btn_morebook}>
								<button>Смотреть больше</button>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};

export default SearchSection;
