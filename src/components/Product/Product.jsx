import React, { memo } from 'react';
import Review from '../Review';

function Product({
  id,
  image,
  title,
  description,
  price,
  rating,
  addToCart,
  cartItem,
  updateCartItem,
  deleteCartItem,
  isAdding,
  isUpdating,
  isDeleting,
}) {
  return (
    <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8 py-4">
      <div className="w-full grid grid-cols-1 gap-y-8 gap-x-6 items-start sm:grid-cols-12 lg:gap-x-8">
        <div className="aspect-w-2 aspect-h-3 rounded-lg bg-gray-100 overflow-hidden sm:col-span-4 lg:col-span-2">
          <img src={image} alt={title} className="object-center object-cover" />
        </div>
        <div className="sm:col-span-8 lg:col-span-10">
          <h2 className="text-2xl font-extrabold text-gray-900 sm:pr-12">
            {title}
          </h2>

          <section aria-labelledby="information-heading" className="mt-2">
            <h3 id="information-heading">{description}</h3>

            <p className="text-2xl text-gray-900">
              {new Intl.NumberFormat('en-IN', {
                style: 'currency',
                currency: 'INR',
              }).format(price)}
            </p>

            {/* Reviews */}
            <Review {...rating} />
          </section>

          {cartItem ? (
            <div className="flex mt-6 items-center">
              <button
                type="button"
                disabled={isUpdating || isDeleting}
                onClick={() =>
                  updateCartItem({
                    ...cartItem,
                    quantity: cartItem.quantity + 1,
                  })
                }
                className="w-full bg-indigo-600 border border-transparent rounded-md py-3 px-8 flex items-center justify-center text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-slate-400"
              >
                +
              </button>
              <span className="mx-4 text-2xl font-semibold">
                {cartItem.quantity}
              </span>
              <button
                type="button"
                disabled={isUpdating || isDeleting}
                onClick={() => {
                  if (cartItem.quantity > 1) {
                    updateCartItem({
                      ...cartItem,
                      quantity: cartItem.quantity - 1,
                    });
                  } else {
                    deleteCartItem(cartItem);
                  }
                }}
                className="w-full bg-indigo-600 border border-transparent rounded-md py-3 px-8 flex items-center justify-center text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-slate-400"
              >
                -
              </button>
            </div>
          ) : (
            <button
              type="button"
              disabled={isAdding}
              onClick={() => addToCart(id)}
              className="mt-6 w-full bg-indigo-600 border border-transparent rounded-md py-3 px-8 flex items-center justify-center text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-slate-400"
            >
              Add to bag
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default memo(Product);
