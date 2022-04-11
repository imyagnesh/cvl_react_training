import React, { useEffect, memo } from 'react';
import Product from '../../components/Product';

function Home({
  products,
  loadProducts,
  isProductsLoading,
  hasProductsError,
  loadCart,
}) {
  useEffect(() => {
    loadProducts();
    loadCart();
  }, []);

  if (isProductsLoading) {
    return <h1>{isProductsLoading.message}</h1>;
  }

  if (hasProductsError) {
    return <h1>{hasProductsError.error.message}</h1>;
  }

  return (
    <div>
      {products.map((product) => (
        <Product key={product.id} {...product} />
      ))}
    </div>
  );
}

export default memo(Home);
