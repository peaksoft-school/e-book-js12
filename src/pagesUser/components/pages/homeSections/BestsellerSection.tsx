import { FC, useState, useEffect } from 'react';
import Slider from 'react-slick';
import 'keen-slider/keen-slider.min.css';
import { KeenSliderInstance, useKeenSlider } from 'keen-slider/react';
import './Bestsellers.css';
import IconOrangeLeftArrow from '@/src/assets/icons/icon-orangeLeftArrow';
import IconOrangeRightArrow from '@/src/assets/icons/icon-orangeRightArrow';
import { useGetAllBestsellersQuery } from '@/src/redux/api/bestsellers';
import { Link, useNavigate } from 'react-router-dom';
import { Tooltip } from 'antd';
import IconGirl from '@/src/assets/icons/icon-girl';

const BestsellersSection: FC = () => {
	const { data, error, isLoading } = useGetAllBestsellersQuery();
	const navigate = useNavigate();
	const [expandedCards, setExpandedCards] = useState<{
		[key: number]: boolean;
	}>({});
	const [imageIndex, setImageIndex] = useState(0);
	const [isMobile, setIsMobile] = useState(window.innerWidth <= 600);

	const handleResize = () => {
		setIsMobile(window.innerWidth <= 600);
	};

	useEffect(() => {
		window.addEventListener('resize', handleResize);
		return () => {
			window.removeEventListener('resize', handleResize);
		};
	}, []);

	const handleClick = (id: number) => {
		setExpandedCards((prevExpanded) => ({
			...prevExpanded,
			[id]: !prevExpanded[id]
		}));
	};

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

	const slickSettings = {
		infinite: true,
		lazyLoad: 'ondemand' as const,
		speed: 400,
		slidesToShow: 3,
		slidesToScroll: 1,
		dots: true,
		autoplay: true,
		autoplaySpeed: 2000,
		nextArrow: (
			<NextArrow
				onClick={() =>
					setImageIndex((prev) => (prev + 1) % (data?.length ?? 1))
				}
			/>
		),
		prevArrow: (
			<PrevArrow
				onClick={() =>
					setImageIndex(
						(prev) => (prev - 1 + (data?.length ?? 1)) % (data?.length ?? 1)
					)
				}
			/>
		),
		beforeChange: (_current: number, next: number) => setImageIndex(next)
	};

	const [keenSliderRef] = useKeenSlider<HTMLDivElement>(
		{
			loop: true,

			breakpoints: {
				'(min-width: 600px)': {
					loop: true,
					renderMode: 'performance',
					drag: false
				}
			},
			created(s: KeenSliderInstance) {
				s.moveToIdx(0);
			},
			slideChanged(s: KeenSliderInstance) {
				setImageIndex(s.track.details.rel);
			}
		},
		[
			(slider) => {
				let timeout: ReturnType<typeof setTimeout>;
				let mouseOver = false;

				function clearNextTimeout() {
					clearTimeout(timeout);
				}

				function nextTimeout() {
					clearTimeout(timeout);
					if (mouseOver) return;
					timeout = setTimeout(() => {
						slider.next();
					}, 3000);
				}

				slider.on('created', () => {
					slider.container.addEventListener('mouseover', () => {
						mouseOver = true;
						clearNextTimeout();
					});
					slider.container.addEventListener('mouseout', () => {
						mouseOver = false;
						nextTimeout();
					});
					nextTimeout();
				});
				slider.on('dragStarted', clearNextTimeout);
				slider.on('animationEnded', nextTimeout);
				slider.on('updated', nextTimeout);
			}
		]
	);

	if (isLoading) return <p>Загрузка...</p>;
	if (error) return <p>Ошибка загрузки данных</p>;

	return (
		<section className="BestsellersSection" id="bestsellers">
			<div className="container">
				<div className="content">
					<h2>Бестселлеры</h2>
					<Link to={'/search_book'} className="see_orange">
						Смотреть все
					</Link>
				</div>
				<div className="containerss">
					{data && data.length > 0 ? (
						<>
							<div>
								{data.map((item, idx) => (
									<div key={item.id} className="description-box_box">
										{idx === imageIndex && (
											<div className="title_box_box">
												<Tooltip
													title={item.title.length > 20 ? item.title : ''}
													color="black"
													placement="bottomLeft"
												>
													<h2 className="name">{item.title}</h2>
												</Tooltip>
												<div>
													{item.description.length > 250 ? (
														expandedCards[item.id] ? (
															<p className="description">
																{item.description}
																<span
																	className="description-span"
																	onClick={() => handleClick(item.id)}
																>
																	Свернуть
																</span>
															</p>
														) : (
															<p className="description">
																{item.description.substring(0, 250)}...
																<span
																	className="description-span"
																	onClick={() => handleClick(item.id)}
																>
																	Читать дальше
																</span>
															</p>
														)
													) : (
														<p className="description">{item.description}</p>
													)}
												</div>
												<div className="box_box">
													<p
														className="read-more"
														onClick={() => {
															navigate(`/${item.id}`);
														}}
													>
														Подробнее
													</p>
													<p className="price">{item.price} c</p>
												</div>
											</div>
										)}
									</div>
								))}
							</div>
							<div className="jo">
								{isMobile ? (
									<div ref={keenSliderRef} className="keen-slider">
										{data.map((item, idx) => (
											<div
												key={item.id}
												className={`keen-slider__slide slider ${idx === imageIndex ? 'activeSlider' : ''}`}
											>
												<img src={item.imageUrl} alt="img" />
											</div>
										))}
									</div>
								) : (
									<Slider {...slickSettings}>
										{data.map((item, idx) => (
											<div
												key={item.id}
												className={
													idx === imageIndex ? 'slider activeSlider' : 'slider'
												}
											>
												<img src={item.imageUrl} alt="img" />
											</div>
										))}
									</Slider>
								)}
							</div>
							<div className="scroll-lines">
								<div
									className="active-line"
									style={{
										width: `${(100 / data.length) * (imageIndex + 1)}%`
									}}
								></div>
							</div>
						</>
					) : (
						<div className="fallback_container">
							<IconGirl />
							<p>Нет доступных книг</p>
						</div>
					)}
				</div>
			</div>
		</section>
	);
};

export default BestsellersSection;
