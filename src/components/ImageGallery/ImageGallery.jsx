import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { ImageGalleryItem } from 'components/ImageGalleryItem';
import css from './ImageGallery.module.scss';
import { getData } from 'components/ApiService/ApiService';
import { Button } from 'components/Button';
import { Loader } from 'components/Loader/Loader';
import Notiflix from 'notiflix';

export const ImageGallery = ({query}) => {
  const [hits, setHits] = useState([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  const resetToDefaults = () => {
    setPage(1);
    setHits([]);
  };

  const updatePage = () => {
    setPage(state => state + 1);
  };

  const updateDataByPage = async () => {
    setIsLoading(true);
    try {
      const data = await getData({ query, page });
      if (data.hits.length === 0){
        Notiflix.Notify.info('Nothing has been found!');
        resetToDefaults();
        return;
      }
      setHits([...hits, ...data.hits]);
    } catch (error) {
      console.log(error?.message);
    } finally {
      setIsLoading(false);
    }
  };

  const updateDataByQuery = async () => {
    setIsLoading(true);
    try {
      const data = await getData({ query, page: 1});
      if (data.hits.length === 0){
        Notiflix.Notify.info('Nothing has been found!');
        resetToDefaults();
        return;
      }
      
      setHits([...data.hits]);
    } catch (error) {
      console.log(error?.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (!query) return;
    setPage(1);
    updateDataByQuery();
    // eslint-disable-next-line
  }, [query]);


  useEffect(() => {
    if (page === 1) return;
    updateDataByPage();
    // eslint-disable-next-line
  }, [page]);

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
  query: PropTypes.string.isRequired,
};
