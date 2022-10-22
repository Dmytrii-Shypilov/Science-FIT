import React from 'react';
import ReactDOM from 'react-dom/client';
import { store } from './redux/store';
import { Provider } from 'react-redux/es/exports';
import { PersistGate } from 'redux-persist/integration/react';
import { BrowserRouter } from 'react-router-dom';
import { persistore } from './redux/store';
import './index.scss';
import {App} from './components/App.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate persistor={persistore}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </PersistGate>
    </Provider>
  </React.StrictMode>
);
