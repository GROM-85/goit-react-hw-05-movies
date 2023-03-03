import { createContext,useState,useContext } from "react";

const ModalContext = createContext();
//custom hook for context
export const useModalContext = () => useContext(ModalContext);

export const ModalProvider = ({children}) => {
    const [isOpen,setIsOpen] = useState(false);
    const open = () => setIsOpen(true);
    const close = () => setIsOpen(false);
    return(
        <ModalContext.Provider value={{isOpen,open,close}}>
            {children}
        </ModalContext.Provider>
    )
}