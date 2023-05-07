import React,{useEffect} from "react";
import PropTypes from 'prop-types';
import { createPortal } from "react-dom";
import css from './Modal.module.scss';
import { useSelector,useDispatch } from "react-redux";
import { closeModal} from "redux/Modal/slice";
import { Navigate, useLocation, useNavigate } from "react-router-dom";

// before need to create in public index.html div#modal-root
// to keep modals, or any notifications, alerts separetly without z-index
const modalRoot = document.querySelector("#modal-root");


const Modal =({children}) =>{
    const isOpen = useSelector(state => state.modal.isOpen);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const locationFrom = location.state?.from ?? '/'

    useEffect( () => {

        const handleKeyDown = e => {
            if(e.key !== 'Escape') return;
            dispatch(closeModal());
            navigate(locationFrom,{replace:true, state:{from:location}})
        }

        window.addEventListener('keydown',handleKeyDown)
        return ()=>(window.removeEventListener("keydown",handleKeyDown))
    },[dispatch,navigate,locationFrom,location])


    const handleBackdropClick = (e) =>{
        if(e.currentTarget !== e.target) return;
        dispatch(closeModal());
        navigate(locationFrom,{replace:true, state:{from:location}});
    }
    console.log('isOpen',isOpen)
    return createPortal(
        <>
        {isOpen && <div className={css.modal__backdrop} onClick={handleBackdropClick}>
            <div className={css.modal__content}>
                {children}
                </div>
        </div>}
        </>,modalRoot)
        
}
export default Modal;


Modal.propTypes = {
    children:PropTypes.node,
  }