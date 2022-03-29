import React from 'react';
import { useParams } from 'react-router-dom';

function Products() {
  const params = useParams();

  console.log(params);
  return <div>Products</div>;
}

export default Products;
