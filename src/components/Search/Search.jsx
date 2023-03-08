import React from 'react';
import css from './Search.module.scss';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { object, string} from 'yup';
import { Formik, Form, Field, ErrorMessage } from 'formik';
// import { BiSearch } from 'react-icons/bi';
// import { IconContext } from "react-icons";
import { ReactComponent as SearchIcon } from '../svg/search-icon.svg';
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

export const Search = ({setQuery = ()=>null}) =>{

  const handleSubmit = (values,actions) =>{
    const {resetForm} = actions;
    const {query} = values;
    if(query.trim() === ''){
      alert("Enter search param!");
      return ;
    }
    setQuery({query: query.trim()})
    resetForm();
  }

  return (
    <div className={css.search}>
      <Formik
        initialValues={initialValues}
        validationSchema={schema}
        onSubmit={handleSubmit}
      >
        <Form autoComplete="off" className={css.search__wrapper}>
          <Button className={css.search__icon} type='submit'>
            <SearchIcon width="20" heigth='20' fill='black'/>
          </Button>

          <Field
            className={css.search__input}
            name="query"
            type="text"
            placeholder="Search the movies..."
          />
          <FormError name="query" />
        </Form>
        
      </Formik>
    </div>
  )
}



Search.propTypes = {
  setQuery:PropTypes.func.isRequired,
}
