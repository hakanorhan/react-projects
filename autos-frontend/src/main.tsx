import ReactDOM from 'react-dom/client'

import { store } from './redux/store';
import { Provider } from 'react-redux';
import App from './App'
import { CssBaseline } from '@mui/material';

ReactDOM.createRoot(document.getElementById('root')!).render(

    <Provider store={store}>
      <CssBaseline />
      <App />
    </Provider>
)
