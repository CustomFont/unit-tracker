import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import App from './App';

test('renders Unit Tracker header', () => {
  render(
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
  const header = screen.getByText(/Unit Tracker/i);
  expect(header).toBeInTheDocument();
});

test('renders DODID and SSN text boxes', () => {
  render(
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
  const DODIDtextBox = screen.getByPlaceholderText(/Enter DOD ID/i);
  const SSNtextBox = screen.getByPlaceholderText(/SSN/i);
  expect(DODIDtextBox && SSNtextBox).toBeInTheDocument();
});

test('renders all necessary buttons', () => {
  render(
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
  const buttons = screen.getAllByRole('button');
  expect(buttons.length).toBe(4);
});
