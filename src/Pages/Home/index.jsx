import React, { useEffect, useContext } from 'react';
import Product from '../../components/Product';
import { CartContext } from '../../context/cartContext';
import { ProductsContext } from '../../context/productsContext';

function Home() {
  const { products, productLoading, productsError, loadProducts } =
    useContext(ProductsContext);

  const { loadCart, cart, addToCart, updateCartItem, deleteCartItem } =
    useContext(CartContext);

  useEffect(() => {
    Promise.all([loadProducts(), loadCart()]);
  }, []);

  if (productLoading) {
    return <h1>{productLoading.message}</h1>;
  }

  if (productsError) {
    return <h1>{productsError.error.message}</h1>;
  }

  return (
    <div>
      {products.map((product) => {
        const cartItem = cart.find((x) => x.productId === product.id);
        return (
          <Product
            key={product.id}
            data={product}
            addToCart={addToCart}
            cartItem={cartItem}
            updateCartItem={updateCartItem}
            deleteCartItem={deleteCartItem}
          />
        );
      })}
    </div>
  );
}

export default Home;
