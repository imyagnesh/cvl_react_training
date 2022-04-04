import React from 'react';
import axiosInstance from '../../utils/axiosInstance';
import Review from '../Review';

function Product({ data, addToCart, cartItem }) {
  return (
    <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8 py-4">
      <div className="w-full grid grid-cols-1 gap-y-8 gap-x-6 items-start sm:grid-cols-12 lg:gap-x-8">
        <div className="aspect-w-2 aspect-h-3 rounded-lg bg-gray-100 overflow-hidden sm:col-span-4 lg:col-span-2">
          <img
            src={data.image}
            alt={data.title}
            className="object-center object-cover"
          />
        </div>
        <div className="sm:col-span-8 lg:col-span-10">
          <h2 className="text-2xl font-extrabold text-gray-900 sm:pr-12">
            {data.title}
          </h2>

          <section aria-labelledby="information-heading" className="mt-2">
            <h3 id="information-heading">{data.description}</h3>

            <p className="text-2xl text-gray-900">
              {new Intl.NumberFormat('en-IN', {
                style: 'currency',
                currency: 'INR',
              }).format(data.price)}
            </p>

            {/* Reviews */}
            <Review {...data.rating} />
          </section>

          {cartItem ? (
            <div className="flex mt-6 items-center">
              <button
                type="button"
                onClick={() => addToCart(data.id)}
                className="w-full bg-indigo-600 border border-transparent rounded-md py-3 px-8 flex items-center justify-center text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                +
              </button>
              <span className="mx-4 text-2xl font-semibold">
                {cartItem.quantity}
              </span>
              <button
                type="button"
                onClick={() => addToCart(data.id)}
                className="w-full bg-indigo-600 border border-transparent rounded-md py-3 px-8 flex items-center justify-center text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                -
              </button>
            </div>
          ) : (
            <button
              type="button"
              onClick={() => addToCart(data.id)}
              className="mt-6 w-full bg-indigo-600 border border-transparent rounded-md py-3 px-8 flex items-center justify-center text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Add to bag
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default Product;
