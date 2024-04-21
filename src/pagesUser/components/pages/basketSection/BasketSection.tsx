import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import scss from './BasketPage.module.scss';
import imgHistory from '../../../../assets/booksImg/img-History-books.png';
import CustomPromoInput from '@/src/ui/customInpute/CustomPromoInput';
import { IconX } from '@/src/assets/icons';

interface Book {
	id: number;
	bookName: string;
	author: string;
	image: string;
	promoCode: string;
	firstPrice: number;
	salePrice: number;
	quantity: number;
}

const BasketSection: React.FC = () => {
	const [booksData, setBooksData] = useState<Book[]>([
		{
			id: 1,
			bookName: 'Гарри Поттер и тайная комната',
			author: 'Роулинг Джоан Кэтлин',
			image: imgHistory,
			promoCode: 'Промокод 20%',
			firstPrice: 545,
			salePrice: 345,
			quantity: 1
		},
		{
			id: 2,
			bookName: 'Гарри Поттер и тайная комната',
			author: 'Роулинг Джоан Кэтлин',
			image: imgHistory,
			promoCode: 'Промокод 20%',
			firstPrice: 545,
			salePrice: 400,
			quantity: 1
		},
		{
			id: 3,
			bookName: 'Гарри Поттер и тайная комната',
			author: 'Роулинг Джоан Кэтлин',
			image: imgHistory,
			promoCode: 'Промокод 20%',
			firstPrice: 545,
			salePrice: 345,
			quantity: 1
		}
	]);

	const incrementQuantity = (id: number) => {
		setBooksData((prevBooksData) =>
			prevBooksData.map((book) =>
				book.id === id ? { ...book, quantity: book.quantity + 1 } : book
			)
		);
	};

	const decrementQuantity = (id: number) => {
		setBooksData((prevBooksData) =>
			prevBooksData.map((book) =>
				book.id === id && book.quantity > 1
					? { ...book, quantity: book.quantity - 1 }
					: book
			)
		);
	};

	const calculateTotalPrice = (book: Book) => {
		return book.salePrice * book.quantity;
	};

	const totalQuantity = booksData.reduce(
		(total, book) => total + book.quantity,
		0
	);
	const totalSum = booksData.reduce(
		(total, book) => total + calculateTotalPrice(book),
		0
	);
	const discount = 456;
	const overallTotal = totalSum - discount;

	return (
		<section className={scss.basket_page}>
			<div className="container">
				<div className={scss.links}>
					<Link
						to={'/'}
						className={`${scss.link_to_home} ${location.pathname === '/' ? scss.link_to_home_active : ''}`}
					>
						Главная
					</Link>
					/
					<Link
						to={'/basket'}
						className={`${scss.link_to_basket} ${location.pathname === 'basket' ? scss.link_to_basket_active : ''}`}
					>
						Корзина
					</Link>
				</div>
				<div className={scss.content}>
					<div className={scss.left_content}>
						<div className={scss.title}>
							<h2>Ваши книги</h2>
							<p>Всего: {totalQuantity} шт</p>
						</div>
						<hr />
						<div className={scss.delete_all}>Очистить корзину</div>
						<div className={scss.all_books_in_basket}>
							{booksData.map((book) => (
								<>
									<hr />
									<div className={scss.card_container}>
										<div className={scss.book} key={book.id}>
											<div className={scss.book_img}>
												<img src={book.image} alt={book.bookName} />
											</div>
											<div className={scss.more_info_book}>
												<div className={scss.delete_x}>
													<IconX />
												</div>
												<div className={scss.book_info}>
													<h3>{book.bookName}</h3>
													<p>{book.author}</p>
													<div className={scss.prices}>
														<p>{book.promoCode}</p>
														<div className={scss.prices_with_sale}>
															<p className={scss.first_price}>
																{book.firstPrice} c
															</p>
															<p className={scss.sale_price}>
																{calculateTotalPrice(book)} c
															</p>
														</div>
													</div>
													<div className={scss.book_quantity}>
														<button onClick={() => decrementQuantity(book.id)}>
															-
														</button>
														<span>{book.quantity}</span>
														<button onClick={() => incrementQuantity(book.id)}>
															+
														</button>
													</div>
												</div>
												<div className={scss.add_to_basket}>
													<p>Добавить в избранное</p>
												</div>
											</div>
										</div>
									</div>
								</>
							))}
						</div>
					</div>
					<div className={scss.right_content}>
						<div className={scss.content}>
							<p className={scss.title}>Общая стоимость</p>
							<div className={scss.purchases}>
								<p>Количество книг:</p>
								<p>{totalQuantity} шт</p>
							</div>
							<div className={scss.purchases}>
								<p>Скидка:</p>
								<p>{discount} с</p>
							</div>
							<div className={scss.purchases}>
								<p>Сумма:</p>
								<p>{totalSum} с</p>
							</div>
							<div className={scss.promo_input}>
								<CustomPromoInput placeholder={'Введите промокод'} />
							</div>
							<div className={scss.total_price}>
								<p>Итого:</p>
								<p>{overallTotal} с</p>
							</div>
						</div>
						<button>Оформить заказ</button>
					</div>
				</div>
			</div>
		</section>
	);
};

export default BasketSection;
