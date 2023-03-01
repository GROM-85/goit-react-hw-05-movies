import React,{useEffect} from "react";
import PropTypes from 'prop-types';
import { createPortal } from "react-dom";
import css from './Modal.module.scss';

// before need to create in public index.html div#modal-root
// to keep modals, or any notifications, alerts separetly without z-index
const modalRoot = document.querySelector("#modal-root");


export const Modal =({children,onClose = ()=>null}) =>{

    useEffect( () => {

        const handleKeyDown = e => {
        
            if(e.key === 'Escape') onClose();
        }

        window.addEventListener('keydown',handleKeyDown)
        return ()=>(window.removeEventListener("keydown",handleKeyDown))
    },[onClose])


    const handleBackdropClick = (e) =>{
        if(e.currentTarget === e.target) onClose();
    }

    return createPortal(
        <div className={css.modal__backdrop} onClick={handleBackdropClick}>
            <div className={css.modal__content}>
                {children}
                </div>
        </div>,modalRoot)
}



Modal.propTypes = {
    children:PropTypes.node,
    onClose:PropTypes.func.isRequired,
  }