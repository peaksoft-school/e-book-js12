import scss from './ProfileHistory.module.scss';
import {
	useGetAllFavoriteQuery,
	useGetAllHistoryActionQuery,
	useGetBooksInBasketQuery
} from '@/src/redux/api/userHistory';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import emptyImage from '@/src/assets/img/Knowledgecuate.png';
import IconGirl from '@/src/assets/icons/icon-girl';
import { Tooltip } from 'antd';

const ProfileHistory = () => {
	const params = useParams();
	const locationId = Number(params.fullName);
	const [activeTab, setActiveTab] = useState('history');
	const { data: historyData } = useGetAllHistoryActionQuery(locationId);
	const { data: favoriteData } = useGetAllFavoriteQuery(locationId);
	const { data: basketData } = useGetBooksInBasketQuery(locationId);

	return (
		<div className={scss.profile_history}>
			<div className="container">
				<div className={scss.content}>
					<div className={scss.prof_info_text}>
						<div className={scss.prof_item_one}>
							<p>Очистить историю</p>
						</div>

						<div
							className={
								activeTab === 'history'
									? scss.info_tes_two_history
									: scss.info_tes_two
							}
						>
							{activeTab !== 'history' ? (
								<>
									<div className={scss.styling}>
										<p className={scss.item_two}>Фото</p>
										<p className={scss.item_tree}>Название/Автор</p>
									</div>
								</>
							) : (
								<>
									<p className={scss.item_two}>Фото</p>
									<p className={scss.item_tree}>Название/Автор</p>
								</>
							)}
							<div
								className={`${activeTab !== 'history' ? scss.item_flex_none : scss.item_flex} ${activeTab === 'history' ? scss.item_flex : ''} ${
									activeTab === 'cart' ? scss.item_flex_cart : ''
								}`}
							>
								{activeTab === 'favorites' ? null : (
									<>
										<p className={scss.item_four}>Кол-во</p>
									</>
								)}
								<p className={scss.item_five}>Цена</p>
								{activeTab === 'cart' ? null : (
									<>
										<p className={scss.item_sics}>Дата</p>
									</>
								)}
								{activeTab !== 'history' ? null : (
									<>
										<p className={scss.item_seven}>Состояние</p>
									</>
								)}
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
									{historyData && historyData?.length > 0 ? (
										historyData?.map((item) => (
											<div key={item.id} className={scss.line}>
												<div className={scss.book_map_info}>
													<img
														className={scss.book_image}
														src={item.imageUrl}
														alt="book"
													/>
													<div className={scss.book_flex_x}>
														<div className={scss.flex_book_history}>
															<div className={scss.book_name_end}>
																<Tooltip
																	className={scss.info_hover}
																	title={
																		item.title.length > 20 ? item.title : ''
																	}
																	color="black"
																	placement="bottomLeft"
																>
																	<p>{item.title}</p>
																</Tooltip>
																<Tooltip
																	className={scss.info_hover}
																	title={
																		item.authorsFullName.length > 20
																			? item.authorsFullName
																			: ''
																	}
																	color="black"
																	placement="bottomLeft"
																>
																	<p className={scss.book_name_people}>
																		{item.authorsFullName}
																	</p>
																</Tooltip>
															</div>
														</div>
														<div className={scss.flex_book_x_history}>
															<p className={scss.book_quantity_history}>
																{item.quantity}
															</p>
															<div className={scss.scitd_one}>
																<p className={scss.pprom}>
																	Промокод {item.discount}%
																</p>
																<div className={scss.scitd}>
																	<p>(-{item.priceWithDiscount})</p>
																	<p className={scss.book_price}>
																		{item.price}
																	</p>
																</div>
															</div>
															<p className={scss.book_data}>{item.createdAt}</p>
															<p className={scss.book_state}>
																{item.historyStatus}
															</p>
														</div>
													</div>
												</div>
											</div>
										))
									) : (
										<div className={scss.empty_message}>
											<IconGirl />
											<p>Нет доступных книг</p>
										</div>
									)}
								</div>
							)}

							{activeTab === 'favorites' && (
								<div>
									{favoriteData && favoriteData?.length > 0 ? (
										favoriteData?.map((item) => (
											<div key={item.id} className={scss.line}>
												<div className={scss.book_map_info}>
													<img
														className={scss.book_image}
														src={item.imageUrl}
														alt="book"
													/>
													<div className={scss.book_flex_x}>
														<div className={scss.flex_book}>
															<div className={scss.book_name_end}>
																<Tooltip
																	className={scss.info_hover}
																	title={
																		item.title.length > 20 ? item.title : ''
																	}
																	color="black"
																	placement="bottomLeft"
																>
																	<p>{item.title}</p>
																</Tooltip>
																<Tooltip
																	className={scss.info_hover}
																	title={
																		item.authorsFullName.length > 20
																			? item.authorsFullName
																			: ''
																	}
																	color="black"
																	placement="bottomLeft"
																>
																	<p className={scss.book_name_people}>
																		{item.authorsFullName}
																	</p>
																</Tooltip>
															</div>
														</div>
														<div className={scss.flex_book_x}>
															<div className={scss.scitd_one}>
																<p className={scss.pprom}>
																	Промокод {item.discount}%
																</p>
																<div className={scss.scitd}>
																	<p>(-{item.priceWithDiscount})</p>
																	<p className={scss.book_price}>
																		{item.price}
																	</p>
																</div>
															</div>
															<p className={scss.book_data}>{item.createdAt}</p>
														</div>
													</div>
												</div>
											</div>
										))
									) : (
										<div className={scss.empty_message}>
											<img src={emptyImage} alt="Empty Image" />
											<p>Нет доступных книг</p>
										</div>
									)}
								</div>
							)}

							{activeTab === 'cart' && (
								<div>
									{basketData && basketData?.length > 0 ? (
										basketData?.map((item) => (
											<div key={item.id} className={scss.line}>
												<div className={scss.book_map_info}>
													<img
														className={scss.book_image}
														src={item.imageUrl}
														alt="book"
													/>
													<div className={scss.book_flex_x}>
														<div className={scss.flex_book_cart}>
															<div className={scss.book_name_end}>
																<Tooltip
																	className={scss.info_hover}
																	title={
																		item.title.length > 20 ? item.title : ''
																	}
																	color="black"
																	placement="bottomLeft"
																>
																	<p>{item.title}</p>
																</Tooltip>
																<Tooltip
																	className={scss.info_hover}
																	title={
																		item.authorsFullName.length > 20
																			? item.authorsFullName
																			: ''
																	}
																	color="black"
																	placement="bottomLeft"
																>
																	<p className={scss.book_name_people}>
																		{item.authorsFullName}
																	</p>
																</Tooltip>
															</div>
														</div>
														<div className={scss.flex_book_x_cart}>
															<p className={scss.book_quantity_history}>
																{item.quantity}
															</p>
															<div className={scss.scitd_one}>
																<p className={scss.pprom}>
																	Промокод {item.discount}%
																</p>
																<div className={scss.scitd}>
																	<p>(-{item.priceWithDiscount})</p>
																	<p className={scss.book_price}>
																		{item.price}
																	</p>
																</div>
															</div>
														</div>
													</div>
												</div>
											</div>
										))
									) : (
										<div className={scss.empty_message}>
											<img src={emptyImage} alt="Empty Image" />
											<p>Нет книг в корзине</p>
										</div>
									)}
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
