import { useClientProfileHistoryQuery } from '@/src/redux/api/userHistory';
import scss from './ProfilePageHistory.module.scss';
import { IconSuccess } from '@/src/assets/icons';
import { useNavigate } from 'react-router-dom';

interface GetResponse {
	data: UserHistory[];
}

interface UserHistory {
	id: number;
	title: string;
	authorsFullName: string;
	imageUrl: string;
	quantity: number;
	discount: number;
	discountFromPromoCode: number;
	historyStatus: string;
	price: number;
	priceWithDiscount: number;
	createdAt: string;
	urlFile: string | null;
	bookType: string;
}

const ProfilePageHistory = () => {

	const { data } = useClientProfileHistoryQuery<GetResponse>();
	const navigate = useNavigate();

	if (!data) {
		return null;
	}

	return (
		<section className={scss.ProfileHistorySection}>
			<div className="container">
				<div className={scss.content}>
					<div className={scss.info_text}>
						<div className={scss.item_one}>
							<p>Очистить историю</p>
						</div>

						<div className={scss.info_text_two}>
							<p className={scss.item_two}>Фото</p>
							<p className={scss.item_three}>Название/Автор</p>
							<p className={scss.item_four}>Кол-во</p>
							<p className={scss.item_five}>Цена</p>
							<p className={scss.item_six}>Дата</p>
							<p className={scss.item_seven}>Состояние</p>
						</div>
					</div>

					<div className={scss.info_history}>
						<div className={scss.line_}>
							<div className={scss.text_book}>
								<p>Купленные ({data.length} книг)</p>
							</div>
						</div>
						<div className={scss.image_line}></div>
						<div className={scss.map_section}>
							{data.length > 0 ? (
								data.map((historyItem) => (
									<div className={scss.line} key={historyItem.id}>
										<div
											onClick={() => {
												if (historyItem.bookType !== 'PAPER_BOOK') {
													navigate('/ebook');
												}
											}}
											className={scss.book_map_info}
										>
											<img
												className={scss.book_image}
												src={historyItem.imageUrl}
												alt={historyItem.title}
											/>

											<div className={scss.book_name_end}>
												<p>{historyItem.title}</p>
												<p className={scss.book_name_people}>
													{historyItem.authorsFullName}
												</p>
											</div>
											<p className={scss.book_quantity}>
												{historyItem.quantity} шт.
											</p>
											<p className={scss.book_price}>
												<span>{historyItem.price} с</span>
												{historyItem.priceWithDiscount} с
											</p>
											<p className={scss.book_data}>{historyItem.createdAt}</p>
											<p className={scss.book_state}>
												{historyItem.historyStatus === 'COMPLETED' ? (
													<IconSuccess />
												) : (
													<>В Прогрессe</>
												)}
											</p>
										</div>
									</div>
								))
							) : (
								<p>История пуста.</p>
							)}
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};

export default ProfilePageHistory;
