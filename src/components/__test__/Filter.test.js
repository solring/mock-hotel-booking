import {render, fireEvent, screen} from '@testing-library/react';

import Filter from '../Filter';
import { sections, initFilterForm } from '../search/FilterImpl';

test('Filter: basic render, no handler, not fullscreen', () => {
  const state = initFilterForm();
  const mockFunc = jest.fn(x => x);

  render(<Filter sections={sections} data={state} onFilter={mockFunc}/>);

  for (const key in sections) {
    const sec = sections[key];
    if (sec.title)
      expect(screen.getByRole('heading', {name: sec.title})).toBeInTheDocument();

    if(sec.options) {
      for (const op of sec.options) {
        expect(screen.getByText(op.text)).toBeInTheDocument();
      }
    }
  }

  for (let i = 1; i <= 5; i++) {
    let str = "grade ".repeat(i).trim();
    expect(screen.getByText(str)).toBeInTheDocument();
    expect(screen.getByLabelText(`${str} ${i}.0`).value).toBe("false");
  }
  expect(screen.getByText("Unrated")).toBeInTheDocument();

  expect(screen.getByRole('heading', {name: "Budget"})).toBeInTheDocument();
  expect(screen.getByText('min price')).toBeInTheDocument();
  expect(screen.getByText('max price')).toBeInTheDocument();
});

test('Filter: click checkboxes.', async () => {
  const state = initFilterForm();
  const mockFunc = jest.fn(x => x);

  render(<Filter sections={sections} data={state} onFilter={mockFunc}/>);

  for (const key in sections) {
    const sec = sections[key];
    if(sec.options) {
      for (const op of sec.options) {
        let checkbox = screen.getByLabelText(op.text);
        fireEvent.click(checkbox);
        await screen.findByLabelText(op.text);
      }
    }
  }
  expect(mockFunc).toBeCalledTimes(10);

  for (let i = 1; i <= 5; i++) {
    let str = "grade ".repeat(i).trim();
    let label = `${str} ${i}.0`;
    let check = screen.getByLabelText(label);
    fireEvent.click(check);
    await screen.findByLabelText(label);
  }
  let check = screen.getByLabelText('Unrated');
  fireEvent.click(check);
  expect(await screen.findByLabelText('Unrated'));

  expect(mockFunc).toHaveBeenCalledTimes(16);
});
