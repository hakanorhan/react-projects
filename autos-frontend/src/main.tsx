import ReactDOM from 'react-dom/client'

import { store } from './redux/store';
import { Provider } from 'react-redux';
import './index.css'
import App from './App'

ReactDOM.createRoot(document.getElementById('root')!).render(

    <Provider store={store}>
      <App />
    </Provider>
)
