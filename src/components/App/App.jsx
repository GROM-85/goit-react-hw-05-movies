import React, { useState} from 'react';
import { Container } from './App.styled';
import { SearchBar } from 'components/SearchBar';
import {ImageGallery} from 'components/ImageGallery';
import { Modal } from 'components/Modal';
import { LoaderImage } from 'components/LoaderImage';


export const App = () => {
  const [query,setQuery] = useState('');
  const [img,setImg] = useState('');
  const [showModal,setShowModal] = useState(false);

  const onInputSubmit = (value) => {
    setQuery(value)
  }

  const onToggleModal = (img) => {
   setImg(img);
   setShowModal(!showModal)
  }
  return (
    <Container>
      <SearchBar onInputSubmit={onInputSubmit}/>
      <ImageGallery query={query} showModal={onToggleModal}/>
      {showModal && <><Modal onClose={onToggleModal}>
        <img src={img} alt="modal_img" />
        <LoaderImage/>
      </Modal>
      </>
      }
    </Container>
  )
}

