import ReactDOM from "react-dom";
import React from 'react';
import './Modal.css'
import ModalOverlay from "../ModalOverlay/ModalOverlay";
import PropTypes from "prop-types";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";

const Modal = (props) => {
    const { children, onClose } = props;
    const modalRoot = document.getElementById("portal");

     React.useEffect(() => {
        const closeModal = (e) => {
          if (e.keyCode === 27) { onClose() }
        }
        window.addEventListener('keydown', closeModal)
      return () => window.removeEventListener('keydown', closeModal)
    },[])

    return (
        ReactDOM.createPortal(
            <>
                <div className="modal">
                    <span onClick={onClose} className="modalCloseIcon">
                        <CloseIcon type="primary" />
                    </span>
                    {children}
                </div>
                <ModalOverlay onClose={onClose}/>
            </>, modalRoot
        )
    );
}

Modal.propTypes = {
    children: PropTypes.node.isRequired,
    onClose: PropTypes.func.isRequired,
};

export default Modal;