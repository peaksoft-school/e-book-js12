import { useState, useEffect } from 'react';
import CustomBasketButton from '@/src/ui/customButton/CustomBasketButton';
import { useLazyGetPromoQuery } from '@/src/redux/api/promo';
import { Modal } from 'antd';
import scss from './PromoCode.module.scss';
import { IconPromoPage } from '@/src/assets/icons';
import { useNavigate } from 'react-router-dom';

interface Book {
	id: number;
	images: string;
	title: string;
	authorsFullName: string;
	price: number;
	disCount: number;
	newPricePromoCodeBook: number;
}

const PromoSection = () => {
	const [promoCode, setPromoCode] = useState('');
	const [foundBooks, setFoundBooks] = useState<Book[]>([]);
	const [foundBooksCount, setFoundBooksCount] = useState(0);
	const [promoModal, setPromoModal] = useState(false);
	const [page, setPage] = useState<number>(12);

	const navigate = useNavigate();

	const [trigger, { data }] = useLazyGetPromoQuery();

	useEffect(() => {
		if (data) {
			let books: Book[] = [];
			data.allBooksByVendors.forEach((item: Book) => {
				books = books.concat(item);
			});
			setFoundBooks(books);
			setFoundBooksCount(books.length);
		}
	}, [data]);

	const handleActivateClick = async () => {
		try {
			await trigger({ promoCode }).unwrap();
		} catch (error) {
			console.error('Error fetching promo data:', error);
			setPromoModal(true);
		}
	};

	return (
		<section className={scss.PromoSection}>
			<div className="container">
				<div className={scss.content}>
					<div className={scss.promo_content}>
						<div className={scss.promo_image}>
							<div className={scss.promo_page_img}>
								<IconPromoPage />
							</div>
						</div>
						<div className={scss.useage_promo}>
							<p className={scss.text}>Активация промокода eBook</p>
							<div className={scss.promo_form}>
								<input
									type="text"
									placeholder="Введите промокод"
									value={promoCode}
									onKeyPress={(e) => {
										if (e.key === 'Enter') {
											handleActivateClick();
										}
									}}
									onChange={(e) => setPromoCode(e.target.value)}
								/>
								<CustomBasketButton
									onClick={() => handleActivateClick()}
									nameClass={scss.promo_add_btn}
									type={'submit'}
								>
									Активировать
								</CustomBasketButton>
							</div>
							<p>
								Промокоды eBook на скидки и подарки вы можете получить в
								рассылках.
							</p>
						</div>
						<div className={scss.count_book}>
							Найдены {foundBooksCount} книг
						</div>
					</div>
					{foundBooks.length > 0 && (
						<div className={scss.container_books}>
							{foundBooks.slice(0, page).map((book) => (
								<div
									onClick={() => navigate(`/${book.id}`)}
									key={book.id}
									className={scss.card_book}
								>
									<img src={book.images} alt={book.title} />
									<div className={scss.description}>
										<h3>{book.title}</h3>
										<p>{book.authorsFullName}</p>
										<div className={scss.info_price}>
											<p>{book.disCount}%</p>
											<p>{book.price} с</p>
											<p>{book.newPricePromoCodeBook} с</p>
										</div>
									</div>
								</div>
							))}
						</div>
					)}
					{foundBooksCount > page && (
						<div className={scss.btn_morebookk}>
							<button
								onClick={() => {
									setPage(page + 12);
								}}
							>
								Смотреть больше
							</button>
						</div>
					)}
				</div>
			</div>
			<Modal
				open={promoModal}
				footer={null}
				className={scss.modal_promo}
				onCancel={() => setPromoModal(false)}
			>
				<div className={scss.promo_modal_content}>
					<p>Введены неверные символы в коде купона</p>
					<button onClick={() => setPromoModal(false)}>Ok</button>
				</div>
			</Modal>
		</section>
	);
};

export default PromoSection;
