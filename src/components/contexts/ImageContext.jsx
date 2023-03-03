import { useContext,useState,createContext } from "react";

const ImageContext = createContext();
// create custom hook for using instead of 'useContext(ImageContext)';
export const useImageContext = () => useContext(ImageContext);

export const ImageProvider = ({children}) => {
    const [image,setImage] = useState('');
    
    const storeImage = (img) =>{
        setImage(img);
    }
    return (
        <ImageContext.Provider value={{image,storeImage}}>
            {children}
        </ImageContext.Provider>
    )
}