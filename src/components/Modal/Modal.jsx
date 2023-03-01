import React,{Component} from "react";
import PropTypes from 'prop-types';
import { createPortal } from "react-dom";
import css from './Modal.module.scss';

// before need to create in public index.html div#modal-root
// to keep modals, or any notifications, alerts separetly without z-index
const modalRoot = document.querySelector("#modal-root");

export class Modal extends Component{
    componentDidMount(){
        
        window.addEventListener('keydown',this.handleKeyDown)
    }
    componentWillUnmount(){
        
        window.removeEventListener("keydown",this.handleKeyDown)
    }

    handleKeyDown = e => {
        
        if(e.key === 'Escape') this.props.onClose();
    }

    handleBackdropClick = (e) =>{
        if(e.currentTarget === e.target) this.props.onClose();
    }

    
render(){
    const {children} = this.props;
    return createPortal(
        <div className={css.modal__backdrop} onClick={this.handleBackdropClick}>
            <div className={css.modal__content}>
                {children}
                </div>
        </div>,modalRoot)
}
}

Modal.propTypes = {
    children:PropTypes.node,
    onClose:PropTypes.func.isRequired,
  }