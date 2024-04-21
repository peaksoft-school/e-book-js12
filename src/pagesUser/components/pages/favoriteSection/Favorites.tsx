import { FC } from 'react';
import scss from './Favorites.module.scss';
import { IconX } from '@/src/assets/icons';
import { NavLink } from 'react-router-dom';

const FavoritSection: FC = () => {
	const infoDates = [
		{
			_id: 1,
			image:
				'https://s3-alpha-sig.figma.com/img/66ac/38f9/629144e6ce4042ef47b5cc9c75a8714b?Expires=1713744000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=WwzIgatI5E7R~N-CC0~oI-R68L~pOaHDLjP8KnoIrlia8Vbb2fkIzXATsmFlyVMpdJpuoigHISVxJD2kuoxddyjfRGa8E68a0li-~fTcuzzeWGK8KfeEAEAdApnYBrCG-B5sY8H8KrbhASmT8VCUb5w6IKQo347Uo-g8QmNpfRn39FI9~rJh7bDVrphxjD2yVPxtQuX76VaohuyRrv8J48aLbuqOjBm1356h0YWapm-WHP9YsQAH4yKxmMN7jpE7cuZzqgaZRz-Aynla3C3vzBAQF711g5ZZQBHEVrKGUYj3fCMZVVk0WjWtT4CQKwdpStEBVcR1OS7GEwxlkpP59g__',
			title: 'Гарри Поттер и тайная комната ',
			author: 'Роулинг Джоан Кэтлин',
			description:
				'Второй роман в серии книг про юного волшебника Гарри Поттера, написанный Джоан Роулинг. Книга рассказывает о втором учебном годе в школе чародейства и волшебства Хогвартс, на котором Гарри и его друзья - Рон Уизли и Гермиона Грейнджер - расследуют...'
		}
	];

	return (
		<>
			<section className={scss.FavoritePage}>
				<div className="container">
					<div className={scss.content}>
						<div className={scss.favoriteNavLink}>
							<NavLink to={'/'}>Главная</NavLink>
							<span>/</span>
							<NavLink to={'/favorites'} className={scss.active}>
								Избранные
							</NavLink>
						</div>
						<div className={scss.favoritesHeader}>
							<div className={scss.favoritesTitle}>
								<h1>Ваши книги</h1>
								<p>Всего: {infoDates ? infoDates.length : 0}</p>
							</div>
							<hr />
							<button className={scss.clearFavoriteButton}>
								Очистить избранные
							</button>
						</div>
						<div className={scss.favoriteCardContainer}>
							{infoDates?.map((item) => (
								<div className={scss.favoriteCardContent}>
									<div className={scss.favoriteCard}>
										<div className={scss.favoriteImageAbout}>
											<img
												src={item.image}
												alt={item.title}
												className={scss.favoriteCardImage}
											/>
											<div className={scss.favoriteCardAboutBook}>
												<h1 className={scss.favoriteCardTitle}>{item.title}</h1>
												<p className={scss.favoriteCardAuthor}>{item.author}</p>
												<p className={scss.favoriteCardDescription}>
													{item.description}
												</p>
											</div>
										</div>
										<div className={scss.favoriteCardButtons}>
											<button className={scss.closeButton}>
												<IconX />
											</button>
											<button className={scss.buttonToBusket}>
												Добавить в корзину
											</button>
										</div>
									</div>
									<hr />
								</div>
							))}
							{infoDates?.map((item) => (
								<div className={scss.favoriteCardContent}>
									<div className={scss.favoriteCard}>
										<div className={scss.favoriteImageAbout}>
											<img
												src={item.image}
												alt={item.title}
												className={scss.favoriteCardImage}
											/>
											<div className={scss.favoriteCardAboutBook}>
												<h1 className={scss.favoriteCardTitle}>{item.title}</h1>
												<p className={scss.favoriteCardAuthor}>{item.author}</p>
												<p className={scss.favoriteCardDescription}>
													{item.description}
												</p>
											</div>
										</div>
										<div className={scss.favoriteCardButtons}>
											<button className={scss.closeButton}>
												<IconX />
											</button>
											<button className={scss.buttonToBusket}>
												Добавить в корзину
											</button>
										</div>
									</div>
									<hr />
								</div>
							))}
							{infoDates?.map((item) => (
								<div className={scss.favoriteCardContent}>
									<div className={scss.favoriteCard}>
										<div className={scss.favoriteImageAbout}>
											<img
												src={item.image}
												alt={item.title}
												className={scss.favoriteCardImage}
											/>
											<div className={scss.favoriteCardAboutBook}>
												<h1 className={scss.favoriteCardTitle}>{item.title}</h1>
												<p className={scss.favoriteCardAuthor}>{item.author}</p>
												<p className={scss.favoriteCardDescription}>
													{item.description}
												</p>
											</div>
										</div>
										<div className={scss.favoriteCardButtons}>
											<button className={scss.closeButton}>
												<IconX />
											</button>
											<button className={scss.buttonToBusket}>
												Добавить в корзину
											</button>
										</div>
									</div>
									<hr />
								</div>
							))}
						</div>
					</div>
				</div>
			</section>
		</>
	);
};

export default FavoritSection;
