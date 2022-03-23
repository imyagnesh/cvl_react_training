import React from 'react';
import ReactDOM from 'react-dom';
import { LocaleProvider } from './context/localeContext';
// import { ThemeProvider } from './context/themeContext';
import Todo from './Pages/Todo';
import './style.css';

ReactDOM.render(
  <React.StrictMode>
    <LocaleProvider>
      <Todo />
    </LocaleProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
