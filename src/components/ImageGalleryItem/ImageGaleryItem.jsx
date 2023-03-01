import css from './ImageGalleryItem.module.scss';
import PropTypes from 'prop-types';

export const ImageGalleryItem = ({ img, largeImg, tags, showModal }) => {
  return (
    <li className={css.gallery__item}>
      <img src={img} alt={tags} onClick={() => showModal(largeImg)} />
    </li>
  );
};

ImageGalleryItem.propTypes = {
  img: PropTypes.string.isRequired,
  largeImg: PropTypes.string.isRequired,
  tags: PropTypes.string.isRequired,
  showModal: PropTypes.func.isRequired,
};
