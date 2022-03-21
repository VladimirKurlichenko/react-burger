import PropTypes from 'prop-types';
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

ModalOverlay.propTypes = {
    onClose: PropTypes.func.isRequired
};

export default ModalOverlay;