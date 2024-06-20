/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-irregular-whitespace */
import scss from './Information.module.scss';
import { FC, useState } from 'react';
import CustomBasketButton from '@/src/ui/customButton/CustomBasketButton';
import CustomPersonalAreaButton from '@/src/ui/customButton/CustomPersonalArea';
import { useNavigate, useParams } from 'react-router-dom';
import { useGetBookByIdQuery } from '@/src/redux/api/book';
import { useAddBookToBasketMutation } from '@/src/redux/api/basket';
import { usePostFavoriteUnFavoriteMutation } from '@/src/redux/api/favorite';

interface TypeGetById {
	data: BookData;
	isLoading: boolean;
	error: any;
}

interface BookData {
	id?: number;
	imageUrlFirst: string;
	imageUrlLast: string;
	bookType: string;
	title: string;
	authorsFullName: string;
	genre: string;
	publishingHouse: string;
	description: string;
	fragment: string;
	language: string;
	publishedYear: number;
	volume: number;
	discount: number;
	price: number;
	fragmentAudUrl: string;
	duration: string;
	statusBook: string;
}

const genres = [
	{
		genreId: 1,
		genreName: 'ХУДОЖЕСТВЕННАЯ ЛИТЕРАТУРА',
		englishName: 'ARTISTIC_LITERATURE',
		isChecked: false
	},
	{
		genreId: 2,
		genreName: 'ОБРАЗОВАНИЕ',
		englishName: 'EDUCATION',
		isChecked: false
	},
	{
		genreId: 3,
		genreName: 'КНИГИ ДЛЯ ДЕТЕЙ',
		englishName: 'BOOKS_FOR_CHILDREN',
		isChecked: false
	},
	{
		genreId: 4,
		genreName: 'НАУКА И ТЕХНОЛОГИЯ',
		englishName: 'SCIENCE_AND_TECHNOLOGY',
		isChecked: false
	},
	{
		genreId: 5,
		genreName: 'СООБЩЕСТВО',
		englishName: 'COMMUNITY',
		isChecked: false
	},
	{
		genreId: 6,
		genreName: 'БИЗНЕС ЛИТЕРАТУРА',
		englishName: 'BUSINESS_LITERATURE',
		isChecked: false
	},
	{
		genreId: 7,
		genreName: 'КРАСОТА, ЗДОРОВЬЕ, СПОРТ',
		englishName: 'BEAUTY_HEALTH_SPORT',
		isChecked: false
	},
	{
		genreId: 8,
		genreName: 'УВЛЕЧЕНИЯ',
		englishName: 'HOBBIES',
		isChecked: false
	},
	{
		genreId: 9,
		genreName: 'ПСИХОЛОГИЯ',
		englishName: 'PSYCHOLOGY',
		isChecked: false
	}
];

const InformationBook: FC = () => {
	const [showBookInfo, setShowBookInfo] = useState(false);

	const { id } = useParams();
	const bookId = Number(id);

	const navigate = useNavigate();
	const { data, isLoading } = useGetBookByIdQuery<TypeGetById>(bookId);
	const [addBookToBasket] = useAddBookToBasketMutation();
	const [addBookToFavorite] = usePostFavoriteUnFavoriteMutation();

	const handleAddBookToBasket = async (id: number) => {
		await addBookToBasket(id);
	};
	const handleAddBookToFavorite = async (id: number) => {
		await addBookToFavorite(id);
	};

	const genreBook = genres.find((item) => item.genreId === bookId);

	return (
		<section className={scss.InformationBookSection}>
			<div className="container">
				<div className={scss.content}>
					{isLoading ? (
						<>
							<h1>IsLoading...</h1>
						</>
					) : (
						<>
							<div className={scss.content_text}>
								<p>
									<span
										onClick={() => {
											navigate('/');
										}}
									>
										Главная
									</span>
									/{' '}
									<span>
										{genreBook ? genreBook.genreName : 'Жанр не найден'}
									</span>
								</p>
								/ <h4>{data.title}</h4>
							</div>
							<div className={scss.contents_book}>
								<div className={scss.section_about_book}>
									<div className={scss.woman_book}>
										<img src={data.imageUrlFirst} alt="book" />
									</div>
								</div>
								<div className={scss.section_content_text}>
									<div className={scss.section_title}>
										<h3>{data?.title}</h3>
									</div>
									<div className={scss.section_mony}>
										<p>{data?.price} с</p>
										{data.bookType === 'AUDIO_BOOK' ? (
											<>
												<div>
													<audio id="audioPlayer" controls>
														<source
															src={data.fragmentAudUrl}
															type="audio/mpeg"
														/>
													</audio>
												</div>
											</>
										) : null}
									</div>

									<div className={scss.section_info}>
										<div className={scss.section_info_name}>
											<p>Автор</p>
											<p>Жанр</p>
											<p>Язык</p>
											<p>Издательство</p>
											<p>Год выпуска</p>
											{data.bookType === 'AUDIO_BOOK' ? (
												<>
													<p>Длительность</p>
												</>
											) : (
												<>
													<p>Объем</p>
												</>
											)}
										</div>
										<div className={scss.section_info_two}>
											{
												<>
													<div className={scss.section_info_two} key={data?.id}>
														<p>{data?.authorsFullName}</p>
														<p>{data?.genre}</p>
														<p>{data?.language}</p>
														<p>{data?.publishingHouse}</p>
														<p>{data?.publishedYear}</p>
														{data.bookType === 'AUDIO_BOOK' ? (
															<>
																<p>
																	{data?.duration === null ? 0 : data.duration}
																</p>
															</>
														) : (
															<>
																<p>{data?.volume}</p>
															</>
														)}
													</div>
												</>
											}
										</div>
									</div>
									<div className={scss.section_boot}>
										<CustomPersonalAreaButton
											nameClass={scss.favorite_btn}
											onClick={() => {
												handleAddBookToFavorite(bookId);
											}}
										>
											<p className={scss.boot_one}>В избранное</p>
										</CustomPersonalAreaButton>
										<CustomBasketButton
											nameClass={scss.basket_btn}
											onClick={() => {
												handleAddBookToBasket(bookId);
											}}
										>
											<p className={scss.boot_one}>Добавить в корзину</p>
										</CustomBasketButton>
									</div>
								</div>
							</div>
							<div className={scss.section_text_books}>
								<div className={scss.section_show_info}>
									<div className={scss.show_info_book}>
										<p
											className={!showBookInfo ? scss.color_text : ''}
											onClick={() => setShowBookInfo(false)}
										>
											О книге
										</p>
										{data.bookType === 'PAPER_BOOK' && (
											<p
												className={showBookInfo ? scss.color_text : ''}
												onClick={() => setShowBookInfo(true)}
											>
												Читать фрагмент
											</p>
										)}
									</div>
									<p className={scss.book_info}>
										{showBookInfo ? data.fragment || '' : data.description}
									</p>
								</div>
								<div className={scss.info_img}>
									<img src={data.imageUrlLast} alt="Book List" />
								</div>
							</div>
						</>
					)}
				</div>
			</div>
		</section>
	);
};

export default InformationBook;
