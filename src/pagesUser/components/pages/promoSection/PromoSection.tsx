import scss from './PromoCode.module.scss';
import CustomBasketButton from '@/src/ui/customButton/CustomBasketButton';
import bg_promo from '../../../../assets/booksImg/Discount-cuate 1.png';
import { Modal } from 'antd';
import { useEffect, useState } from 'react';
import { useGetPromoQuery } from '@/src/redux/api/promo';

interface TypeRequest {
	page: number;
	size: number;
	allBooksByVendors: Book[];
}
interface Book {
	id: number;
	images: string[];
	title: string;
	authorsFullName: string;
	price: number;
	disCount: number;
	newPricePromoCodeBook: number;
}

const PromoSection = () => {
	const [promoCode, setPromoCode] = useState('');
	const [promoModal, setPromoModal] = useState(false);
	const [foundBooks, setFoundBooks] = useState<Book[]>([]);
	const [foundBooksCount, setFoundBooksCount] = useState(0)
	const { data } = useGetPromoQuery({ promoCode });
	console.log(data);

	useEffect(() => {
		if (data && data.length > 0 && promoModal) {
			let books: Book[] = [];
			data.forEach((item: TypeRequest) => {
				books = books.concat(item.allBooksByVendors);
			});
			setFoundBooks(books);
		}

		if (data && data.length > 0) {
			let count = 0;
			data.forEach((item: TypeRequest) => {
				count += item.allBooksByVendors.length;
			});
			setFoundBooksCount(count);
		}
	}, [data, promoModal]);

	const handleActivateClick = () => {
		setPromoModal(true);
	};

	return (
		<section className={scss.PromoSection}>
			<div className="container">
				<div className={scss.content}>
					<div className={scss.promo_content}>
						<div className={scss.promo_image}>
							<img src={bg_promo} alt="" />
						</div>
						<div className={scss.useage_promo}>
							<p>Активация промокода eBook</p>
							<div className={scss.promo_form}>
								<input
									type="text"
									placeholder="Введите промокод"
									value={promoCode}
									onChange={(e) => setPromoCode(e.target.value)}
								/>
								<CustomBasketButton
									onClick={handleActivateClick}
									nameClass={scss.promo_add_btn}
								>
									Активировать
								</CustomBasketButton>
							</div>
							<Modal
								open={promoModal}
								footer={true}
								className={scss.modal_promo}
								onCancel={() => setPromoModal(false)}
							>
								<div className={scss.promo_modal_content}>
									<p>Введены неверные символы в коде купона</p>
									<button onClick={() => setPromoModal(false)}>Ok</button>
								</div>
							</Modal>
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
							{foundBooks.map((book) => (
								<div key={book.id} className={scss.card_book}>
									<img src={book.images[0]} alt={book.title} />
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
				</div>
			</div>
		</section>
	);
};

export default PromoSection;
