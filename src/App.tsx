import Dashboard from './pages/Dashboard';
import { Provider } from 'react-redux';
import {store} from './store/store';
import 'primeicons/primeicons.css';
import { PrimeReactProvider } from 'primereact/api';
import "primereact/resources/themes/lara-light-indigo/theme.css";


function App() {

  return (
       <PrimeReactProvider>
        <Provider store={store}>
          <Dashboard />
        </Provider>
      </PrimeReactProvider>
  )
}

export default App
