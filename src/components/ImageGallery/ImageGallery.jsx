import React from 'react';
import PropTypes from 'prop-types';
import { ImageGalleryItem } from 'components/ImageGalleryItem';
import css from './ImageGallery.module.scss';
import { Button } from 'components/Button';
import { Loader } from 'components/Loader/Loader';


export const ImageGallery = ({isLoading=false, hits, updatePage}) => {

  return (
    <>
      {hits.length !== 0 && (
        <>
          <ul className={css.gallery}>
            {hits.map(({ id, webformatURL, tags, largeImageURL }) => (
              <ImageGalleryItem
                key={id}
                img={webformatURL}
                tags={tags}
                largeImg={largeImageURL}
              />
            ))}
          </ul>
          {!isLoading ? (
            <Button
              title="Load More"
              onClick={updatePage}
              type="button"
              className={css.load__more}
            />
          ) : (
            <Loader />
          )}
        </>
      )}
    </>
  );
};

ImageGallery.propTypes = {
  hits: PropTypes.array.isRequired,
  updatePage:PropTypes.func.isRequired,
  isLoading:PropTypes.bool.isRequired,
};
