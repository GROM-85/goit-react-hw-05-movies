import css from './ImageGalleryItem.module.scss';
import PropTypes from 'prop-types';
import { useImageContext } from 'components/contexts/ImageContext';
import { useModalContext } from 'components/contexts/ModalContext';

export const ImageGalleryItem = ({ img, largeImg, tags}) => {
  const {storeImage} = useImageContext();
  const {open} = useModalContext();
  return (
    <li className={css.gallery__item}>
      <img src={img} alt={tags} onClick={() => {
        storeImage(largeImg);
        open();
        }} />
    </li>
  );
};

ImageGalleryItem.propTypes = {
  img: PropTypes.string.isRequired,
  largeImg: PropTypes.string.isRequired,
  tags: PropTypes.string.isRequired,
};
