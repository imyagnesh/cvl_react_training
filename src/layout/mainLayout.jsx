import React, { useContext, Fragment, useState } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { connect } from 'react-redux';
import { AuthContext } from '../context/authContext';
import Header from '../components/Header';
import Cart from '../components/Cart';
import Errors from '../components/Errors';

function MainLayout() {
  const { user } = useContext(AuthContext);
  const [open, setOpen] = useState(false);

  const toggleCart = () => {
    setOpen((val) => !val);
  };

  if (!user) {
    return <Navigate to="/auth" />;
  }

  return (
    <>
      <Header toggleCart={toggleCart} />
      <Cart open={open} toggleCart={toggleCart} />
      <Outlet />
      <Errors />
    </>
  );
}

export default connect()(MainLayout);
