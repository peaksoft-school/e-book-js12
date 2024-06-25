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
import { Tooltip } from 'antd';
import { useNavigate } from 'react-router-dom';
import { IconGrill } from '@tabler/icons-react';

const LatestBookSection: FC = () => {
	const { data, error, isLoading } = useGetAllBooksQuery();
	const navigate = useNavigate();

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
		dots: true,
		autoplay: true,
		autoplaySpeed: 3000,
		pauseOnHover: true,
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
					cssEase: 'linear',
					autoplay: true
				}
			}
		]
	};

	if (isLoading) return <p>Загрузка...</p>;
	if (error) return <p>Ошибка загрузки данных</p>;

	return (
		<section className="LatestBooksSection">
			<div className="container">
				<div className="content">
					<div className="background_line">
						<IconBackgroundLine />
					</div>
					<div className="slider_container">
						{data && data.length > 0 ? (
							<Slider {...settings}>
								{data.map((item, idx) => (
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
														<Tooltip
															title={item.title.length > 20 ? item.title : ''}
															color="black"
															placement="bottomLeft"
														>
															<h1 className="names">{item.title}</h1>
														</Tooltip>
													</div>
													<Tooltip
														title={item.title.length > 20 ? item.title : ''}
														color="black"
														placement="bottomLeft"
													>
														<p className="auth">{item.authorsFullName}</p>
													</Tooltip>
												</div>
												<div className="prii">
													<p className="pri">{item.price} c</p>
												</div>
											</div>
										)}
									</div>
								))}
							</Slider>
						) : (
							<div className="fallback_container">
								<IconGrill />
								<p>Нет доступных книг</p>
							</div>
						)}
					</div>
				</div>
			</div>
		</section>
	);
};

export default LatestBookSection;
