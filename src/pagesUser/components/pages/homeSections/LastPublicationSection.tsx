/* eslint-disable @typescript-eslint/no-explicit-any */
import { FC, useEffect, useState } from 'react';
import scss from './LastPublication.module.scss';
import { IconLongLine, IconShortLine } from '@/src/assets/icons';
import history_book from '../../../../assets/booksImg/img-History-books.png';

const LastPublicationSection: FC = () => {
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

	return (
		<section className={scss.last_publication}>
			<div className="container">
				<div className={scss.content}>
					<div className={scss.section_header}>
						<h1 className={scss.section_title}>Последние публикации</h1>
						<a href="#" className={scss.nav_to_all}>
							Смотреть все
						</a>
					</div>
					<div className={scss.section_main}>
						<div className={scss.content_book}>
							<div className={scss.main_nav}>
								<ul>
									<li>
										<button
											onClick={handleClick}
											className={navClicked ? 'active' : ''}
										>
											Бизнес-литература
										</button>
									</li>
								</ul>
								<ul>
									<li>
										<button
											onClick={handleClick}
											className={navClicked ? 'active' : ''}
										>
											Детские книги
										</button>
									</li>
								</ul>
								<ul>
									<li>
										<button
											onClick={handleClick}
											className={navClicked ? 'active' : ''}
										>
											Хобби и досуг
										</button>
									</li>
								</ul>
								<ul>
									<li>
										<button
											onClick={handleClick}
											className={navClicked ? 'active' : ''}
										>
											Публицистика
										</button>
									</li>
								</ul>
								<ul>
									<li>
										<button
											onClick={handleClick}
											className={navClicked ? 'active' : ''}
										>
											Учебная литература
										</button>
									</li>
								</ul>
								<ul>
									<li>
										<button
											onClick={handleClick}
											className={navClicked ? 'active' : ''}
										>
											Поэзия
										</button>
									</li>
								</ul>
							</div>
							<div className={scss.main_image}>
								<div className={scss.image_container}>
									<IconShortLine />
									<IconLongLine />
									<img
										className={scss.book_image}
										src={history_book}
										alt="ghjkl;"
									/>
									<IconLongLine />
									<IconShortLine />
								</div>
							</div>
						</div>
						<div className={scss.main_about}>
							<h2 className={scss.title_book}>История книги</h2>
							<p className={scss.about_book}>
								Предлагаемый перевод является первой попыткой обращения к
								творчеству Павла Орозия — римского христианского историка начала
								V века, сподвижника и современника знаменитого Августина
								Блаженн...
							</p>
							<div className={scss.about_book_footer}>
								<a className={scss.nav_to_all} href="#">
									Подробнее
								</a>
								<p className={scss.price}>456 с</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};

export default LastPublicationSection;
