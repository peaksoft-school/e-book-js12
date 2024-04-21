/* eslint-disable no-irregular-whitespace */
import scss from './Information.module.scss';
import woman from '../../../../assets/img/6012509593 1 (1).png';
import potter from '../../../../assets/img/6012509593 2.png';
import { IconNewIcon } from '@/src/assets/icons';
import CustomBasketButton from '@/src/ui/customButton/CustomBasketButton';
import CustomPersonalAreaButton from '@/src/ui/customButton/CustomPersonalArea';
import { useState } from 'react';
import bookList from '../../../../assets/img/a6012509593 3.png';

const InformationBook = () => {
	const [showBookInfo, setShowBookInfo] = useState(false);

	return (
		<>
			<section className={scss.Book_info}>
				<div className="container">
					<div className={scss.content_one}>
						<div className={scss.content_text}>
							<p>Главная / Психология </p>
							<h4>/ Гарри Потер. Дары смерти</h4>
						</div>
						<div className={scss.content}>
							<div className={scss.sectionAboutBook}>
								<div className={scss.womanBook}>
									<img src={woman} alt="#" />
									<div className={scss.icon_Orang}>
										<IconNewIcon />
									</div>
								</div>
								<div className={scss.womanBook}>
									<img src={potter} alt="#" />
								</div>
							</div>
							<div className={scss.section_Content_Text}>
								<div>
									<h3>Гарри Поттер и Тайная комната </h3>
								</div>
								<div className={scss.section_mony}>
									<h5>365 c</h5>
								</div>
								<div className={scss.section_info}>
									<div className={scss.section_info_name}>
										<h5>Автор</h5>
										<h5>Автор</h5>
										<h5>Язык</h5>
										<h5>Издательство</h5>
										<h5>Год выпуска</h5>
										<h5>Обьем</h5>
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
								<div className={scss.section_boot}>
									<CustomPersonalAreaButton onClick={() => {}}>
										<p className={scss.boot1}>В избранное</p>
									</CustomPersonalAreaButton>
									<CustomBasketButton onClick={() => {}}>
										<p className={scss.boot1}>Добавить в корзину</p>
									</CustomBasketButton>
								</div>
							</div>
						</div>
						<div className={scss.section_text_books}>
							<div className={scss.section_show_info}>
								<div className={scss.show_info_book}>
									<h3
										onClick={() => {
											setShowBookInfo(false);
										}}
									>
										о книге
									</h3>
									<h3
										onClick={() => {
											setShowBookInfo(true);
										}}
									>
										Читать фрагмент
									</h3>
								</div>
								{showBookInfo ? (
									<p className={scss.book_info}>
										«Заговор, Гарри Поттер. Заговор — в этом году в Хогвартсе,
										школе колдовства и ведьминских искусств, произойдут
										ужаснейшие события».
										<br />
										<br />
										Лето у Гарри Поттера состояло из самого ужасного дня
										рождения в жизни, мрачных предупреждений от домового эльфа
										по имени Добби и спасения от Дурслеев, когда его друг Рон
										Уизли прибыл за ним на волшебной летающей машине! Вернувшись
										в школу колдовства и ведьминских искусств «Хогварц»
										на второй курс, Гарри слышит странный шепот, который эхом
										раздается в пустых коридорах. А потом начинаются нападения.
										Студентов находят будто превращенными в камень… Кажется, что
										зловещие предсказания Добби начинают сбываться.
										<br />
										<br />
										«Заговор, Гарри Поттер. Заговор — в этом году в Хогвартсе,
										школе колдовства и ведьминских искусств, произойдут
										ужаснейшие события».
										<br />
										<br /> Лето у Гарри Поттера состояло из самого ужасного дня
										рождения в жизни, мрачных предупреждений от домового эльфа
										по имени Добби и спасения от Дурслеев, когда его друг Рон
										Уизли прибыл за ним на волшебной летающей машине! Вернувшись
										в школу колдовства и ведьминских искусств «Хогварц»
										на второй курс, Гарри слышит странный шепот, который эхом
										раздается в пустых коридорах. А потом начинаются нападения.
										Студентов находят будто превращенными в камень… Кажется, что
										зловещие предсказания Добби начинают сбываться.
										<br />
										<br />
										Лето у Гарри Поттера состояло из самого ужасного дня
										рождения в жизни, мрачных предупреждений от домового эльфа
										по имени Добби и спасения от Дурслеев, когда его друг Рон
										Уизли прибыл за ним на волшебной летающей машине! Вернувшись
										в школу колдовства и ведьминских искусств «Хогварц»
										на второй курс, Гарри слышит странный шепот, который эхом
										раздается в пустых коридорах. А потом начинаются нападения.
										Студентов находят будто превращенными в камень… Кажется, что
										зловещие предсказания Добби начинают сбываться.{' '}
										<br /><br />
										
									</p>
								) : (
									<p className={scss.book_info}>
										«Заговор, Гарри Поттер. Заговор — в этом году в Хогвартсе,
										школе колдовства и ведьминских искусств, произойдут
										ужаснейшие события».
										<br />
										<br />
										Лето у Гарри Поттера состояло из самого ужасного дня
										рождения в жизни, мрачных предупреждений от домового эльфа
										по имени Добби и спасения от Дурслеев, когда его друг Рон
										Уизли прибыл за ним на волшебной летающей машине! Вернувшись
										в школу колдовства и ведьминских искусств «Хогварц»
										на второй курс, Гарри слышит странный шепот, который эхом
										раздается в пустых коридорах. А потом начинаются нападения.
										Студентов находят будто превращенными в камень… Кажется, что
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

export default InformationBook;
