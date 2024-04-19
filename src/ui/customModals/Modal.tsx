import React from 'react';
import ReactDOM from 'react-dom';
import { ReactNode } from 'react';
import scss from '../../ui/customModals/Style.module.scss';

interface ModalProps {
	isOpen: boolean;
	onClose: () => void;
	children: ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
	if (!isOpen) return null;

	return ReactDOM.createPortal(
		<div className={scss.modalOverlay}>
			<div className={scss.modal}>{children}</div>
		</div>,
		document.getElementById('modal-root')!
	);
};

export default Modal;
