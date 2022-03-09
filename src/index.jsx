import React from 'react';
import ReactDOM from 'react-dom';
import Header from './components/Header';
import Footer from './components/Footer';

// Component Name always start with Upper case
// per component return only single element

// Props are immutable cant change props

function App() {
  return (
    <>
      <Header
        title="Header"
        listItem={[...new Set(['Home', 'About', 'About', 'Contact'])]}
      />
      <h1>Yagnesh</h1>
      <h2>Full Stack developer</h2>
      <input type="checkbox" />

      <Footer />
    </>
  );
}

ReactDOM.render(<App />, document.getElementById('root'));
