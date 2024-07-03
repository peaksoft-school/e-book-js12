import scss from './Information.module.scss';
import { FC, useState } from 'react';
import CustomBasketButton from '@/src/ui/customButton/CustomBasketButton';
import CustomPersonalAreaButton from '@/src/ui/customButton/CustomPersonalArea';
import { useNavigate, useParams } from 'react-router-dom';
import { useGetBookByIdQuery } from '@/src/redux/api/book';
import { useAddBookToBasketMutation } from '@/src/redux/api/basket';
import { usePostFavoriteUnFavoriteMutation } from '@/src/redux/api/favorite';
import { Tooltip, message } from 'antd';

interface TypeGetById {
	data: BookData;
	isLoading: boolean;
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
	inBasket: boolean;
}

const genres = [
	{
		genreId: 1,
		genreName: 'Художественная литература',
		englishName: 'ARTISTIC_LITERATURE'
	},
	{
		genreId: 2,
		genreName: 'Образование',
		englishName: 'EDUCATION'
	},
	{
		genreId: 3,
		genreName: 'Книги для детей',
		englishName: 'BOOKS_FOR_CHILDREN'
	},
	{
		genreId: 4,
		genreName: 'Наука и технология',
		englishName: 'SCIENCE_AND_TECHNOLOGY'
	},
	{
		genreId: 5,
		genreName: 'Сообщество',
		englishName: 'COMMUNITY'
	},
	{
		genreId: 6,
		genreName: 'Бизнес литература',
		englishName: 'BUSINESS_LITERATURE'
	},
	{
		genreId: 7,
		genreName: 'Красота, здоровье, спорт',
		englishName: 'BEAUTY_HEALTH_SPORT'
	},
	{
		genreId: 8,
		genreName: 'Увлечения',
		englishName: 'HOBBIES'
	},
	{
		genreId: 9,
		genreName: 'Психология',
		englishName: 'PSYCHOLOGY'
	}
];

const languageData = [
	{
		genreName: 'Русский язык',
		englishName: 'RUSSIAN'
	},
	{
		genreName: 'Кыргызский язык',
		englishName: 'KYRGYZ'
	},
	{
		genreName: 'Англизский язык',
		englishName: 'ENGLISH'
	}
];

const InformationBook: FC = () => {
	const [showBookInfo, setShowBookInfo] = useState(false);
	const [messageApi, handleMessage] = message.useMessage();
	const localAuth = localStorage.getItem('client');
	const { id } = useParams();
	const bookId = Number(id);

	const navigate = useNavigate();
	const { data, isLoading, refetch } = useGetBookByIdQuery<TypeGetById>(bookId);
	const [addBookToBasket] = useAddBookToBasketMutation();
	const [addBookToFavorite] = usePostFavoriteUnFavoriteMutation();

	const handleAddBookToBasket = async (id: number, inBasket: boolean) => {
		if (localAuth === 'true') {
			if (inBasket) {
				navigate('/basket');
			} else {
				const result = await addBookToBasket(id);
				if ('data' in result) {
					if (result.data!.httpStatus === 'OK') {
						refetch();
					}
				}
			}
		} else {
			messageApi.open({
				type: 'warning',
				content: 'Необходимо  Авторизоватся',
				style: {
					marginLeft: '85%'
				}
			});
		}
	};

	const handleAddBookToFavorite = async (id: number) => {
		if (localAuth === 'true') {
			const result = await addBookToFavorite(id);
			if ('data' in result) {
				if (result.data!.httpStatus) {
					messageApi.open({
						type: 'success',
						content: result.data!.message
					});
				}
			}
		} else {
			messageApi.open({
				type: 'warning',
				content: 'Необходимо  Авторизоватся',
				style: {
					marginLeft: '85%'
				}
			});
		}
	};

	const hadnleGenre = () => {
		const genreBook = genres.find((item) => item.englishName === data.genre);
		return genreBook?.genreName;
	};

	const handleCheckedLanguage = () => {
		const languageName = languageData.find(
			(item) => item.englishName === data.language
		);
		return languageName?.genreName;
	};

	return (
		<section className={scss.InformationBookSection}>
			<div className="container">
				<div className={scss.content}>
					{handleMessage}
					{isLoading ? (
						<>
							<h1>IsLoading...</h1>
						</>
					) : (
						<>
							<div className={scss.content_text}>
								<p>
									<span onClick={() => navigate('/')}>Главная</span>/{' '}
									<span onClick={() => navigate('/search_book')}>
										{hadnleGenre() ? hadnleGenre() : 'Жанр не найден'}
									</span>
								</p>
								/{' '}
								<Tooltip
									className={scss.info_hover}
									title={data?.title.length > 20 ? data?.title : ''}
									color="black"
									placement="bottomLeft"
								>
									<h4>{data?.title}</h4>
								</Tooltip>
							</div>
							<div className={scss.contents_book}>
								<div className={scss.section_about_book}>
									<div className={scss.woman_book}>
										<img src={data.imageUrlFirst} alt="book" />
									</div>
								</div>
								<div className={scss.section_content_text}>
									<div className={scss.section_title}>
										<Tooltip
											className={scss.info_hover}
											title={data?.title.length > 20 ? data?.title : ''}
											color="black"
											placement="bottomLeft"
										>
											<h3>{data?.title}</h3>
										</Tooltip>
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
											{data.bookType !== 'AUDIO_BOOK' && <p>Издательство</p>}
											<p>Год выпуска</p>
											{data.bookType === 'AUDIO_BOOK' ? (
												<p>Длительность</p>
											) : (
												<p>Объем</p>
											)}
										</div>
										<div className={scss.section_info_two}>
											<div className={scss.section_info_two} key={data?.id}>
												<Tooltip
													className={scss.info_hover}
													title={
														data?.authorsFullName.length > 20
															? data?.authorsFullName
															: ''
													}
													color="black"
													placement="bottomLeft"
												>
													<p>{data.title}</p>
												</Tooltip>
												<p>{hadnleGenre()}</p>
												<p>{handleCheckedLanguage()}</p>
												{data.bookType !== 'AUDIO_BOOK' && (
													<Tooltip
														className={scss.info_hover}
														title={
															data?.publishingHouse.length > 20
																? data?.publishingHouse
																: ''
														}
														color="black"
														placement="bottomLeft"
													>
														<p>{data?.publishingHouse}</p>
													</Tooltip>
												)}
												<p>{data?.publishedYear}</p>
												{data.bookType === 'AUDIO_BOOK' ? (
													<p>{data?.duration === null ? 0 : data.duration}</p>
												) : (
													<p>{data?.volume}</p>
												)}
											</div>
										</div>
									</div>
									<div className={scss.section_boot}>
										<CustomPersonalAreaButton
											nameClass={scss.favorite_btn}
											onClick={() => handleAddBookToFavorite(bookId)}
										>
											<p className={scss.boot_one}>В избранное</p>
										</CustomPersonalAreaButton>
										<CustomBasketButton
											nameClass={scss.basket_btn}
											onClick={() =>
												handleAddBookToBasket(bookId, data.inBasket)
											}
										>
											<p className={scss.boot_one}>
												{data.inBasket
													? ' Перейти в корзине'
													: 'Добавить в корзину'}
											</p>
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
