import ReactDOM from 'react-dom/client';
import App from './App';
import './assets/fonts/HelveticaNeue/font.css';
import './index.css';
if (process.env.NODE_ENV === 'production') {
  console.log = () => {
    //remove log
  };
  console.error = () => {
    //remove log
  };
  console.debug = () => {
    //remove log
  };
}
ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(<App />);