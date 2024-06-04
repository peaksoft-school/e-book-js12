/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-irregular-whitespace */
import scss from './Information.module.scss';
import { FC, useState } from 'react';
import CustomBasketButton from '@/src/ui/customButton/CustomBasketButton';
import CustomPersonalAreaButton from '@/src/ui/customButton/CustomPersonalArea';
import {
	useAddBookToBasketMutation,
	useAddBookToFavoriteMutation
} from '@/src/redux/api/bookInfo';
import { useNavigate, useParams } from 'react-router-dom';
import { useGetBookByIdQuery } from '@/src/redux/api/book';

interface BookIdProps {
	id: number;
}

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

const InformationBook: FC<BookIdProps> = () => {
	const [showBookInfo, setShowBookInfo] = useState(false);
	const { id } = useParams();
	const bookId = Number(id);

	const navigate = useNavigate();
	const { data, isLoading } = useGetBookByIdQuery<TypeGetById>(bookId);
	const [addBookToBasket] = useAddBookToBasketMutation();
	const [addBookToFavorite] = useAddBookToFavoriteMutation();

	const handleAddBookToBasket = async (id: number) => {
		await addBookToBasket(id);
	};
	const handleAddBookToFavorite = async (id: number) => {
		await addBookToFavorite(id);
	};

	return (
		<section className={scss.Book_info}>
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
									</span>{' '}
									/ <span>{data.genre}</span>
								</p>
								/ <h4> {data.title}</h4>
							</div>
							<div className={scss.contents_book}>
								<div className={scss.section_about_book}>
									<div className={scss.woman_book}>
										<img src={data.imageUrlFirst} alt="Harry Potter" />
									</div>
								</div>
								<div className={scss.section_content_text}>
									<div className={scss.section_title}>
										<h3>{data?.title}</h3>
									</div>
									<div className={scss.section_mony}>
										<p>{data?.price} $</p>
										{data.bookType === 'AUDIO_BOOK' ? (
											<>
												<div>
													<audio id="audioPlayer" controls>
														<source
															src="path_to_your_audio_file.mp3"
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
																<p>{data?.duration}</p>
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
										{data.bookType === 'PAPER_BOOK' ? (
											<>
												{' '}
												<p
													className={showBookInfo ? scss.color_text : ''}
													onClick={() => setShowBookInfo(true)}
												>
													Читать фрагмент
												</p>
											</>
										) : null}
										<p
											className={showBookInfo ? '' : scss.color_text}
											onClick={() => setShowBookInfo(false)}
										>
											О книге
										</p>
									</div>
									<p className={scss.book_info}>
										{showBookInfo ? (
											<>{data.description}</>
										) : (
											<>{data.fragment}</>
										)}
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
