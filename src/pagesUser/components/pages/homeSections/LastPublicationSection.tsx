/* eslint-disable @typescript-eslint/no-explicit-any */
import { FC, useEffect, useState } from 'react';
import scss from './LastPublication.module.scss';
import { IconLongLine, IconShortLine } from '@/src/assets/icons';
import { Link, useNavigate } from 'react-router-dom';
import { useGetLastPublicationQuery } from '@/src/redux/api/book';

const LastPublicationSection: FC = () => {
	const [state, setState] = useState('BUSINESS_LITERATURE');
	const [expandedCards, setExpandedCards] = useState<{
		[key: number]: boolean;
	}>({});
	const { data } = useGetLastPublicationQuery({
		page: 1,
		size: 1,
		genre: state
	});

	const [navClicked, setNavClicked] = useState(() => {
		const savedNavClicked = localStorage.getItem('navClicked');
		return savedNavClicked
			? JSON.parse(savedNavClicked)
			: 'BUSINESS_LITERATURE';
	});

	const navigate = useNavigate();
	useEffect(() => {
		localStorage.setItem('navClicked', JSON.stringify(navClicked));
	}, [navClicked]);

	const handleClick = (newState: string) => {
		setNavClicked(newState);
		setState(newState);
	};

	const handleShowFullText = (id: number) => {
		setExpandedCards((prevExpanded) => ({
			...prevExpanded,
			[id]: !prevExpanded[id]
		}));
	};

	return (
		<section className={scss.LastPublicationSection}>
			<div className="container">
				<div className={scss.content}>
					<div className={scss.section_header}>
						<h1 className={scss.section_title}>Последние публикации</h1>
						<Link to={'/search_book'} className={scss.nav_to_all}>
							Смотреть все
						</Link>
					</div>
					<div className={scss.section_main}>
						<div className={scss.content_book}>
							<div className={scss.main_nav}>
								<ul>
									<li onClick={() => handleClick('BUSINESS_LITERATURE')}>
										<button
											className={
												navClicked === 'BUSINESS_LITERATURE' ? scss.active : ''
											}
										>
											Бизнес-литература
										</button>
									</li>
									<li onClick={() => handleClick('BOOKS_FOR_CHILDREN')}>
										<button
											className={
												navClicked === 'BOOKS_FOR_CHILDREN' ? scss.active : ''
											}
										>
											Детские книги
										</button>
									</li>
									<li onClick={() => handleClick('HOBBIES')}>
										<button
											className={navClicked === 'HOBBIES' ? scss.active : ''}
										>
											Хобби
										</button>
									</li>
									<li onClick={() => handleClick('COMMUNITY')}>
										<button
											className={navClicked === 'COMMUNITY' ? scss.active : ''}
										>
											Сообщество
										</button>
									</li>
									<li onClick={() => handleClick('ARTISTIC_LITERATURE')}>
										<button
											className={
												navClicked === 'ARTISTIC_LITERATURE' ? scss.active : ''
											}
										>
											Художественная литература
										</button>
									</li>
									<li onClick={() => handleClick('EDUCATION')}>
										<button
											className={navClicked === 'EDUCATION' ? scss.active : ''}
										>
											Образование
										</button>
									</li>
								</ul>
							</div>
							{data?.map((el) => (
								<div key={el.id} className={scss.main_image}>
									<div className={scss.image_container}>
										<IconShortLine />
										<IconLongLine />

										<img
											className={scss.book_image}
											src={el.imageUrl}
											alt={el.title}
										/>

										<IconLongLine />
										<IconShortLine />
									</div>
								</div>
							))}
						</div>
						{data?.map((el) => (
							<div key={el.id} className={scss.main_about}>
								<h2 className={scss.title_book}>{el.title}</h2>
								<div
									className={scss.about_book}
									onClick={() => handleShowFullText(el.id)}
								>
									{expandedCards[el.id] ? (
										<p className="description">{el.description}</p>
									) : (
										<p>{el.description.substring(0, 285)}...</p>
									)}
								</div>
								<div className={scss.about_book_footer}>
									<a
										className={scss.nav_to_all}
										href="#"
										onClick={() => navigate(`${el.id}`)}
									>
										Подробнее
									</a>
									<p className={scss.price}>{el.price}с</p>
								</div>
							</div>
						))}
					</div>
				</div>
			</div>
		</section>
	);
};

export default LastPublicationSection;
