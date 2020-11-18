import { render, screen } from '@testing-library/react';
import App from './App';

test('Рендеринг панели управления', () => {
  render(<App />);
  const headingElement = screen.getByText(/Панель управления/i);
  expect(headingElement).toBeInTheDocument();
});
