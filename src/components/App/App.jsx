import shortid from 'shortid';
import React, { Component } from 'react';
import { Container } from './App.styled';
import { SearchBar } from 'components/SearchBar';
import {ImageGallery} from 'components/ImageGallery';
import { Modal } from 'components/Modal';
import { LoaderImage } from 'components/LoaderImage';



export class App extends Component {
  state = {
   query:'',
   img:'',
   showModal:false,
  };

  onInputSubmit = (value) => {
    this.setState({query: value})
  }

  onToggleModal = (img) => {
    console.log("modal is toggled")
    this.setState(({showModal}) => ({
      showModal:!showModal,
      img:img,
    }))
  }
  render() {

    const{query,img,showModal} = this.state;

    return (
      <Container>
        <SearchBar onInputSubmit={this.onInputSubmit}/>
        <ImageGallery query={query} showModal={this.onToggleModal}/>
        {showModal && <><Modal onClose={this.onToggleModal}>
          <img src={img} alt="modal_img" />
          <LoaderImage/>
        </Modal>
        </>
        }
      </Container>
    );
  }
}
