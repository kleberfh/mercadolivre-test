import App from '../app';
import '@testing-library/jest-dom';
import {fireEvent, getByTestId, render, screen} from '@testing-library/react';
import {act} from "react-dom/test-utils";

describe("Search bar component", () => {
  const textValue = 'iphone 12 pro 256';

  test('Should start with no value.', () => {
    render(<App />);
    const input = screen.getByPlaceholderText('Nunca dejes de buscar');
    expect(input).toBeInTheDocument();
  });
  test('Should receive text.', async () => {
    render(<App />);
    const input = screen.getByPlaceholderText('Nunca dejes de buscar');

    await act(async () => {
      fireEvent.change(input, {target: { value: textValue }})
    })

    expect(input.value).toMatch(textValue);
  });
  test('Should redirect to results.', async () => {
    render(<App />);
    const input = screen.getByPlaceholderText('Nunca dejes de buscar');

    await act(async () => {
      fireEvent.change(input, {target: { value: textValue }})
    })

    const searchButton = screen.getByTestId('search_button');
    await act(async () => {
      fireEvent.click(searchButton);
    })

    expect(window.location.search).toMatch(`?search=${encodeURI(textValue)}`);
  });
});