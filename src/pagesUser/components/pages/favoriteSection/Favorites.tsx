import { FC, useState } from 'react';
import scss from './Favorites.module.scss';
import { IconX } from '@/src/assets/icons';
import { NavLink, useNavigate } from 'react-router-dom';
import {
	useClearFavoriteMutation,
	usePostFavoriteUnFavoriteMutation,
	useGetAllBooksInFavoriteQuery,
	useGetCountOfBooksInFavoriteQuery
} from '@/src/redux/api/favorite';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useAddBookToBasketMutation } from '@/src/redux/api/basket';

const FavoritSection: FC = () => {
	const [expandedCards, setExpandedCards] = useState<{
		[key: string]: boolean;
	}>({});
	const { data } = useGetAllBooksInFavoriteQuery();
	const { data: count } = useGetCountOfBooksInFavoriteQuery();
	const [clearFavorite] = useClearFavoriteMutation();
	const [deleteFavoriteBook] = usePostFavoriteUnFavoriteMutation();
	const [addBookToBasket] = useAddBookToBasketMutation();

	const navigate = useNavigate();

	const handleClick = (id: number) => {
		setExpandedCards((prevExpanded) => ({
			...prevExpanded,
			[id]: !prevExpanded[id] || false
		}));
	};

	const handleClearFavorite = async () => {
		await clearFavorite();
	};

	const handleAddFavoriteBook = async (id: number) => {
		await deleteFavoriteBook(id);
	};

	const handleAddToBasket = async (id: number) => {
		const result = await addBookToBasket(id);
		if ('data' in result) {
			console.log(result);
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
	};

	return (
		<>
			<section className={scss.FavoritesSection}>
				<div className="container">
					<div className={scss.content}>
						<div className={scss.favorite_nav_link}>
							<NavLink to={'/'}>Главная</NavLink>
							<span>/</span>
							<NavLink to={'/favorite'} className={scss.active}>
								Избранные
							</NavLink>
						</div>
						<div className={scss.favorite_header}>
							<div className={scss.favorites_title}>
								<h1>Ваши книги</h1>
								<p>Всего: {count}</p>
							</div>
							<hr />
							<button
								className={scss.clear_favorite_button}
								onClick={handleClearFavorite}
							>
								Очистить избранные
							</button>
							<ToastContainer />
						</div>
						<div className={scss.favorite_card_container}>
							{data?.map((item) => (
								<>
									<hr />
									<div className={scss.favorite_card_content} key={item.id}>
										<div className={scss.btn_delete}>
											<button
												className={scss.close_button}
												onClick={() => {
													handleAddFavoriteBook(item.id);
												}}
											>
												<IconX />
											</button>
										</div>
										<div className={scss.favorite_card}>
											<div className={scss.favorite_image_about}>
												<div onClick={() => navigate(`/search_book/${item.id}`)} className={scss.container_img}>
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
