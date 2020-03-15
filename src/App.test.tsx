import React from 'react';
import { render } from '@testing-library/react';
import App from './pages';

test('renders upload a file text', () => {
  const { getByText } = render(<App />);
  const linkElement = getByText(/upload a file/i);
  expect(linkElement).toBeInTheDocument();
});
