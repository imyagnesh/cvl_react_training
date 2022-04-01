import React, { useState, useEffect } from 'react';

import axiosInstance from '../../utils/axiosInstance';
import Product from '../../components/Product';

function Home() {
  const [products, setProducts] = useState([]);

  const loadProducts = async () => {
    try {
      const res = await axiosInstance.get('products');
      setProducts(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    loadProducts();
  }, []);

  return (
    <div>
      {products.map((product) => (
        <Product key={product.id} data={product} />
      ))}
    </div>
  );
}

export default Home;
