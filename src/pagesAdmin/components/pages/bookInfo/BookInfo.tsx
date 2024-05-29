/* eslint-disable no-irregular-whitespace */
import scss from './BookInfo.module.scss';
import { useState } from 'react';
import CustomBasketButton from '@/src/ui/customButton/CustomBasketButton';
import CustomPersonalAreaButton from '@/src/ui/customButton/CustomPersonalArea';
import bookList from '../../../../assets/booksImg/info-book.png';
import harry_pooter from '../../../../assets/booksImg/harrry-potter.png';
import { Modal } from 'antd';
import { IconSuccess } from '@/src/assets/icons';

const BookInfo = () => {
	const [showBookInfo, setShowBookInfo] = useState(false);
	const [modalSuccess, setModalSuccess] = useState(false);
	const [devationModal, setDevationModal] = useState(false);

	return (
		<>
			<section className={scss.Book_info}>
				<div className="container">
					<div className={scss.content}>
						<div className={scss.content_text}>
							<p>Заявки </p>
							<h4>/ Гарри Потер. Дары смерти</h4>
						</div>
						<div className={scss.contents_book}>
							<div className={scss.section_about_book}>
								<div className={scss.woman_book}>
									<img src={harry_pooter} alt="#" />
								</div>
							</div>
							<div className={scss.section_content_text}>
								<div className={scss.section_title}>
									<h3>Гарри Поттер и Тайная комната </h3>
								</div>
								<div className={scss.section_mony}>
									<p>365 c</p>
								</div>
								<div className={scss.section_info}>
									<div className={scss.section_info_name}>
										<p>Автор</p>
										<p>Жанр</p>
										<p>Язык</p>
										<p>Издательство</p>
										<p>Год выпуска</p>
										<p>Обьем</p>
									</div>
									<div className={scss.section_info_two}>
										<p>Роулинг Джоан Кэтлин</p>
										<p>Зарубежное фэнтези</p>
										<p>Русский </p>
										<p>МКС</p>
										<p>2021</p>
										<p>360 стр</p>
									</div>
								</div>

								<div className={scss.section_book}>
									<CustomPersonalAreaButton
										nameClass={`${scss.favorite_btn}`}
										onClick={() => {
											setDevationModal(true);
										}}
									>
										<p className={scss.boot1}>Отклонить</p>
									</CustomPersonalAreaButton>
									<Modal
										open={devationModal}
										footer={false}
										onCancel={() => {
											setDevationModal(false);
										}}
									>
										<div className={scss.modal_devation}>
											<p className={scss.text_devation}>
												Причина вашего отклонения
											</p>
											<input
												className={scss.input_devatoin}
												type="text"
												placeholder="Причина вашего отклонения"
											/>
											<button className={scss.btn_devation}>Отправить</button>
										</div>
									</Modal>
									<CustomBasketButton
										nameClass={scss.basket_btn}
										onClick={() => {
											setModalSuccess(true);
										}}
									>
										<p className={scss.boot1}>Принять</p>
									</CustomBasketButton>
									<Modal
										open={modalSuccess}
										footer={false}
										onCancel={() => {
											setModalSuccess(false);
										}}
									>
										<div className={scss.modal_container}>
											<IconSuccess />
											<div className={scss.info_text}>
												<p>
													<span>“Гарри Поттер и Тайная комната”</span> <br />
													успешно добавлен!
												</p>
											</div>
										</div>
									</Modal>
								</div>
							</div>
						</div>
						<div className={scss.section_text_books}>
							<div className={scss.section_show_info}>
								<div className={scss.show_info_book}>
									<p
										className={`${showBookInfo ? '' : scss.color_text}`}
										onClick={() => {
											setShowBookInfo(false);
										}}
									>
										O книге
									</p>
									<p
										className={`${showBookInfo ? scss.color_text : ''}`}
										onClick={() => {
											setShowBookInfo(true);
										}}
									>
										Читать фрагмент
									</p>
								</div>
								{showBookInfo ? (
									<p className={scss.book_info}>
										«Заговор, Гарри Поттер. Заговор — в этом году в Хогвартсе,
										школе колдовства и ведьминских искусств, произойдут
										ужаснейшие события».
										<br />
										<br />
										Лето у Гарри Поттера состояло из самого ужасного дня
										рождения в жизни, мрачных предупреждений от домового эльфа
										по имени Добби и спасения от Дурслеев, когда его друг Рон
										Уизли прибыл за ним на волшебной летающей машине! Вернувшись
										в школу колдовства и ведьминских искусств «Хогварц» на
										второй курс, Гарри слышит странный шепот, который эхом
										раздается в пустых коридорах. А потом начинаются нападения.
										Студентов находят будто превращенными в камень… Кажется, что
										зловещие предсказания Добби начинают сбываться.
										<br />
										<br />
										«Заговор, Гарри Поттер. Заговор — в этом году в Хогвартсе,
										школе колдовства и ведьминских искусств, произойдут
										ужаснейшие события».
										<br />
										<br /> Лето у Гарри Поттера состояло из самого ужасного дня
										рождения в жизни, мрачных предупреждений от домового эльфа
										по имени Добби и спасения от Дурслеев, когда его друг Рон
										Уизли прибыл за ним на волшебной летающей машине! Вернувшись
										в школу колдовства и ведьминских искусств «Хогварц» на
										второй курс, Гарри слышит странный шепот, который эхом
										раздается в пустых коридорах. А потом начинаются нападения.
										Студентов находят будто превращенными в камень… Кажется, что
										зловещие предсказания Добби начинают сбываться.
										<br />
										<br />
										Лето у Гарри Поттера состояло из самого ужасного дня
										рождения в жизни, мрачных предупреждений от домового эльфа
										по имени Добби и спасения от Дурслеев, когда его друг Рон
										Уизли прибыл за ним на волшебной летающей машине! Вернувшись
										в школу колдовства и ведьминских искусств «Хогварц» на
										второй курс, Гарри слышит странный шепот, который эхом
										раздается в пустых коридорах. А потом начинаются нападения.
										Студентов находят будто превращенными в камень… Кажется, что
										зловещие предсказания Добби начинают сбываться. <br />
										<br />
									</p>
								) : (
									<p className={scss.book_info}>
										«Заговор, Гарри Поттер. Заговор — в этом году в Хогвартсе,
										школе колдовства и ведьминских искусств, произойдут
										ужаснейшие события».
										<br />
										<br />
										Лето у Гарри Поттера состояло из самого ужасного дня
										рождения в жизни, мрачных предупреждений от домового эльфа
										по имени Добби и спасения от Дурслеев, когда его друг Рон
										Уизли прибыл за ним на волшебной летающей машине! Вернувшись
										в школу колдовства и ведьминских искусств «Хогварц» на
										второй курс, Гарри слышит странный шепот, который эхом
										раздается в пустых коридорах. А потом начинаются нападения.
										Студентов находят будто превращенными в камень… Кажется, что
										зловещие предсказания Добби начинают сбываться.
									</p>
								)}
							</div>
							<div className={scss.info_img}>
								<img src={bookList} alt="#" />
							</div>
						</div>
					</div>
				</div>
			</section>
		</>
	);
};

export default BookInfo;
