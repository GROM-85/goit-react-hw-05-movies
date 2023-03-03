import React, { useState,useEffect} from 'react';
import { Container } from './App.styled';
import { SearchBar } from 'components/SearchBar';
import { ImageGallery } from 'components/ImageGallery';
import { Modal } from 'components/Modal';
import { LoaderImage } from 'components/LoaderImage';
import { useImageContext } from 'components/contexts/ImageContext';
import { ModalProvider} from 'components/contexts/ModalContext';
import { getData } from 'components/ApiService/ApiService';
import Notiflix from 'notiflix';

export const App = () => {
  const [query, setQuery] = useState('');
  const [hits, setHits] = useState([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const { image } = useImageContext();

  const onInputSubmit = value => {
    setQuery(value);
    resetToDefaults();
  };

  const resetToDefaults = () => {
    setPage(1);
    setHits([]);
  };

  const updatePage = () => {
    setPage(state => state + 1);
  };

  const updateData = async () => {
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

  useEffect(() => {
    if (!query) return;
    updateData();
    // eslint-disable-next-line
  }, [query]);


  useEffect(() => {
    if (page === 1) return;
    updateData();
    // eslint-disable-next-line
  }, [page]);

  return (
    <Container>
      <SearchBar onInputSubmit={onInputSubmit} />
      <ModalProvider>
        <ImageGallery isLoading={isLoading} hits={hits} updatePage={updatePage} />
          <Modal>
            <img src={image} alt="modal_img" />
            <LoaderImage/>
          </Modal>
      </ModalProvider>
    </Container>
  );
};
