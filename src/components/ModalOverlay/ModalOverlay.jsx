import PropTypes from 'prop-types';
import './ModalOverlay.css';

const ModalOverlay = ({ onClose }) => {
    return (
            <div className="modalOverlay" onClick={onClose}>
            </div>
    )
}

ModalOverlay.propTypes = {
    onClose: PropTypes.func.isRequired
};

export default ModalOverlay;