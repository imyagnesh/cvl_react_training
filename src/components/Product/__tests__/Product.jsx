import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Product from '../Product';

describe('Should render product Component', () => {
  const addToCart = jest.fn();
  const updateCartItem = jest.fn();
  const deleteCartItem = jest.fn();

  const props = {
    id: 1,
    title: 'Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops',
    price: 109.95,
    description:
      'Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday',
    category: "men's clothing",
    image: 'https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg',
    rating: {
      rate: 3.9,
      count: 120,
    },
    cartItem: undefined,
    addToCart,
    updateCartItem,
    deleteCartItem,
    isAdding: false,
    isUpdating: false,
    isDeleting: false,
  };

  beforeEach(() => {
    render(<Product {...props} />);
  });

  test('should take screenshot', () => {
    const { container } = render(<Product {...props} />);
    expect(container.firstChild).toMatchSnapshot();
  });

  test('should display add to cart button', () => {
    const btn = screen.getByRole('button');
    expect(btn.innerHTML).toBe('Add to bag');
    expect(btn).not.toBeDisabled();
    fireEvent.click(btn);
    expect(addToCart).toBeCalled();
    expect(addToCart).toBeCalledWith(1);
  });
});
