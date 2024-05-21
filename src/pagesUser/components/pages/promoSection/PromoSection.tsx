import scss from './PromoCode.module.scss';
import CustomBasketButton from '@/src/ui/customButton/CustomBasketButton';
import bg_promo from '../../../../assets/booksImg/Discount-cuate 1.png';
import mark_book from '../../../../assets/booksImg/img-Mark-Meson.png';
import { Modal } from 'antd';
import { useState } from 'react';

const data_book = [
	{
		id: 1,
		img: mark_book,
		title: 'Тонкое искусство пофигизма',
		auth: 'Марк Мэнсон',
		promo: '(-20%)',
		discount: '345 с',
		price: '345 с'
	},
	{
		id: 2,
		img: mark_book,
		title: 'Тонкое искусство пофигизма',
		auth: 'Марк Мэнсон',
		promo: '(-20%)',
		discount: '345 с',
		price: '345 с'
	},
	{
		id: 2,
		img: mark_book,
		title: 'Тонкое искусство пофигизма',
		auth: 'Марк Мэнсон',
		promo: '(-20%)',
		discount: '345 с',
		price: '345 с'
	},
	{
		id: 2,
		img: mark_book,
		title: 'Тонкое искусство пофигизма',
		auth: 'Марк Мэнсон',
		promo: '(-20%)',
		discount: '345 с',
		price: '345 с'
	},
	{
		id: 2,
		img: mark_book,
		title: 'Тонкое искусство пофигизма',
		auth: 'Марк Мэнсон',
		promo: '(-20%)',
		discount: '345 с',
		price: '345 с'
	},
	{
		id: 2,
		img: mark_book,
		title: 'Тонкое искусство пофигизма',
		auth: 'Марк Мэнсон',
		promo: '(-20%)',
		discount: '345 с',
		price: '345 с'
	},
	{
		id: 2,
		img: mark_book,
		title: 'Тонкое искусство пофигизма',
		auth: 'Марк Мэнсон',
		promo: '(-20%)',
		discount: '345 с',
		price: '345 с'
	}
];
const PromoSection = () => {
	const [promoModal, setPromoModal] = useState(false);
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
								<input type="text" placeholder="Введите промокод" />
								<CustomBasketButton
									onClick={() => {
										setPromoModal(true);
									}}
									nameClass={scss.promo_add_btn}
								>
									Активировать
								</CustomBasketButton>
							</div>
							<Modal
								open={promoModal}
								footer={false}
								className={scss.modal_promo}
								onCancel={() => setPromoModal(false)}
							>
								<div className={scss.promo_modal_content}>
									<p>Введены неверные символы в коде купона</p>
									<button
										onClick={() => {
											setPromoModal(false);
										}}
									>
										Ok
									</button>
								</div>
							</Modal>
							<p>
								Промокоды eBook на скидки и подарки вы можете получить в
								рассылках.
							</p>
						</div>
					</div>
					<div className={scss.count_book}>
						<p>Найдены 2344 книг</p>
					</div>
					<div className={scss.container_books}>
						{data_book.map((item) => (
							<div key={item.id} className={scss.card_book}>
								<img src={item.img} alt="" />
								<div className={scss.description}>
									<h3>{item.title}</h3>
									<p>{item.auth}</p>
									<div className={scss.info_price}>
										<p>{item.promo}</p>
										<p>{item.discount}</p>
										<p>{item.price}</p>
									</div>
								</div>
							</div>
						))}
					</div>
				</div>
			</div>
		</section>
	);
};

export default PromoSection;
