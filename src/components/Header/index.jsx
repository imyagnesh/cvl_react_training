import React from 'react';
import PropTypes from 'prop-types';

function Header({ title, listItem }) {
  return (
    <header>
      <h1>{title}</h1>
      <ul>
        {listItem.map((item, index) => (
          // eslint-disable-next-line react/no-array-index-key
          <li key={index}>{item}</li>
        ))}
      </ul>
    </header>
  );
}

Header.propTypes = {
  title: PropTypes.string.isRequired,
  listItem: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default Header;
