import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import { pink } from '@material-ui/core/colors';

let theme = createMuiTheme({
  palette: {
    primary: {
      light: '#6aebff',
      main: '#00b9ff',
      dark: '#0089cb',
      contrastText: '#fff',
  },
    secondary: pink
  }
})

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById('root')
);