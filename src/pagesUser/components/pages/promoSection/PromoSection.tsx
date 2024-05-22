import scss from './PromoCode.module.scss';
import CustomBasketButton from '@/src/ui/customButton/CustomBasketButton';
import bg_promo from '../../../../assets/booksImg/Discount-cuate 1.png';
import { Modal } from 'antd';
import { useState } from 'react';
import { useGetPromoQuery } from '@/src/redux/api/promo';




const PromoSection = () => {
	const [promoCode, setPromoCode] = useState('');
	const [promoModal, setPromoModal] = useState(false);
	const { data } = useGetPromoQuery<PROMO.GetBookPromoResponse>({ promoCode });
	console.log(data);

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
								footer={false}
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
					</div>
					<div className={scss.count_book}>
					</div>
					<div className={scss.container_books}>
						{data?.map((item: PROMO.GetBookPromoResponse) => (
							<>
								{item.allBooksByVendors.map((book) => (
									<>
								<div key={book.id} className={scss.card_book}>
									<img src={book.images[0]} alt={book.title} />
									<div className={scss.description}>
										<h3>{book.title}</h3>
										<p>{book.authorsFullName}</p>
										<div className={scss.info_price}>
											<p>{book.disCount}%</p>
											<p>{book.newPricePromoCodeBook} с</p>
											<p>{book.price} с</p>
										</div>
									</div>
								</div>
									</>
								))}
							</>
						))}
					</div>
				</div>
			</div>
		</section>
	);
};

export default PromoSection;
