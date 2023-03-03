import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from 'components/App';
import { ImageProvider } from 'components/contexts/ImageContext';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ImageProvider>
      <App />
    </ImageProvider>
  </React.StrictMode>
);
