import scss from './AudioBooks.module.scss';
import first_book from '../../../../assets/booksImg/img-milky-way-empire.png';
import second_book from '../../../../assets/booksImg/img-green-color.png';
import third_book from '../../../../assets/booksImg/img-nisa.png';
import { IconNewIcon } from '@/src/assets/icons';
const AudioBookSection = () => {
	return (
		<section className={scss.AudioBooks}>
			<div className="container">
				<div className={scss.content}>
					<div className={scss.title_audio_books}>
						<h5>Аудиокниги</h5>
						<p>Смотреть все</p>
					</div>
					<div className={scss.books_container}>
						<div className={scss.book_first}>
							<img src={third_book} alt="" />
							<div className={scss.about_book}>
								<h5>НИ СЫ</h5>
								<p>Джен Синсеро</p>
								<div className={scss.description_book}>
									<p>19 ч. 44 мин. 19 сек.</p>
									<h6>234 с</h6>
								</div>
							</div>
						</div>
						<div className={scss.book_second}>
							<div className={scss.new_book_container}>
								<IconNewIcon />
							</div>

							<img src={second_book} alt="" />
							<div className={scss.about_book}>
								<h5>Зеленый свет</h5>
								<p>Мэттью Макконахи</p>
								<div className={scss.description_book}>
									<p>19 ч. 44 мин. 19 сек.</p>
									<h6>234 с</h6>
								</div>
							</div>
						</div>
						<div className={scss.book_third}>
							<img src={first_book} alt="" />
							<div className={scss.about_book}>
								<h5>Империя Млечного пути</h5>
								<p>Книга 3. Пилигрим.</p>
								<div className={scss.description_book}>
									<p>19 ч. 44 мин. 19 сек.</p>
									<h6>234 с</h6>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};

export default AudioBookSection;
