import { FC, useEffect, useState } from 'react';
import Slider from 'react-slick';
import './SeconsdSlider.css';
import IconOrangeLeftArrow from '@/src/assets/icons/icon-orangeLeftArrow';
import IconOrangeRightArrow from '@/src/assets/icons/icon-orangeRightArrow';
import { Link, useNavigate } from 'react-router-dom';
import { useGetEBookQuery } from '@/src/redux/api/bestsellers';
import { useKeenSlider } from 'keen-slider/react';
import IconGirl from '@/src/assets/icons/icon-girl';

const SecondSlider: FC = () => {
	const { data, error, isLoading } = useGetEBookQuery();
	const [isMobile, setIsMobile] = useState(window.innerWidth <= 600);
	const [expandedCards, setExpandedCards] = useState<{
		[key: number]: boolean;
	}>({});
	const [imageIndex, setImageIndex] = useState(0);

	const handleResize = () => {
		setIsMobile(window.innerWidth <= 600);
	};

	const navigate = useNavigate();

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

	const settings = {
		infinite: true,
		lazyLoad: 'ondemand' as const,
		speed: 500,
		slidesToShow: 3,
		slidesToScroll: 1,
		dots: false,
		autoplay: true,
		autoplaySpeed: 3000,
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
					renderMode: 'performance',
					drag: false
				}
			},
			created(s) {
				s.moveToIdx(0);
			},
			slideChanged(s) {
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
					}, 5000);
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
		<div className="container" id="eBook">
			<div className="content">
				<h2>Электронные книги</h2>
				<Link to={'/search_book'} className="see_orange">
					Смотреть все
				</Link>
			</div>
			<div className="containers">
				{data && data.length > 0 ? (
					<>
						<div>
							{data.map((item, idx) => (
								<div key={item.id} className="description-box">
									{idx === imageIndex && (
										<div className="title">
											<h2 className="name">{item.title}</h2>
											<div
												className="favorite_card_descriptions"
												onClick={() => handleClick(item.id)}
											>
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
											<div className="box">
												<p
													className="read-more"
													onClick={() => navigate(`${item.id}`)}
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
						<div className="joc">
							{isMobile ? (
								<div ref={keenSliderRef} className="keen-slider">
									{data.map((item, idx) => (
										<div
											key={item.id}
											className={`keen-slider__slide slide ${idx === imageIndex ? 'activeSlide' : ''}`}
										>
											<img src={item.imageUrl} alt="img" />
										</div>
									))}
								</div>
							) : (
								<Slider {...settings}>
									{data.map((item, idx) => (
										<div
											key={item.id}
											className={
												idx === imageIndex ? 'slide activeSlide' : 'slide'
											}
										>
											<img src={item.imageUrl} alt="img" />
										</div>
									))}
								</Slider>
							)}
						</div>
						{data && (
							<div className="scroll-line">
								<div
									className="active-line"
									style={{
										width: `${(100 / data.length) * (imageIndex + 1)}%`
									}}
								></div>
							</div>
						)}
					</>
				) : (
					<div className="fallback-container">
						<IconGirl />
						<p>Нет доступных Электронные книги</p>
					</div>
				)}
			</div>
		</div>
	);
};

export default SecondSlider;
