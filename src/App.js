import './App.css';
import { Provider } from 'react-redux';
import { store } from './store';
import Stepper from './Components/Stepper/Stepper';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <Stepper />
        <ToastContainer />
      </div>
    </Provider>
  );
}

export default App;
