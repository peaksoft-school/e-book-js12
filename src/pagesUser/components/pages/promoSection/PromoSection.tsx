import scss from './PromoCode.module.scss';
import CustomBasketButton from '@/src/ui/customButton/CustomBasketButton';
import bg_promo from '../../../../assets/booksImg/Discount-cuate 1.png';
import { Modal } from 'antd';
import { useState } from 'react';
import { useGetPromoQuery } from '@/src/redux/api/promo';

const PromoSection = () => {
  const [promoCode, setPromoCode] = useState('');
  const { data, isLoading } = useGetPromoQuery({ promoCode });
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
                <input
                  type="text"
                  placeholder="Введите промокод"
                  // value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value)}
                />
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
                Промокоды eBook на скидки и подарки вы можете получить в рассылках.
              </p>
            </div>
          </div>
          <div className={scss.count_book}>
            {/* <p>Найдены {data?.allBooksByVendors.length || 0} книг</p> */}
          </div>
          <div className={scss.container_books}>
            {isLoading && <p>Загрузка...</p>}
            {/* {data?.allBooksByVendors.map((item) => (
              // <div key={item.id} className={scss.card_book}>
              //   <img src={item.images[0]} alt={item.title} />
              //   <div className={scss.description}>
              //     <h3>{item.title}</h3>
              //     <p>{item.authorsFullName}</p>
              //     <div className={scss.info_price}>
              //       <p>{item.disCount}%</p>
              //       <p>{item.newPricePromoCodeBook} с</p>
              //       <p>{item.price} с</p>
              //     </div>
              //   </div>
              // </div>
            ))} */}
          </div>
        </div>
      </div>
    </section>
  );
};

export default PromoSection;
