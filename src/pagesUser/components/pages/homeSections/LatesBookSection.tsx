/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-unused-vars */
//@ts-nocheck
import { FC, useState } from 'react';
import './LatestBooksSection.module.scss';

import Slider from 'react-slick';
import 'slick-carousel/slick/slick.scss';
import 'slick-carousel/slick/slick-theme.scss';
import {
	IconBackgroundLine,
	IconOrangeLeftArrow,
	IconOrangeRightArrow
} from '@/src/assets/icons';

import { useGetAllBooksQuery } from '@/src/redux/api/latestBooks';

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
	const { data } = useGetAllBooksQuery();

	const NextArrow: FC<{ onClick: () => void }> = ({ onClick }) => (
		<div className={`arrow  next`} onClick={onClick}>
			<IconOrangeRightArrow />
		</div>
	);

	const PrevArrow: FC<{ onClick: () => void }> = ({ onClick }) => (
		<div className={`arrow prev`} onClick={onClick}>
			<IconOrangeLeftArrow />
		</div>
	);

	const [imageIndex, setImageIndex] = useState(0);
	const settings = {
		infinite: true,
		lazyLoad: true,
		speed: 500,
		slidesToShow: 3,
		centerMode: true,
		centerPadding: 0,
		nextArrow: <NextArrow />,
		prevArrow: <PrevArrow />,
		beforeChange: (current, next) => setImageIndex(next)
	};

	return (
		<section className="LatestBookSection">
			<div className="container">
				<div className="content">
					<div className="background_line">
						<IconBackgroundLine />
					</div>
					<div className="slider_container">
						<div>
							<Slider {...settings}>
								{data?.map((item, idx) => (
									<div
										className={
											idx === imageIndex ? `slide activeSlide` : `slide`
										}
									>
										<img src={item.imageUrl} alt="img" />
										{idx === imageIndex ? (
											<>
												<h1 className="name">{item.title}</h1>
												<span className="auth">{item.authorsFullName}</span>
												<span className="price">{item.price} c</span>
											</>
										) : (
											''
										)}
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
