import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import './App.css';
import App from './App';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import Data from './Data.json';

let theme = createMuiTheme(Data.Meta.Theme);

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById('root')
);