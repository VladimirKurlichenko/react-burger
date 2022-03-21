import style from './ModalOverlay.module.css';

interface IModalOverlay {
    onClose: () => void
}


const ModalOverlay = ({ onClose }: IModalOverlay) => {
    return (
            <div className={style.modalOverlay} onClick={onClose}>
            </div>
    )
}

export default ModalOverlay;