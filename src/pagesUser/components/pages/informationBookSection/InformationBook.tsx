/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-irregular-whitespace */
import scss from './Information.module.scss';
import { FC, useState } from 'react';
import CustomBasketButton from '@/src/ui/customButton/CustomBasketButton';
import CustomPersonalAreaButton from '@/src/ui/customButton/CustomPersonalArea';
import harryPotter from '../../../../assets/booksImg/harrry-potter.png';
import {
	useAddBookToBasketMutation,
	useGetBookByIdQuery
} from '@/src/redux/api/bookInfo';
import { useParams } from 'react-router-dom';

interface BookIdProps {
	id: string | number;
}

interface GetResponse {
	data: BookData;
	isLoading: boolean;
	error: any;
}

interface BookData {
	id?: number | string;
	image: string;
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
	const paramsId = useParams();
	const bookId = String(paramsId.id);
	const { data, isLoading, error } = useGetBookByIdQuery<GetResponse>(bookId);
	const [addBookToBasket] = useAddBookToBasketMutation();
	console.log('error:', error);

	const handleAddBookToBasket = async (id: string) => {
		console.log(id);
		await addBookToBasket(id);
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
								<p>Главная / Психология</p>
								<h4>/ {data.title}</h4>
							</div>
							<div className={scss.contents_book}>
								<div className={scss.section_about_book}>
									<div className={scss.woman_book}>
										<img src={harryPotter} alt="Harry Potter" />
									</div>
								</div>
								<div className={scss.section_content_text}>
									<div className={scss.section_title}>
										<h3>{data?.title}</h3>
									</div>
									<div className={scss.section_mony}>
										<p>{data?.price} $</p>
									</div>
									<div className={scss.section_info}>
										<div className={scss.section_info_name}>
											<p>Автор</p>
											<p>Жанр</p>
											<p>Язык</p>
											<p>Издательство</p>
											<p>Год выпуска</p>
											<p>Объем</p>
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
														<p>{data?.volume}</p>
													</div>
												</>
											}
										</div>
									</div>
									<div className={scss.section_boot}>
										<CustomPersonalAreaButton
											nameClass={scss.favorite_btn}
											onClick={() => {}}
										>
											<p className={scss.boot1}>В избранное</p>
										</CustomPersonalAreaButton>
										<CustomBasketButton
											nameClass={scss.basket_btn}
											onClick={() => {
												handleAddBookToBasket(bookId);
												console.log(data);
											}}
										>
											<p className={scss.boot1}>Добавить в корзину</p>
										</CustomBasketButton>
									</div>
								</div>
							</div>
							<div className={scss.section_text_books}>
								<div className={scss.section_show_info}>
									<div className={scss.show_info_book}>
										<p
											className={showBookInfo ? '' : scss.color_text}
											onClick={() => setShowBookInfo(false)}
										>
											О книге
										</p>
										<p
											className={showBookInfo ? scss.color_text : ''}
											onClick={() => setShowBookInfo(true)}
										>
											Читать фрагмент
										</p>
									</div>
									<p className={scss.book_info}>
										{showBookInfo ? (
											<>{data.description}</>
										) : (
											<>{data.description}</>
										)}
									</p>
								</div>
								<div className={scss.info_img}>
									{/* <img src={''} alt="Book List" /> */}
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
