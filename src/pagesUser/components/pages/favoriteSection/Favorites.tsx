import { FC, useState } from 'react';
import scss from './Favorites.module.scss';
import { IconX } from '@/src/assets/icons';
import { NavLink } from 'react-router-dom';
import {
	useAddBookToBasketMutation,
	useClearFavoriteMutation,
	usePostFavoriteUnFavoriteMutation,
	useGetAllBooksInFavoriteQuery,
	useGetCountOfBooksInFavoriteQuery
} from '@/src/redux/api/favorite';

interface BookId {
	id: number;
}

const FavoritSection: FC<BookId> = () => {
	// const paramsId = useParams();
	// const bookId = Number(paramsId.id);
	const [expandedCards, setExpandedCards] = useState<{
		[key: string]: boolean;
	}>({});
	const { data } = useGetAllBooksInFavoriteQuery();
	const { data: count } = useGetCountOfBooksInFavoriteQuery();
	const [clearFavorite] = useClearFavoriteMutation();
	const [deleteFavoriteBook] = usePostFavoriteUnFavoriteMutation();
	const [addBookToBasket] = useAddBookToBasketMutation();

	const handleClick = (id: number) => {
		setExpandedCards((prevExpanded) => ({
			...prevExpanded,
			[id]: !prevExpanded[id] || false
		}));
	};

	const handleClearFavorite = () => {
		clearFavorite();
	};

	const handleDeleteFavoriteBook = async (id: number) => {
		await deleteFavoriteBook(id);
	};

	const handleAddToBasket = async (id: number) => {
		await addBookToBasket(id);
	};

	return (
		<>
			<section className={scss.Favorite_page}>
				<div className="container">
					<div className={scss.content}>
						<div className={scss.favorite_nav_link}>
							<NavLink to={'/'}>Главная</NavLink>
							<span>/</span>
							<NavLink to={'/favorites'} className={scss.active}>
								Избранные
							</NavLink>
						</div>
						<div className={scss.favorite_header}>
							<div className={scss.favorites_title}>
								<h1>Ваши книги</h1>
								<p>Всего: {count?.count}</p>
							</div>
							<hr />
							<button
								className={scss.clear_favorite_button}
								onClick={handleClearFavorite}
							>
								Очистить избранные
							</button>
						</div>
						<div className={scss.favorite_card_container}>
							{data?.map((item) => (
								<>
									<hr />
									<div className={scss.favorite_card_content}>
										<div className={scss.btn_delete}>
											<button
												className={scss.close_button}
												onClick={() => {
													handleDeleteFavoriteBook(item.id);
												}}
											>
												<IconX />
											</button>
										</div>
										<div className={scss.favorite_card}>
											<div className={scss.favorite_image_about}>
												<div className={scss.container_img}>
													<img
														src={item.image}
														alt={item.title}
														className={scss.favorite_card_image}
													/>
												</div>
												<div className={scss.favorite_card_about_book}>
													<h1 className={scss.favorite_card_title}>
														{item.title}
													</h1>
													<p className={scss.favorite_card_author}>
														{item.authorFullName}
													</p>
													<div
														className={scss.favorite_card_description}
														onClick={() => handleClick(item.id)}
													>
														{expandedCards[item.id] ? (
															<p>{item.description}</p>
														) : (
															<p>{item.description.substring(0, 250)}...</p>
														)}
													</div>
												</div>
											</div>
										</div>
										<div className={scss.favorite_card_buttons}>
											<button
												className={scss.button_to_busket}
												onClick={() => {
													handleAddToBasket(item.id);
												}}
											>
												Добавить в корзину
											</button>
										</div>
									</div>
								</>
							))}
						</div>
					</div>
				</div>
			</section>
		</>
	);
};

export default FavoritSection;
