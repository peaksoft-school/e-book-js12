import scss from './ProfileHistory.module.scss';
import {
	useGetAllFavoriteQuery,
	useGetAllHistoryActionQuery,
	useGetBooksInBasketQuery
} from '@/src/redux/api/userHistory';
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const ProfileHistory = () => {
	const params = useParams();
	const locationId = Number(params.fullName);
	const [activeTab, setActiveTab] = useState('history');
	const { data: historyData } = useGetAllHistoryActionQuery(locationId);
	const { data: favoriteData } = useGetAllFavoriteQuery(locationId);
	const { data: basketData } = useGetBooksInBasketQuery(locationId);

	const navigate = useNavigate();

	const handleBook = (id: number) => {
		navigate(`/admin/users/books/${id}`);
	};

	return (
		<div className={scss.profile_history}>
			<div className="container">
				<div className={scss.content}>
					<div className={scss.prof_info_text}>
						<div className={scss.prof_item_one}>
							<p>Очистить историю</p>
						</div>

						<div className={scss.info_tes_two}>
							<p className={scss.item_two}>Фото</p>
							<p className={scss.item_tree}>Название/Автор</p>
							<div className={scss.item_flex}>
								<p className={scss.item_four}>Кол-во</p>
								<p className={scss.item_five}>Цена</p>
								<p className={scss.item_sics}>Дата</p>
								<p className={scss.item_seven}>Состояние</p>
							</div>
						</div>
					</div>

					<div className={scss.prof_info_history}>
						<div className={scss.prof_line_prof}>
							<div className={scss.text_book}>
								<p
									onClick={() => setActiveTab('history')}
									className={`${scss.navigate_books_history} ${activeTab === 'history' ? scss.navigate_books_active_history : ''}`}
								>
									История({historyData?.length} книг)
								</p>
								<p
									onClick={() => setActiveTab('favorites')}
									className={`${scss.navigate_books} ${activeTab === 'favorites' ? scss.navigate_books_active : ''}`}
								>
									В избранном ({favoriteData?.length} книг)
								</p>
								<p
									onClick={() => setActiveTab('cart')}
									className={`${scss.navigate_books_cor} ${activeTab === 'cart' ? scss.navigate_books_active_cor : ''}`}
								>
									В корзине ({basketData?.length} книг)
								</p>
							</div>
						</div>
						<div className={scss.prof_map_section}>
							{activeTab === 'history' && (
								<div>
									{historyData?.map((item) => (
										<div key={item.id} className={scss.line}>
											<div
												onClick={() => handleBook(item.id)}
												className={scss.book_map_info}
											>
												<img
													className={scss.book_image}
													src={item.imageUrl}
													alt="book"
												/>
												<div className={scss.book_flex}>
													<div className={scss.flex_book}>
														<div className={scss.book_name_end}>
															<p>{item.title}</p>
															<p className={scss.book_name_people}>
																{item.authorsFullName}
															</p>
														</div>
													</div>
													<div className={scss.flex_book}>
														<p className={scss.book_quantity}>
															{item.quantity}
														</p>
														<div className={scss.scitd_one}>
															<p className={scss.pprom}>
																Промокод {item.discount}%
															</p>
															<div className={scss.scitd}>
																<p>(-{item.priceWithDiscount})</p>
																<p className={scss.book_price}>{item.price}</p>
															</div>
														</div>
														<p className={scss.book_data}>{item.createdAt}</p>
														<p className={scss.book_state}>Завершен</p>
													</div>
												</div>
											</div>
										</div>
									))}
								</div>
							)}
							{activeTab === 'favorites' && (
								<div>
									{favoriteData?.map((item) => (
										<div key={item.id} className={scss.line}>
											<div className={scss.book_map_info}>
												<img
													className={scss.book_image}
													src={item.imageUrl}
													alt="book"
												/>
												<div className={scss.book_flex}>
													<div className={scss.flex_book}>
														<div className={scss.book_name_end}>
															<p>{item.title}</p>
															<p className={scss.book_name_people}>
																{item.authorsFullName}
															</p>
														</div>
													</div>
													<div className={scss.flex_book}>
														<p className={scss.book_quantity}>
															{item.quantity}
														</p>
														<div className={scss.scitd_one}>
															<p className={scss.pprom}>
																Промокод {item.discount}%
															</p>
															<div className={scss.scitd}>
																<p>(-{item.priceWithDiscount})</p>
																<p className={scss.book_price}>{item.price}</p>
															</div>
														</div>
														<p className={scss.book_data}>{item.createdAt}</p>
														<p className={scss.book_state}></p>
													</div>
												</div>
											</div>
										</div>
									))}
								</div>
							)}
							{activeTab === 'cart' && (
								<div>
									{basketData?.map((item) => (
										<div key={item.id} className={scss.line}>
											<div className={scss.book_map_info}>
												<img
													className={scss.book_image}
													src={item.imageUrl}
													alt="book"
												/>
												<div className={scss.book_flex}>
													<div className={scss.flex_book}>
														<div className={scss.book_name_end}>
															<p>{item.title}</p>
															<p className={scss.book_name_people}>
																{item.authorsFullName}
															</p>
														</div>
													</div>
													<div className={scss.flex_book}>
														<p className={scss.book_quantity}>
															{item.quantity}
														</p>
														<div className={scss.scitd_one}>
															<p className={scss.pprom}>
																Промокод {item.discount}%
															</p>
															<div className={scss.scitd}>
																<p>(-{item.priceWithDiscount})</p>
																<p className={scss.book_price}>{item.price}</p>
															</div>
														</div>
														<p className={scss.book_data}>{item.createdAt}</p>
														<p className={scss.book_state}></p>
													</div>
												</div>
											</div>
										</div>
									))}
								</div>
							)}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ProfileHistory;
