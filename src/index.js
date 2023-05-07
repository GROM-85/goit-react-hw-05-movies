import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from 'components/App';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import './index.css';
import { store, persistor } from 'redux/store';
import { Toaster } from 'react-hot-toast';
import {  ThemeProvider } from '@mui/material/styles';
import { createTheme } from '@mui/material/styles'

const THEME = createTheme({
  typography: {
  //  fontFamily:  ["Helvetica","Helvetica Neue"].join(','),
   fontFamily:  [ 'Chilanka',
   'cursive',].join(','),
  
  }
});


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter basename='goit-react-hw-05-movies'>
    <ThemeProvider theme={THEME}>
      <Provider store={store}>
        <PersistGate persistor={persistor} loading={null}>
          <App />
        </PersistGate>
      </Provider>
      </ThemeProvider>
    </BrowserRouter>
    <Toaster position="top-center" reverseOrder={false} autoClose={2000} />
  </React.StrictMode>
);
