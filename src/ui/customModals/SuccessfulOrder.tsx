import { FC } from 'react';
import GreenCheckmark from '@/src/assets/icons/icon-greenCheckmark';
import scss from '../../ui/customModals/Style.module.scss';
import { Modal } from 'antd';

interface SuccessProps {
	isOpen: boolean;
	onClose: () => void;
}
const SuccessfulOrder: FC<SuccessProps> = ({ isOpen, onClose }) => {
	return (
		<>
			<Modal open={isOpen} onCancel={onClose}>
				<div className={scss.topBox}>
					<span className={scss.checkmark}>
						<GreenCheckmark />
					</span>
				</div>
				<div className={scss.bottomBox}>
					<p className={scss.text}>Ваш заказ успешно оформлен!</p>
				</div>
			</Modal>
		</>
	);
};

export default SuccessfulOrder;
