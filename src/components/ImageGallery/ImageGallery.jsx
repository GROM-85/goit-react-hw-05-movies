import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ImageGalleryItem } from 'components/ImageGalleryItem';
import css from './ImageGallery.module.scss';
import { getData } from 'components/ApiService/ApiService';
import { Button } from 'components/Button';
import { Loader } from 'components/Loader/Loader';
import Notiflix from 'notiflix';

export class ImageGallery extends Component {
  state = {
    data: [],
    page: 1,
    isLoading: false,
  };

  async componentDidUpdate(prevProps, prevState, snapshot) {
    const { query } = this.props;
    const { page } = this.state;

    if (prevProps.query !== this.props.query) {
      this.resetPage();
      this.setState({data:[]})
      this.updateData({ query, page });
    }

    if (prevState.page !== page) {
      this.updateData({ query, page });
    }
  }

  resetPage = () => {
    this.setState({ page: 1 });
  };

  updatePage = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
  };

  updateData = async ({ query, page }) => {
    this.setState({ isLoading: true });
    try {
      const data = await getData({ query, page });
      if(data.hits.length === 0) Notiflix.Notify.info("Nothing has been found!")
      this.setState(prevState => ({
        data: [...prevState.data, ...data.hits],
      }));
    } catch (error) {
      console.log(error?.message);
    } finally {
      this.setState({ isLoading: false });
    }
  };

  render() {
    const { data, isLoading } = this.state;
    const { showModal } = this.props;

    return (
      <>
        {data.length !== 0 && (
          <>
            <ul className={css.gallery}>
              {data.map(({ id, webformatURL, tags , largeImageURL}) => (
                <ImageGalleryItem
                  key={id}
                  img={webformatURL}
                  tags={tags}
                  showModal={showModal}
                  largeImg={largeImageURL}
                />
              ))}
            </ul>
            {!isLoading ? (
              <Button
                title="Load More"
                onClick={this.updatePage}
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
  }
}

ImageGallery.propTypes = {
  query:PropTypes.string.isRequired,
  showModal:PropTypes.func.isRequired,
}
