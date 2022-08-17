import React from 'react';
import ReactDOM from 'react-dom/client'
import App from './App'
import './scss/index.scss'

// redux toolkit
import { Provider } from 'react-redux'
import store from './store'
// router
import { unstable_HistoryRouter as HistoryRouter } from 'react-router-dom';
import { createHashHistory } from 'history';
export const history = createHashHistory();

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
// root.render(<React.StrictMode><App /></React.StrictMode>)
root.render(
  <Provider store={store}>
    <HistoryRouter history={history}>
      <App />
    </HistoryRouter>
  </Provider>,
)
