import Dashboard from './pages/Dashboard';
import { Provider } from 'react-redux';
import {store} from './store/store';
import 'primeicons/primeicons.css';
import { PrimeReactProvider } from 'primereact/api';
import "primereact/resources/themes/lara-light-indigo/theme.css";
import React from 'react';




function App() {

  return (
    <React.StrictMode>
       <PrimeReactProvider>
        <Provider store={store}>
          <Dashboard />
        </Provider>
      </PrimeReactProvider>
    </React.StrictMode>
  )
}

export default App
