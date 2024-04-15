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
			<section className={scss.Welcome}>
				<div className="container">
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
									<p>В избранное</p>
								</CustomPersonalAreaButton>
								<CustomBasketButton onClick={() => {}}>
									Добавить в корзину
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
								<p>Фрагмент </p>
							) : (
								<p className={scss.book_info}>
									«Заговор, Гарри Поттер. Заговор — в этом году в Хогвартсе,
									школе колдовства и ведьминских искусств, произойдут ужаснейшие
									события».
								</p>
							)}
						</div>
						<div className={scss.info_img}>
							<img src={bookList} alt="#" />
						</div>
					</div>
				</div>
			</section>
		</>
	);
};

export default InformationBook;
