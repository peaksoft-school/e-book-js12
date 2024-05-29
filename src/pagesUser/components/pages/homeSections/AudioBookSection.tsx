import { useGetAudioBookQuery } from '@/src/redux/api/book';
import scss from './AudioBooks.module.scss';
import { IconNewIcon } from '@/src/assets/icons';

const AudioBookSection = () => {
	const { data } = useGetAudioBookQuery();
	console.log(data);

	return (
		<section className={scss.AudioBooks}>
			<div className="container">
				{data?.map((index) => (
					<>
						<div className={scss.content}>
							<div key={index.id}>
								<div className={scss.title_audio_books}>
									<h5>Аудиокниги</h5>
									<p>Смотреть все</p>
								</div>
								<div className={scss.books_container}>
									<div className={scss.book_first}>
										<img src={index.imageUrl} alt={index.title} />
										<div className={scss.about_book}>
											<h5>{index.title}</h5>
											<p>{index.authFullName}</p>
											<div className={scss.description_book}>
												<p>{index.duration}</p>
												<h6>{index.price} с</h6>
											</div>
										</div>
									</div>
									<div className={scss.book_second}>
										<div className={scss.new_book_container}>
											<IconNewIcon />
										</div>

										<img src={index.imageUrl} alt={index.title} />
										<div className={scss.about_book}>
											<h5>{index.title}</h5>
											<p>{index.authFullName}</p>
											<div className={scss.description_book}>
												<p>{index.duration}</p>
												<h6>{index.price} c</h6>
											</div>
										</div>
									</div>
									<div className={scss.book_third}>
										<img src={index.imageUrl} alt="" />
										<div className={scss.about_book}>
											<h5>{index.title}</h5>
											<p>{index.authFullName}</p>
											<div className={scss.description_book}>
												<p>{index.duration}</p>
												<h6>{index.price} c</h6>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</>
				))}
			</div>
		</section>
	);
};

export default AudioBookSection;
