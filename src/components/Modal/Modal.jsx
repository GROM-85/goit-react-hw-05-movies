import React,{useEffect} from "react";
import PropTypes from 'prop-types';
import { createPortal } from "react-dom";
import css from './Modal.module.scss';
import { useModalContext } from "components/contexts/ModalContext";

// before need to create in public index.html div#modal-root
// to keep modals, or any notifications, alerts separetly without z-index
const modalRoot = document.querySelector("#modal-root");


export const Modal =({children}) =>{
    const {isOpen,close} = useModalContext();
    useEffect( () => {

        const handleKeyDown = e => {
            if(e.key === 'Escape') close();
        }

        window.addEventListener('keydown',handleKeyDown)
        return ()=>(window.removeEventListener("keydown",handleKeyDown))
    },[close])


    const handleBackdropClick = (e) =>{
        if(e.currentTarget === e.target) close();
    }

    return createPortal(
        <>
        {isOpen && <div className={css.modal__backdrop} onClick={handleBackdropClick}>
            <div className={css.modal__content}>
                {children}
                </div>
        </div>}
        </>,modalRoot)
        
}



Modal.propTypes = {
    children:PropTypes.node,
  }