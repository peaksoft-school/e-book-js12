import { FC, useState } from 'react';
import Slider from 'react-slick';
import './Bestsellers.css';
import IconOrangeLeftArrow from '@/src/assets/icons/icon-orangeLeftArrow';
import IconOrangeRightArrow from '@/src/assets/icons/icon-orangeRightArrow';
import { useGetAllBestsellersQuery } from '@/src/redux/api/bestsellers';

const BestsellersSection: FC = () => {
	const { data } = useGetAllBestsellersQuery();
	const [expandedCards, setExpandedCards] = useState<{
		[key: number]: boolean;
	}>({});

	const handleClick = (id: number) => {
		setExpandedCards((prevExpanded) => ({
			...prevExpanded,
			[id]: !prevExpanded[id]
		}));
	};

	const NextArrow: FC<{ onClick: () => void }> = ({ onClick }) => {
		return (
			<div className="arrow next" onClick={onClick}>
				<IconOrangeRightArrow />
			</div>
		);
	};

	const PrevArrow: FC<{ onClick: () => void }> = ({ onClick }) => {
		return (
			<div className="arrow prev" onClick={onClick}>
				<IconOrangeLeftArrow />
			</div>
		);
	};
	const [imageIndex, setImageIndex] = useState(0);
	const settings = {
		infinite: true,
		lazyLoad: 'ondemand' as const,
		speed: 500,
		slidesToShow: 3,
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
		beforeChange: (current: number, next: number) => setImageIndex(next)
	};

	return (
		<div className="container">
			<div className="title_box">
				<h2>Бестселлеры</h2>
				<p className='see_all'>Смотреть все</p>
			</div>
			<div className="containers">
				<div>
					{data &&
						data.map((item, idx) => (
							<div key={item.id} className="description-box">
								{idx === imageIndex && (
									<div className="content">
										<h2 className="name">{item.title}</h2>
										<div
											className="favorite_card_description"
											onClick={() => handleClick(item.id)}
										>
											{expandedCards[item.id] ? (
												<p className="description">{item.description}</p>
											) : (
												<p>{item.description.substring(0, 250)}...</p>
											)}
										</div>
										<div className="box">
											<p className="read-more">Подробнее</p>
											<p className="price">{item.price} c</p>
										</div>

									</div>
								)}
							</div>
						))}
				</div>
				<div>
					{data && data.length > 0 && (
						<Slider {...settings}>
							{data.map((item, idx) => (
								<div
									key={item.id}
									className={idx === imageIndex ? 'slide activeSlide' : 'slide'}
								>
									<img src={item.imageUrl} alt="img" />
								</div>
							))}
						</Slider>
					)}
				</div>
				<div>
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
				</div>
			</div>
		</div>
	);
};
export default BestsellersSection;
