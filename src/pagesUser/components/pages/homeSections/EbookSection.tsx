// import scss from './Bestsellers.css';

// import markMeson from '../../../../assets/booksImg/img-Mark-Meson.png';
// import mayMask from '../../../../assets/booksImg/img-May-Mask.png';
// import historyBooks from '../../../../assets/booksImg/img-History-books.png';
// import remark from '../../../../assets/booksImg/Remark.png';
// import de from '../../../../assets/booksImg/De.png';

// import { Swiper, SwiperClass, SwiperSlide } from 'swiper/react';
// import {
// 	Pagination,
// 	Navigation,
// 	EffectCoverflow,
// 	Keyboard
// } from 'swiper/modules';

// import 'swiper/css';
// import 'swiper/css/pagination';
// import 'swiper/css/navigation';
// import { useState } from 'react';
// import { IconOrangeLeftArrow, IconOrangeRightArrow } from '@/src/assets/icons';

// const booksData = [
// 	{
// 		id: 1,
// 		title: 'Тонкое искусство пофигизма',
// 		description:
// 			'Современное общество пропагандирует культ успеха: будь умнее, богаче, продуктивнее — будь лучше всех. Соцсети изобилуют историями на тему, как какой-то малец придумал. Соцсети изобилуют историями на тему, как какой-то малец придумал приложение…',
// 		pages: 234,
// 		image: markMeson
// 	},
// 	{
// 		id: 2,
// 		title: 'Женщина, у которой есть план',
// 		image: mayMask,
// 		description:
// 			'71-летняя супермодель Мэй Маск – не просто красивая, но и невероятно успешная и счастливая женщина – делится мудрыми уроками, которые она усвоила за долгую жизнь. Несмотря на удары судьбы и невзгоды: развод и статус многодетной матери-одиночки в 31 год, бедность и невостребованность, Мэй никогда не опускала руки...',
// 		pages: 150
// 	},
// 	{
// 		id: 3,
// 		title: 'История книги',
// 		image: historyBooks,
// 		description:
// 			'Вниманию читателей предлагается перевод книги французского эллиниста Огюста Эмиля Эггера (1813-1885 гг.) "История книги от ее появления до наших дней" (1882 г.). Работа представляет собой очерк, рассказывающий о появлении на свет книги, ее последующем совершенствовании и умножении, а также развитии книжной торговли. ... ',
// 		pages: 150
// 	},
// 	{
// 		id: 4,
// 		title: 'Земля обетованная',
// 		description:
// 			'«Земля обетованная» – роман, опубликованный уже после смерти великого немецкого писателя.Судьба немецких эмигрантов в Америке.Они бежали от фашизма, используя все возможные и невозможные способы и средства. Бежали к последнему бастиону свободы и независимости. ...',
// 		pages: 234,
// 		image: remark
// 	},
// 	{
// 		id: 5,
// 		title: "De I'ancienna France",
// 		image: de,
// 		description:
// 			'Эта книга — репринт оригинального издания (издательство "Paris : M. de Saint-Allais", 1833 год), созданный на основе электронной копии высокого разрешения, которую очистили и обработали вручную, сохранив структуру и орфографию оригинального издания. Редкие, забытые и малоизвестные книги, изданные с петровских времен до наших дней, вновь доступны в виде печатных книг..',
// 		pages: 150
// 	}
// ];

// const EbookSection = () => {
// 	const [bookId, setBookId] = useState(1);

// 	const handleSlideChange = (swiper: SwiperClass) => {
// 		const activeIndex = swiper.activeIndex;
// 		setBookId(activeIndex + 1);
// 	};

// 	return (
// 		<section className={scss.Bestsellers}>
// 			<div className="container">
// 				<div className={scss.content}>
// 					<div className={scss.title}>
// 						<h2>Электронные книги</h2>
// 						<p>Смотреть все</p>
// 					</div>
// 					<div className={scss.all_about_books}>
// 						<div className={scss.books}>
// 							{booksData.map((book) => (
// 								<div
// 									key={book.id}
// 									className={scss.about_books}
// 									style={{ display: bookId === book.id ? 'block' : 'none' }}
// 								>
// 									<h3>{book.title}</h3>
// 									<p className={scss.description_books}>{book.description}</p>
// 									<div className={scss.paragraph}>
// 										<p>Подробнее</p>
// 										<p>{book.pages} c</p>
// 									</div>
// 								</div>
// 							))}
// 						</div>
// 						<div className={scss.sliders}>
// 							<div className={scss.slider_container}>
// 								<Swiper
// 									pagination={{
// 										el: 'swiper-pagination',
// 										clickable: false
// 									}}
// 									navigation={{
// 										nextEl: '.button_next',
// 										prevEl: '.button_prev'
// 									}}
// 									effect={'coverflow'}
// 									grabCursor={true}
// 									centeredSlides={true}
// 									loop={true}
// 									slidesPerView={3}
// 									spaceBetween={30}
// 									max-height={'0px'}
// 									coverflowEffect={{
// 										rotate: 0,
// 										stretch: 0
// 									}}
// 									modules={[Pagination, Navigation, EffectCoverflow, Keyboard]}
// 									onSlideChange={(swiper) => handleSlideChange(swiper)}
// 									className={scss.swiper}
// 								>
// 									{booksData.map((book) => (
// 										<SwiperSlide
// 											key={book.id}
// 											className={scss.swiper_slider}
// 											style={{ maxHeight: '0px' }}
// 										>
// 											<div className={scss.slide_item}>
// 												<img
// 													src={book.image}
// 													alt=""
// 													style={{ maxHeight: '800px' }}
// 												/>
// 											</div>
// 										</SwiperSlide>
// 									))}
// 									<div className={scss.swiper_controller}>
// 										<div
// 											className="button_next"
// 											style={{
// 												marginTop: '120px',
// 												position: 'absolute',
// 												right: '10px',
// 												top: '50%',
// 												transform: 'translateY(-50%)',
// 												zIndex: '100'
// 											}}
// 										>
// 											<IconOrangeRightArrow />
// 										</div>
// 										<div
// 											className="button_prev"
// 											style={{
// 												marginTop: '120px',
// 												position: 'absolute',
// 												left: '10px',
// 												top: '50%',
// 												transform: 'translateY(-50%)',
// 												zIndex: '100'
// 											}}
// 										>
// 											<IconOrangeLeftArrow />
// 										</div>
// 									</div>
// 								</Swiper>
// 							</div>
// 						</div>
// 					</div>
// 				</div>
// 			</div>
// 		</section>
// 	);

// };
