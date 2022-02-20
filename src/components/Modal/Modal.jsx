import ReactDOM from "react-dom";
import React from 'react';
import style from './Modal.module.css'
import ModalOverlay from "../ModalOverlay/ModalOverlay";
import PropTypes from "prop-types";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
const modalRoot = document.getElementById("portal");

const Modal = ({ children, onClose }) => {

     React.useEffect(() => {
        const closeModal = (evt) => {
          if (evt.key === 'Escape') { onClose() }
        }
        window.addEventListener('keydown', closeModal)
      return () => window.removeEventListener('keydown', closeModal)
    },[])

    return (
        ReactDOM.createPortal(
            <>
                <div className={style.modal}>
                    <span onClick={onClose} className={`${style.modalCloseIcon} mt-4 mr-4`}>
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