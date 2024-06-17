import { useGetAudioBookQuery } from '@/src/redux/api/book';
import scss from './AudioBooks.module.scss';

const AudioBookSection = () => {
	const { data } = useGetAudioBookQuery();
	console.log(data);

	return (
		<section id="audioBook" className={scss.AudioBooksSection}>
			<div className="container">
				<>
					<div className={scss.content}>
						<div>
							<div className={scss.title_audio_books}>
								<h5>Аудиокниги</h5>
								<p>Смотреть все</p>
							</div>
							<div className={scss.books_container}>
								{data?.map((item) => (
									<>
										<div className={scss.book_first}>
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
									</>
								))}
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
				</>
			</div>
		</section>
	);
};

export default AudioBookSection;