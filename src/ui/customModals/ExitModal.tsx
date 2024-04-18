import { useState } from 'react';
import Modal from './Modal';
import scss from '../../ui/customModals/Style.module.scss'

const ExitModal = () => {
	const [isOpen, setIsOpen] = useState(false);

	const closeModal = () => {
		setIsOpen(!isOpen);
	};

	return (
		<>
			<Modal isOpen={isOpen} onClose={closeModal}>
				<div className={scss.exitContainer}>
					<p className={scss.text}>Вы уверены, что хотите выйти?</p>
					<div className={scss.buttonsBox}>
						<button className={scss.cancel} onClick={closeModal}>
							Отменить
						</button>
						<button className={scss.logout}>Выйти</button>
					</div>
				</div>
			</Modal>
		</>
	);
};

export default ExitModal;
