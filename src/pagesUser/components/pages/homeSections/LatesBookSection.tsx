/* eslint-disable */
//@ts-nocheck
import { FC, useState } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.scss';
import 'slick-carousel/slick/slick-theme.scss';
import { IconOrangeLeftArrow, IconOrangeRightArrow } from '@/src/assets/icons';
import scss from './LatestBooksSection.module.scss';
import LinaBackground from '../../../../assets/icons/icon-background-Line';
import remark2 from '../../../../assets/booksImg/546aaa27045a3b5a112dcbc03cb742010 2.png';
import remark from '../../../../assets/booksImg/56aaa27045a3b5a112dcbc03cb742010 2.png';
import historyBook from '../../../../assets/booksImg/1015486658 2.png';
import historyBook2 from '../../../../assets/booksImg/1015486658 3.png';

const images = [
	{
		img: historyBook2,
		name: 'history',
		auth: 'Э.Эггер , А.Бахтаров',
		price: 430
	},
	{
		img: remark2,
		name: 'Земля обетованная',
		auth: 'Эрих Мария Ремарк',
		price: 420
	},
	{
		img: remark,
		name: 'Земля обетованная',
		auth: 'Эрих Мария Ремарк',
		price: 410
	},
	{
		img: historyBook,
		name: 'history book',
		auth: 'Э.Эггер , А.Бахтаров',
		price: 400
	}
];
interface Settings {
	className?: string;
	infinite: boolean;
	lazyLoad: boolean;
	speed: number;
	slidesToShow: number;
	centerMode: boolean;
	centerPadding: number | string;
	nextArrow?: JSX.Element;
	prevArrow?: JSX.Element;
	beforeChange?: (current: number, next: number) => void;
	responsive?: {
		breakpoint: number;
		settings: {
			slidesToShow: number;
		};
	}[];
}

const LatestBookSection: FC = () => {
	const NexArrow: FC<{ onClick: () => void }> = ({ onClick }) => (
		<div className={`${scss.arrow_next}`} onClick={onClick}>
			<IconOrangeRightArrow />
		</div>
	);

	const PrevArrow: FC<{ onClick: () => void }> = ({ onClick }) => (
		<div className={`${scss.arrow_prev}`} onClick={onClick}>
			<IconOrangeLeftArrow />
		</div>
	);

	const [imageIndex, setImageIndex] = useState<number>(0);

	const settings: Settings = {
		className: 'center',
		lazyLoad: true,
		centerMode: true,
		infinite: true,
		centerPadding: '0px',
		slidesToShow: 3,
		speed: 500,
		nextArrow: <NexArrow onClick={() => setImageIndex((prev) => prev + 1)} />,
		prevArrow: <PrevArrow onClick={() => setImageIndex((prev) => prev - 1)} />,
		beforeChange: (current, next) => setImageIndex(next),
		responsive: [
			{
				breakpoint: 650,
				settings: {
					slidesToShow: 2
				}
			},
			{
				breakpoint: 520,
				settings: {
					slidesToShow: 1
				}
			}
		]
	};

	return (
		<section className={scss.Welcome}>
			<div className="container">
				<div className={`${scss.content}`}>
					<div className={`${scss.latest_books_section}`}>
						<LinaBackground />
						<div className={`${scss.slider_container}`}>
							<Slider {...settings}>
								{images.map((item, idx) => (
									<div
										key={idx}
										className={
											imageIndex === idx ? scss.active_slide : scss.slide
										}
									>
										<img className={scss.images_slide} src={item.img} alt="#" />
										<div className={scss.text_book_content}>
											<p>{item.name}</p>
											<div className={scss.description}>
												<p>{item.auth}</p>
												<p>{item.price}</p>
											</div>
										</div>
									</div>
								))}
							</Slider>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};

export default LatestBookSection;
