import React from 'react';
import { render } from '@testing-library/react';
import App from './App';

test('Рендеринг панели управления', () => {
  const { getByText } = render(<App />);
  const headingElement = getByText(/Панель управления/i);
  expect(headingElement).toBeInTheDocument();
});
