import React, { useEffect, useContext, useMemo } from 'react';
import Product from '../../components/Product';
import { CartContext } from '../../context/cartContext';
import { ProductsContext } from '../../context/productsContext';

function Home() {
  const { products, productLoading, productsError, loadProducts } =
    useContext(ProductsContext);

  const {
    loadCart,
    cart,
    addToCart,
    updateCartItem,
    deleteCartItem,
    cartLoading,
  } = useContext(CartContext);

  useEffect(() => {
    loadProducts();
    loadCart();
  }, []);

  const isProductsLoading = useMemo(
    () => productLoading.find((x) => x.actionName === 'LOAD_PRODUCTS'),
    [productLoading]
  );

  const hasProductsError = useMemo(
    () => productsError.find((x) => x.actionName === 'LOAD_PRODUCTS'),
    [productsError]
  );

  if (isProductsLoading) {
    return <h1>{isProductsLoading.message}</h1>;
  }

  if (hasProductsError) {
    return <h1>{hasProductsError.error.message}</h1>;
  }

  return (
    <div>
      {products.map((product) => {
        const cartItem = cart.find((x) => x.productId === product.id);
        const isAdding = cartLoading.find(
          (x) => x.loadingId === product.id && x.actionName === 'ADD_CART'
        );

        const isUpdating = cartLoading.find(
          (x) => x.loadingId === product.id && x.actionName === 'UPDATE_CART'
        );

        const isDeleting = cartLoading.find(
          (x) => x.loadingId === product.id && x.actionName === 'DELETE_CART'
        );

        console.log('isUpdating', isUpdating);

        return (
          <Product
            key={product.id}
            data={product}
            addToCart={addToCart}
            cartItem={cartItem}
            updateCartItem={updateCartItem}
            deleteCartItem={deleteCartItem}
            isAdding={isAdding}
            isUpdating={isUpdating}
            isDeleting={isDeleting}
          />
        );
      })}
    </div>
  );
}

export default Home;
