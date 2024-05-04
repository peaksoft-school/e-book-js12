import scss from '../../ui/customModals/Style.module.scss';
import { FC } from 'react';
import { Modal } from 'antd';

interface ExitProps {
	isOpen: boolean;
	onClose: () => void;
	btnClose: () => void;
}
const ExitModal: FC<ExitProps> = ({ isOpen, onClose, btnClose }) => {
	return (
		<>
			<Modal
				cancelText={'Отменить'}
				okText={'Выйти'}
				open={isOpen}
				onOk={() => {
					onClose();
					btnClose();
				}}
				onCancel={() => {
					onClose();
				}}
			>
				<div className={scss.exitContainer}>
					<p className={scss.text}>Вы уверены, что хотите выйти?</p>
					<div className={scss.buttonsBox}></div>
				</div>
			</Modal>
		</>
	);
};

export default ExitModal;
