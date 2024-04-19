import { useState } from 'react';
import XIcon from '@/src/assets/icons/icon-x';
import Modal from './Modal';
import scss from '../../ui/customModals/Style.module.scss';

const ErrorPromoModal = () => {
	const [isOpen, setIsOpen] = useState(false);

	const closeModal = () => {
		setIsOpen(!isOpen);
	};

	return (
		<>
			<Modal isOpen={isOpen} onClose={closeModal}>
				<div className={scss.errorPromoContainer}>
					<span className={scss.exit} onClick={closeModal}>
						<XIcon />
					</span>
					<div className={scss.box}>
						<p className={scss.text}>Введены неверные символы в коде купона</p>
						<button className={scss.okButton}>ОК</button>
					</div>
				</div>
			</Modal>
		</>
	);
};

export default ErrorPromoModal;
