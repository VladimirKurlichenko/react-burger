import ReactDOM from "react-dom";
import React from 'react';
import { ReactNode } from "react";
import style from './Modal.module.css'
import ModalOverlay from "../ModalOverlay/ModalOverlay";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";

interface IModalProps {
    onClose: () => void;
    children: ReactNode;
}

const modalRoot = document.getElementById("portal") as HTMLElement;

const Modal = ({ children, onClose }: IModalProps) => {

     React.useEffect(() => {
        const closeModal = (evt: KeyboardEvent) => {
          if (evt.key === 'Escape') { onClose() }
        }
        window.addEventListener('keydown', closeModal)
      return () => window.removeEventListener('keydown', closeModal)
    },[onClose])

    return (
        ReactDOM.createPortal(
            <>
                <ModalOverlay onClose={onClose}/>
                <div className={style.modal}>
                    <span onClick={onClose} className={`${style.modalCloseIcon} mt-4 mr-4`}>
                        <CloseIcon type="primary" />
                    </span>
                    {children}
                </div>
            </>, modalRoot
        )
    );
}

export default Modal;