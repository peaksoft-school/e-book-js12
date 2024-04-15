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
	IconDeleteX,
	IconWhiteCircle,
	IconWhiteLike
} from '@/src/assets/icons';
import CustomBasketButton from '@/src/ui/customButton/CustomBasketButton';

const SearchSection = () => {
	const [isGenre, setIsGenre] = useState(false);
	const [checkGenre, setCheckGenre] = useState(false);

	const [filterType, setFilterType] = useState(false);
	const [clickRadio, setClickRadio] = useState(false);

	const [favoriteBook, setFavoriteBook] = useState(false);

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
			id: 3,
			image: history_img,
			title: 'История Книги',
			aftor: 'Э. Эггер, А. Бахтияров',
			price: '549 с'
		}
	];

	return (
		<div className={scss.SearchSection}>
			<div className="container">
				<div className={scss.content}>
					<div className={scss.title_navigate}>
						<p>
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
						<div className={scss.right_content}>
							<p>Сортировать</p>
							<IconArrowBottom />
						</div>
					</div>
					<div className={scss.container}>
						<div className={scss.filtred_container}>
							{/* GANRE */}
							<div
								onClick={() => {
									setIsGenre(!isGenre);
								}}
								className={scss.genre_fillter}
							>
								<p>Жанры</p>
								<IconArrowBottom />
							</div>
							<hr />
							{isGenre ? (
								<>
									<div className={scss.fillters}>
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
							) : null}
							{/* TYPE */}
							<div
								onClick={() => {
									setFilterType(!filterType);
								}}
								className={scss.type_fillter}
							>
								<p>Тип</p>
								<IconArrowBottom />
							</div>
							<hr />
							{filterType ? (
								<div
									onClick={() => setClickRadio(!clickRadio)}
									className={scss.fillters}
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
							) : null}
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
										<CustomBasketButton onClick={() => {}}>
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
		</div>
	);
};

export default SearchSection;
