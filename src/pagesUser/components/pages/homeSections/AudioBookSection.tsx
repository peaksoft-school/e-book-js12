import { useGetAudioBookQuery } from '@/src/redux/api/book';
import scss from './AudioBooks.module.scss';
import IconGirl from '@/src/assets/icons/icon-girl';
import { Link } from 'react-router-dom';

const AudioBookSection = () => {
	const { data, error, isLoading } = useGetAudioBookQuery({
		page: 1,
		size: 3
	});
	console.log(data);

	if (isLoading) return <p>Загрузка...</p>;
	if (error) return <p>Ошибка загрузки данных</p>;

	return (
		<section id="audioBook" className={scss.AudioBooksSection}>
			<div className="container">
				<div className={scss.content}>
					<div>
						<div className={scss.title_audio_books}>
							<h5>Аудиокниги</h5>

							<Link to={'/search_book'} className={scss.pi}>
								{' '}
								Смотреть все
							</Link>
						</div>
						<div className={scss.books_container}>
							{data && data.length > 0 ? (
								data.map((item) => (
									<div key={item.id} className={scss.book_first}>
										<img src={item.imageUrl} alt={item.title} />
										<div className={scss.about_book}>
											<h5>{item.title}</h5>
											<p>{item.authFullName}</p>
											<div className={scss.description_book}>
												<p>{item.duration}</p>
												<h6>{item.price} с</h6>
											</div>
										</div>
									</div>
								))
							) : (
								<div className={scss.fallback_container}>
									<IconGirl />
									<p>Нет доступных аудиокниг</p>
								</div>
							)}
							{/* <div className={scss.book_second}>
										<div className={scss.new_book_container}>
											<IconNewIcon />
										</div>
										<img src={item.imageUrl} alt={item.title} />
										<div className={scss.about_book}>
											<h5>{item.title}</h5>
											<p>{item.authFullName}</p>
											<div className={scss.description_book}>
												<p>{item.duration}</p>
												<h6>{item.price} c</h6>
											</div>
										</div>
									</div>
									<div className={scss.book_third}>
										<img src={item.imageUrl} alt="" />
										<div className={scss.about_book}>
											<h5>{item.title}</h5>
											<p>{item.authFullName}</p>
											<div className={scss.description_book}>
												<p>{item.duration}</p>
												<h6>{item.price} c</h6>
											</div>
										</div>
									</div> */}
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};

export default AudioBookSection;
