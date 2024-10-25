import s from './Modal.module.scss';

export const Modal = ({ isOpen, onClose, children }) => {
  return (
    <div className={`${s.overlay} ${isOpen ? s.overlayVisible : ''}`}>
      <div onClick={onClose} className={s.clickArea}>
        {children}
      </div>
    </div>
  );
};
