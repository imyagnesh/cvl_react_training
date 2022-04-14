import React from 'react';
import { render, screen } from '@testing-library/react';
import Alert from './index';

describe('Alert Component For Success', () => {
  const title = 'Error';
  const description = 'Something went wrong';

  beforeEach(() => {
    render(<Alert variant="success" title={title} description={description} />);
  });

  test('should render Alert Component', () => {
    const alert = screen.getByRole('alert');
    expect(alert).toBeInTheDocument();
  });

  test('should display appropriate divider color', () => {
    const divider = screen.getByTestId('divider');
    expect(divider).toHaveClass('border-teal-500');
  });

  test('should render title and description', () => {
    const pTitle = screen.getByTestId('title');
    const pDescription = screen.getByTestId('description');
    expect(pTitle.innerHTML).toBe(title);
    expect(pDescription.innerHTML).toBe(description);
  });
});

describe('Alert Component For Error', () => {
  beforeEach(() => {
    render(
      <Alert variant="error" title="Error" description="Something went wrong" />
    );
  });

  test('should render Alert Component', () => {
    const alert = screen.getByRole('alert');
    expect(alert).toBeInTheDocument();
  });

  test('should display appropriate divider color', () => {
    const divider = screen.getByTestId('divider');
    expect(divider).toHaveClass('border-red-500');
  });
});

describe('Alert Component For Warning', () => {
  beforeEach(() => {
    render(
      <Alert
        variant="warning"
        title="Error"
        description="Something went wrong"
      />
    );
  });

  test('should render Alert Component', () => {
    const alert = screen.getByRole('alert');
    expect(alert).toBeInTheDocument();
  });

  test('should display appropriate divider color', () => {
    const divider = screen.getByTestId('divider');
    expect(divider).toHaveClass('border-orange-500');
  });
});
