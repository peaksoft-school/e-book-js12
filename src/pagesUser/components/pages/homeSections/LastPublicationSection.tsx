/* eslint-disable @typescript-eslint/no-explicit-any */
import { FC, useEffect, useState } from 'react';
import scss from './LastPublication.module.scss';
import { IconLongLine, IconShortLine } from '@/src/assets/icons';
import { Link } from 'react-router-dom';
import { useGetLastPublicationQuery } from '@/src/redux/api/book';

const LastPublicationSection: FC = () => {
	const [state, setState] = useState('BOOKS_FOR_CHILDREN');
	const [expandedCards, setExpandedCards] = useState<{
		[key: number]: boolean;
	}>({});
	const { data } = useGetLastPublicationQuery({
		page: 1,
		size: 1,
		genre: state
	});
	console.log(data);
	const [navClicked, setNavClicked] = useState(() => {
		const savedNavClicked = localStorage.getItem('navClicked');
		return savedNavClicked ? JSON.parse(savedNavClicked) : false;
	});

	useEffect(() => {
		localStorage.setItem('navClicked', JSON.stringify(navClicked));
	}, [navClicked]);

	const handleClick = () => {
		setNavClicked((prevNavClicked: any) => !prevNavClicked);
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
									<li>
										<button
											onClick={() => {
												handleClick();
												setState('BUSINESS_LITERATURE');
											}}
											className={navClicked ? 'active' : ''}
										>
											Бизнес-литература
										</button>
									</li>
								</ul>
								<ul>
									<li>
										<button
											onClick={() => {
												handleClick();
												setState('BOOKS_FOR_CHILDREN');
											}}
											className={navClicked ? 'active' : ''}
										>
											Детские книги
										</button>
									</li>
								</ul>
								<ul>
									<li>
										<button
											onClick={() => {
												handleClick();
												setState('HOBBIES');
											}}
											className={navClicked ? 'active' : ''}
										>
											Хобби и досуг
										</button>
									</li>
								</ul>
								<ul>
									<li>
										<button
											onClick={() => {
												handleClick();
												setState('COMMUNITY');
											}}
											className={navClicked ? 'active' : ''}
										>
											Сообщество
										</button>
									</li>
								</ul>
								<ul>
									<li>
										<button
											onClick={() => {
												handleClick();
												setState('ARTISTIC_LITERATURE');
											}}
											className={navClicked ? 'active' : ''}
										>
											Художественная литература
										</button>
									</li>
								</ul>
								<ul>
									<li>
										<button
											onClick={() => {
												handleClick();
												setState('EDUCATION');
											}}
											className={navClicked ? 'active' : ''}
										>
											Образование
										</button>
									</li>
								</ul>
							</div>
							{data?.map((el) => (
								<div className={scss.main_image}>
									<div className={scss.image_container}>
										<IconShortLine />
										<IconLongLine />
										<img
											className={scss.book_image}
											src={el.imageUrl}
											alt="ghjkl;"
										/>
										<IconLongLine />
										<IconShortLine />
									</div>
								</div>
							))}
						</div>
						{data?.map((el) => (
							<div className={scss.main_about}>
								<h2 className={scss.title_book}>{el.title}</h2>
								<div
									className={scss.about_book}
									onClick={() => {
										handleShowFullText(el.id);
									}}
								>
									{expandedCards[el.id] ? (
										<p className="description">{el.description}</p>
									) : (
										<p>{el.description.substring(0, 285)}...</p>
									)}
								</div>
								<div className={scss.about_book_footer}>
									<a className={scss.nav_to_all} href="#">
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
