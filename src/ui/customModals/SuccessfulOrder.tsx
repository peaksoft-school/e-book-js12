import { useState } from 'react';
import Modal from './Modal';
import XIcon from '@/src/assets/icons/icon-x';
import GreenCheckmark from '@/src/assets/icons/icon-greenCheckmark';
import scss from '../../ui/customModals/Style.module.scss';

const SuccessfulOrder = () => {
	const [isOpen, setIsOpen] = useState(false);

	const closeModal = () => {
		setIsOpen(!isOpen);
	};

	return (
		<>
			<Modal isOpen={isOpen} onClose={closeModal}>
				<div className={scss.successfulOrderContainer}>
					<div className={scss.topBox}>
						<span className={scss.checkmark}>
							<GreenCheckmark />
						</span>
						<span className={scss.exit} onClick={closeModal}>
							<XIcon />
						</span>
					</div>
					<div className={scss.bottomBox}>
						<p className={scss.text}>Ваш заказ успешно оформлен!</p>
						<button className={scss.continueButton}>Продолжить покупки</button>
					</div>
				</div>
			</Modal>
		</>
	);
};

export default SuccessfulOrder;
