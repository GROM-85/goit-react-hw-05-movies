import React, { Component } from 'react';
import css from './SearchBar.module.scss';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { object, string} from 'yup';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { BiSearch } from 'react-icons/bi';
import { IconContext } from "react-icons";
// import { ReactComponent as SearchIcon } from '../svg/search-icon.svg';
import { Button } from 'components/Button';

const initialValues = {
  query: '',
};
const schema = object({
  query: string()
    .min(1, 'At least some letter should be!')
});

const ErrorText = styled.p`
  color: red;
  font-size: 1.2rem;
  margin:0;
`;

const FormError = ({ name }) => {
  return (
    <ErrorMessage
      name={name}
      render={(message) => <ErrorText>{message}</ErrorText>}
    />
  );
};

export class SearchBar extends Component {

  handleSubmit = (values, actions) => {
    const { resetForm } = actions;
    const {query} = values;

    if(query.trim() === ''){
      alert("Enter search param!");
      return ;
    }
    this.props.onInputSubmit(query)
    resetForm();
  };

  render() {
    return (
      <div className={css.searchBar}>
        <Formik
          initialValues={initialValues}
          validationSchema={schema}
          onSubmit={this.handleSubmit}
        >
          <Form autoComplete="off" className={css.searchBar__wrapper}>
            {/* <SearchIcon width="20" heigth='20' fill='red'/> */}
            {/* <img src={} alt="icon"/> */}
            <Button className={css.searchBar__icon} type='submit'>
              <IconContext.Provider
                value={{ color: 'darkgray', className: 'global-class-name' ,size:'1.5em'}}
              >
                  <BiSearch />
              </IconContext.Provider>
              
            </Button>

            <Field
              className={css.searchBar__input}
              name="query"
              type="text"
              placeholder="Search..."
            />
            <FormError name="query" />
          </Form>
          
        </Formik>
      </div>
    );
  }
}

SearchBar.propTypes = {
  onInputSubmit:PropTypes.func.isRequired,
}
