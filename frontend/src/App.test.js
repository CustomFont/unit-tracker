import { findByText, render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import App from './App';
import UpdateInfo from './components/UpdateInfo';

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

test('login text boxes accept input', () => {
  render(
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
  const DODIDtextBox = screen.getByPlaceholderText(/Enter DOD ID/i);
  const SSNtextBox = screen.getByPlaceholderText(/SSN/i);
  userEvent.type(DODIDtextBox, "1928477713")
  userEvent.type(SSNtextBox, "200992888")
  expect(SSNtextBox.value).toBe("200992888")
  expect(DODIDtextBox.value).toBe("1928477713")
});

test('change to update component after user text input and login button clicked', async () => {
  render(
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
  const DODIDtextBox = screen.getByPlaceholderText(/Enter DOD ID/i);
  const SSNtextBox = screen.getByPlaceholderText(/SSN/i);
  userEvent.type(DODIDtextBox, "1928477713")
  userEvent.type(SSNtextBox, "200992888")
  const loginButton = screen.getByText(/Login/i)
  await userEvent.click(loginButton)
  render(
  <BrowserRouter>
    <UpdateInfo/>
  </BrowserRouter>
  )
  const updateHeader = await screen.findByText(/Update Information/i)
  expect(updateHeader).toBeInTheDocument()
});