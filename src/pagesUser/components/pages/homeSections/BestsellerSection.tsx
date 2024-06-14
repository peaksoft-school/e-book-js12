import { FC, useState, useEffect } from 'react';
import Slider from 'react-slick';
import 'keen-slider/keen-slider.min.css';
import { KeenSliderInstance, useKeenSlider } from 'keen-slider/react';
import './Bestsellers.css';
import IconOrangeLeftArrow from '@/src/assets/icons/icon-orangeLeftArrow';
import IconOrangeRightArrow from '@/src/assets/icons/icon-orangeRightArrow';
import { useGetAllBestsellersQuery } from '@/src/redux/api/bestsellers';
import { Link } from 'react-router-dom';

const BestsellersSection: FC = () => {
	const { data } = useGetAllBestsellersQuery();
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

	const [keenSliderRef] = useKeenSlider<HTMLDivElement>({
		loop: true,
		mode: 'snap',
		breakpoints: {
			'(min-width: 600px)': {}
		},
		created(s: KeenSliderInstance) {
			s.moveToIdx(0);
		},
		slideChanged(s: KeenSliderInstance) {
			setImageIndex(s.track.details.rel);
		}
	});

	return (
		<section className="BestsellersSection">
			<div className="container">
				<div className="content">
					<h2>Бестселлеры</h2>
					<Link to={'/search_book'} className="see_orange">
						Смотреть все
					</Link>
				</div>
				<div className="containerss">
					<div>
						{data &&
							data.map((item, idx) => (
								<div key={item.id} className="description-box_box">
									{idx === imageIndex && (
										<div className="title_box_box">
											<h2 className="name">{item.title}</h2>
											<div onClick={() => handleClick(item.id)}>
												{expandedCards[item.id] ? (
													<p className="description">{item.description}</p>
												) : (
													<p>{item.description.substring(0, 250)}...</p>
												)}
											</div>
											<div className="box_box">
												<p className="read-more">Подробнее</p>
												<p className="price">{item.price} c</p>
											</div>
										</div>
									)}
								</div>
							))}
					</div>
					<div className="jo">
						{data &&
							data.length > 0 &&
							(isMobile ? (
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
							))}
					</div>
					{data && (
						<div className="scroll-lines">
							<div
								className="active-line"
								style={{ width: `${(100 / data.length) * (imageIndex + 1)}%` }}
							></div>
						</div>
					)}
				</div>
			</div>
		</section>
	);
};

export default BestsellersSection;
