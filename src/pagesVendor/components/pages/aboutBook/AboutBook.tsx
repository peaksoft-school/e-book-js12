/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from 'react';
import { Modal } from 'antd';
import scss from './AboutBook.module.scss';
import CustomBasketButton from '@/src/ui/customButton/CustomBasketButton';
import CustomPersonalAreaButton from '@/src/ui/customButton/CustomPersonalArea';
import bookList from '../../../../assets/booksImg/info-book.png';
import harryPotterImg from '../../../../assets/booksImg/harry-potter-chamber.png';
import { Link } from 'react-router-dom';
import { IconWhiteLike } from '@/src/assets/icons';

const AboutBook = () => {
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [, setSelectedVendor] = useState(null);

	const showModal = (book: any) => {
		setSelectedVendor(book);
		setIsModalOpen(true);
	};

	const handleOk = () => {
		setIsModalOpen(false);
		setSelectedVendor(null);
	};

	const handleCancel = () => {
		setIsModalOpen(false);
		setSelectedVendor(null);
	};

	return (
		<section className={scss.AboutBook}>
			<div className="container">
				<div className={scss.content}>
					<div className={scss.links}>
						<Link
							to="/vendor"
							className={`${scss.link_to_home} ${
								location.pathname === '/vendor' ? scss.link_to_home_active : ''
							}`}
						>
							Главная
						</Link>
						/
						<span className={scss.link_to_vendor_page}>
							Гарри Поттер и Тайная комната
						</span>
					</div>
					<div className={scss.contents_book}>
						<div className={scss.section_about_book}>
							<div className={scss.woman_book}>
								<img src={harryPotterImg} alt="Harry Potter" />
							</div>
						</div>
						<div className={scss.section_content_text}>
							<div>
								<p></p>
							</div>
							<div className={scss.section_title}>
								<div className={scss.book_header}>
									<div className={scss.hearts}>
										<IconWhiteLike />
										<p>(23)</p>
									</div>
									<div className={scss.in_basket}>
										<p>В корзине(8)</p>
									</div>
								</div>
								<h3>Гарри Поттер и Тайная комната</h3>
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
									<p>Русский</p>
									<p>МКС</p>
									<p>2021</p>
									<p>360 стр</p>
								</div>
							</div>
							<div className={scss.section_book}>
								<CustomPersonalAreaButton
									nameClass={`${scss.favorite_btn}`}
									onClick={() => {}}
								>
									<p className={scss.boot1} onClick={showModal}>
										Удалить
									</p>
								</CustomPersonalAreaButton>
								<Modal
									visible={isModalOpen}
									onOk={handleOk}
									onCancel={handleCancel}
									okText="Удалить"
									cancelText="Отменить"
								>
									<p>
										Вы уверены, что хотите удалить
										<span>Гарри Поттер и Тайная комната</span>?
									</p>
								</Modal>
								<CustomBasketButton
									nameClass={scss.basket_btn}
									onClick={function (): void {}}
								>
									<p className={scss.boot1}>Редактировать</p>
								</CustomBasketButton>
							</div>
						</div>
					</div>
					<div className={scss.section_text_books}>
						<div className={scss.section_show_info}>
							<div className={scss.show_info_book}>
								<p
									className={`${isModalOpen ? '' : scss.color_text}`}
									onClick={() => {
										setIsModalOpen(false);
									}}
								>
									O книге
								</p>
								<p
									className={`${isModalOpen ? scss.color_text : ''}`}
									onClick={() => {
										setIsModalOpen(true);
									}}
								>
									Читать фрагмент
								</p>
							</div>
							<p className={scss.book_info}>
								«Заговор, Гарри Поттер. Заговор — в этом году в Хогвартсе, школе
								колдовства и ведьминских искусств, произойдут ужаснейшие
								события». «Заговор, Гарри Поттер. Заговор — в этом году в
								Хогвартсе, школе колдовства и ведьминских искусств, произойдут
								ужаснейшие события». «Заговор, Гарри Поттер. Заговор — в этом
								году в Хогвартсе, школе колдовства и ведьминских искусств,
								произойдут ужаснейшие события». «Заговор, Гарри Поттер. Заговор
								— в этом году в Хогвартсе, школе колдовства и ведьминских
								искусств, произойдут ужаснейшие события». «Заговор, Гарри
								Поттер. Заговор — в этом году в Хогвартсе, школе колдовства и
								ведьминских искусств, произойдут ужаснейшие события». «Заговор,
								Гарри Поттер. Заговор — в этом году в Хогвартсе, школе
								колдовства и ведьминских искусств, произойдут ужаснейшие
								события». Гарри Поттер. Заговор — в этом году в Хогвартсе, школе
								колдовства и ведьминских искусств, произойдут ужаснейшие
								события». Гарри Поттер. Заговор — в этом году в Хогвартсе, школе
								колдовства и ведьминских искусств, произойдут ужаснейшие
								события». Гарри Поттер. Заговор — в этом году в Хогвартсе, школе
								колдовства и ведьминских искусств, произойдут ужаснейшие
								события».
							</p>
						</div>
						<div className={scss.info_img}>
							<img src={bookList} alt="Book List" />
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};

export default AboutBook;
