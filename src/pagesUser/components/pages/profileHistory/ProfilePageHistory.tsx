import line from '../../../../assets/booksImg/Line 41.png';
import book from '../../../../assets/booksImg/book.png';
import linetwo from '../../../../assets/booksImg/Line 42.png';
import twoLine from '../../../../assets/booksImg/Line 40.png';
import scss from './ProfilePageHistory.module.scss';

const info = [
	{
		id: 1,
		image: book,
		nameBook: 'Гарри Поттер и тайна...',
		name: 'Роулинг Джоан Кэтлин',
		quantity: '1шт',
		price: '255c',
		data: '12.12.21',
		state: 'Завершен'
	},
	{
		id: 1,
		image: book,
		nameBook: 'Гарри Поттер и тайна...',
		name: 'Роулинг Джоан Кэтлин',
		quantity: '1шт',
		price: '255c',
		data: '12.12.21',
		state: 'Завершен'
	},
	{
		id: 1,
		image: book,
		nameBook: 'Гарри Поттер и тайна...',
		name: 'Роулинг Джоан Кэтлин',
		quantity: '1шт',
		price: '255c',
		data: '12.12.21',
		state: 'Завершен'
	},
	{
		id: 1,
		image: book,
		nameBook: 'Гарри Поттер и тайна...',
		name: 'Роулинг Джоан Кэтлин',
		quantity: '1шт',
		price: '255c',
		data: '12.12.21',
		state: 'Завершен'
	},
];

const ProfilePageHistory = () => {
	return (
		<div className={scss.profile_history}>
			<div className="container">
				<div className={scss.content}>
					<div className={scss.info_text}>
						<div className={scss.item_one}>
							<p>Очистить историю</p>
							
						</div>

						<div className={scss.info_tes_two}>
							<p className={scss.item_two}>Фото</p>
							<p className={scss.item_tree}>Название/Автор</p>
							<p className={scss.item_four}>Кол-во</p>
							<p className={scss.item_five}>Цена</p>
							<p className={scss.item_sics}>Дата</p>
							<p className={scss.item_seven}>Состояние</p>
						</div>
					</div>
					<img className={scss.line_profile} src={line} alt="" />
					<div className={scss.info_history}>
						<div>
							<div className={scss.text_book}>
								<p>Купленные (123 книг)</p>
							</div>
						</div>
						<div className={scss.image_line}>
							<img src={linetwo} alt="" />
						</div>
						<div className={scss.map_section}>
							{info.map((item) => (
								<div>
									<div className={scss.book_map_info}>
										<img className={scss.book_image} src={item.image} alt="#" />

										<div className={scss.book_name_end}>
											<p>{item.nameBook}</p>
											<p className={scss.book_name_people}>{item.name}</p>
										</div>
										<p className={scss.book_quantity}>{item.quantity}</p>
										<p className={scss.book_price}>{item.price}</p>
										<p className={scss.book_data}>{item.data}</p>
										<p className={scss.book_state}>{item.state}</p>
									</div>
									<img className={scss.two_line} src={twoLine} alt="#" />
								</div>
							))}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ProfilePageHistory;
