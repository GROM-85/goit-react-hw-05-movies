import React, { useState } from 'react';
import { Container } from './App.styled';
import { SearchBar } from 'components/SearchBar';
import { ImageGallery } from 'components/ImageGallery';
import { Modal } from 'components/Modal';
import { LoaderImage } from 'components/LoaderImage';
import { useImageContext } from 'components/contexts/ImageContext';
import { ModalProvider} from 'components/contexts/ModalContext';

export const App = () => {
  const [query, setQuery] = useState('');
  const { image } = useImageContext();

  const onInputSubmit = value => {
    setQuery(value);
  };

  return (
    <Container>
      <SearchBar onInputSubmit={onInputSubmit} />
      <ModalProvider>
        <ImageGallery query={query} />
          <Modal>
            <img src={image} alt="modal_img" />
            <LoaderImage/>
          </Modal>
      </ModalProvider>
    </Container>
  );
};
