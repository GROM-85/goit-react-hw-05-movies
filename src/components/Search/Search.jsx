import React from 'react';
import css from './Search.module.scss';
import PropTypes from 'prop-types';
import { object, string} from 'yup';
import SearchIcon from '@mui/icons-material/Search';
import { FormGroup, IconButton, InputAdornment, TextField } from '@mui/material';
import { motion } from 'framer-motion';
import { useFormik } from 'formik';

const initialValues = {
  query: '',
};

const schema = object({
  query: string()
    .min(1, 'To get started,please enter some query!')
});

const motionInput = {
  hidden:{
    opacity:0,
    x:-50,
    scaleX:0,
    
  },
  visible:{
    opacity:1,
    x:0,
    scaleX:1,
    transition:{
      duration:1,
    }
  }
};

const styleTextField = {
  "& .MuiOutlinedInput-root": {
    "&.Mui-focused fieldset": {
      borderColor: "#56577f"
    }
  }
}    

export const Search = ({setSearchParams = () => null}) =>{

  const formik = useFormik({
    initialValues,
    validationSchema:schema,
    onSubmit:({query},{resetForm})=> {
      console.log('query',query)
      if(query.trim() === ''){
        alert("Enter search param!");
        return ;
    }
    setSearchParams({query: query.trim()})
    resetForm();
  }
  })

  const {values,handleSubmit,handleChange,errors,touched} = formik;
  return (
    <div className={css.search}>
      <motion.form onSubmit={handleSubmit}
        variants={motionInput}
        initial='hidden'
        animate='visible'>
        <FormGroup autoComplete="off" className={css.search__wrapper}>
          <TextField
            className={css.search__input}
            name="query"
            sx={styleTextField}
            type="text"
            onChange={handleChange}
            value={values.query}
            placeholder="Search the movies..."
            error={Boolean(errors.query) && Boolean(touched.query)}
            helperText={Boolean(touched.query) && errors.query}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="search"
                    type='submit'
                  >
                    <SearchIcon sx={{}}/>
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          
        </FormGroup>
        
      </motion.form>
    </div>
  )
}


Search.propTypes = {
  setSearchParams:PropTypes.func.isRequired,
}
