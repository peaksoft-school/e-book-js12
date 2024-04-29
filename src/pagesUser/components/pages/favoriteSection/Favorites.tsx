import { FC } from 'react';
import scss from './Favorites.module.scss';
import { IconX } from '@/src/assets/icons';
import { NavLink } from 'react-router-dom';
import book_harry from '../../../../assets/booksImg/harry-potter-chamber.png';

const FavoritSection: FC = () => {
	const infoDates = [
		{
			_id: 1,
			image: book_harry,
			title: 'Гарри Поттер и тайная комната ',
			author: 'Роулинг Джоан Кэтлин',
			description:
				'Второй роман в серии книг про юного волшебника Гарри Поттера, написанный Джоан Роулинг. Книга рассказывает о втором учебном годе в школе чародейства и волшебства Хогвартс, на котором Гарри и его друзья - Рон Уизли и Гермиона Грейнджер - расследуют...'
		},
		{
			_id: 2,
			image: book_harry,
			title: 'Гарри Поттер и тайная комната ',
			author: 'Роулинг Джоан Кэтлин',
			description:
				'Второй роман в серии книг про юного волшебника Гарри Поттера, написанный Джоан Роулинг. Книга рассказывает о втором учебном годе в школе чародейства и волшебства Хогвартс, на котором Гарри и его друзья - Рон Уизли и Гермиона Грейнджер - расследуют...'
		},
		{
			_id: 3,
			image: book_harry,
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
								<p>Всего: {infoDates ? infoDates.length : 0}</p>
							</div>
							<hr />
							<button className={scss.clear_favorite_button}>
								Очистить избранные
							</button>
						</div>
						<div className={scss.favorite_card_container}>
							{infoDates?.map((item) => (
								<>
									<hr />
									<div className={scss.favorite_card_content}>
										<div className={scss.btn_delete}>
											<button className={scss.close_button}>
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
														{item.author}
													</p>
													<p className={scss.favorite_card_description}>
														{item.description}
													</p>
												</div>
											</div>
										</div>
										<div className={scss.favorite_card_buttons}>
											<button className={scss.button_to_busket}>
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
