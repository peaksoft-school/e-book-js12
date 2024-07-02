import { useEffect, useState } from 'react';
import { useClientProfileHistoryQuery } from '@/src/redux/api/userHistory';
import scss from './ProfilePageHistory.module.scss';
import { IconSuccess, IconX } from '@/src/assets/icons';
import ModalBook from '@/src/ui/customModals/Modal';

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
	const clientId = 3;
	const { data } = useClientProfileHistoryQuery<GetResponse>(clientId);
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [selectedHistoryItem, setSelectedHistoryItem] =
		useState<UserHistory | null>(null);

	const openModal = (historyItem: UserHistory) => {
		setSelectedHistoryItem(historyItem);
		setIsModalOpen(true);
	};

	const closeModal = () => {
		setSelectedHistoryItem(null);
		setIsModalOpen(false);
	};

	useEffect(() => {
		const pdfContainer = document.getElementById('pdfContainer');
		const objectElement = document.createElement('object');
		objectElement.setAttribute(
			'data',
			'https://ebook-b12.s3.eu-central-1.amazonaws.com/1718441363736_92533655.a4.pdf'
		);
		pdfContainer?.appendChild(objectElement);

		return () => {
			// Очищаем контейнер при размонтировании компонента
			pdfContainer?.removeChild(objectElement);
		};
	}, []);

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
								<p>Купленные ({data ? data.length : 0} книг)</p>
							</div>
						</div>
						<div className={scss.image_line}></div>
						<div className={scss.map_section}>
							{data && data.length > 0 ? (
								data.map((historyItem) => (
									<div className={scss.line} key={historyItem.id}>
										<div
											onClick={() => openModal(historyItem)}
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
													<>
														<IconSuccess />
													</>
												) : (
													<>В Прогрессe</>
												)}
											</p>
										</div>
										<ModalBook
											isOpen={
												isModalOpen &&
												selectedHistoryItem?.id === historyItem.id
											}
											onClose={closeModal}
										>
											<div className={scss.modal_content}>
												<div className={scss.closeIcon} onClick={closeModal}>
													<IconX />
												</div>
												<div>
													{selectedHistoryItem?.bookType === 'AUDIO_BOOK' ? (
														<div className={scss.audio}>
															<audio id="audioPlayer" controls>
																{selectedHistoryItem.urlFile && (
																	<source
																		src={selectedHistoryItem.urlFile}
																		type="audio/mpeg"
																	/>
																)}
															</audio>
														</div>
													) : selectedHistoryItem?.bookType ===
													  'ONLINE_BOOK' ? (
														<div></div>
													) : selectedHistoryItem?.bookType === 'PAPER_BOOK' ? (
														<div className={scss.test}>
															<object data="https://ebook-b12.s3.eu-central-1.amazonaws.com/1718441363736_92533655.a4.pdf"></object>
														</div>
													) : null}
												</div>
											</div>
										</ModalBook>
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
