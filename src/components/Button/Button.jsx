import PropTypes from 'prop-types';
// import css from './Button.module.scss';



export const Button = ({children,onClick,type,className,title}) =>{
return(
    <button type={type} onClick={onClick} className={className}>
        {title}
        {children}
    </button>
)
}

Button.propTypes = {
    title:PropTypes.string,
    children:PropTypes.node,
    type:PropTypes.string.isRequired,
    onClick:PropTypes.func,
    className:PropTypes.string.isRequired,
  }