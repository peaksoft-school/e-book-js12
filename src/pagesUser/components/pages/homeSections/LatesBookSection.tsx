/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-unused-vars */
// @ts-nocheck
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

const LatestBookSection: FC = () => {
	const { data } = useGetAllBooksQuery();

	const NextArrow: FC<{ onClick: () => void }> = ({ onClick }) => (
		<div className="arrow next" onClick={onClick}>
			<IconOrangeRightArrow />
		</div>
	);

	const PrevArrow: FC<{ onClick: () => void }> = ({ onClick }) => (
		<div className="arrow prev" onClick={onClick}>
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
		centerPadding: '0',
		nextArrow: <NextArrow />,
		prevArrow: <PrevArrow />,
		beforeChange: (current, next) => setImageIndex(next),
		responsive: [
			{
				breakpoint: 680,
				settings: {
					slidesToShow: 1,
					centerMode: true,
					centerPadding: '0',
					autoplaySpeed: 2000,
					cssEase: "linear",
					autoplay: true
				}
			}
		]
	};

	return (
		<section className="LatestBooksSection">
			<div className="container">
				<div className="content">
					<div className="background_line">
						<IconBackgroundLine />
					</div>
					<div className="slider_container">
						<Slider {...settings}>
							{data?.map((item, idx) => (
								<div
									key={idx}
									className={
										idx === imageIndex ? 'slidee activeSlidee' : 'slidee'
									}
								>
									<img src={item.imageUrl} alt="img" />
									{idx === imageIndex && (
										<div className="sli">
											<div className="tro">
												<div className="tros">
													<h1 className="names">{item.title}</h1>
												</div>
												<p className="auth">{item.authorsFullName}</p>
											</div>
											<div className="prii">
												<p className="pri">{item.price} c</p>
											</div>
										</div>
									)}
								</div>
							))}
						</Slider>
					</div>
				</div>
			</div>
		</section>
	);
};

export default LatestBookSection;
