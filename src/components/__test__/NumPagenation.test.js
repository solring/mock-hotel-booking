import React from 'react';
import {render, fireEvent, screen} from '@testing-library/react';
import NumPagenation from '../NumPagenation';

const testCases = [
  {
    curr: 7,
    min: 1,
    max: 20,
    window: 5,
  },
  {
    curr: 1,
    min: 1,
    max: 20,
    window: 5,
  },
  {
    curr: 20,
    min: 1,
    max: 20,
    window: 5,
  },
  {
    curr: 2,
    min: 1,
    max: 4,
    window: 5,
  },
];

test('rander components & basic setting', () => {
  const {
    curr,
    min,
    max,
    window
  } = testCases[0];

  const mockHandler = jest.fn(x => x);

  render(<NumPagenation
    curr={curr}
    min={min}
    max={max}
    window={window}
    onIndex={mockHandler}
  />);

  // render buttons
  expect(screen.getByText("previous")).toBeInTheDocument;
  expect(screen.getByText("next")).toBeInTheDocument;
  expect(screen.getByText(`${min}`)).toBeInTheDocument;
  expect(screen.getByText(`${max}`)).toBeInTheDocument;
  for (let i = 5; i < 10; i++) {
    expect(screen.getByText(`${i}`)).toBeInTheDocument;
  }

  // clicks
  const btns = screen.getAllByRole('button');
  btns.map((b) => {
    fireEvent.click(b);
  })
  expect(mockHandler).toBeCalledTimes(9);
});

test('window is even number.', () => {
  const {
    curr,
    min,
    max,
    window
  } = testCases[0];

  const mockHandler = jest.fn(x => x);

  render(<NumPagenation
    curr={curr}
    min={min}
    max={max}
    window={window-1}
    onIndex={mockHandler}
  />);

  // render buttons
  for (let i = 5; i < 9; i++) {
    expect(screen.getByText(`${i}`)).toBeInTheDocument;
  }

  // clicks
  const btns = screen.getAllByRole('button');
  btns.map((b) => {
    fireEvent.click(b);
  })
  expect(mockHandler).toBeCalledTimes(8);
});

test('when min equals curr.', () => {
  const {
    curr,
    min,
    max,
    window
  } = testCases[1];

  const mockHandler = jest.fn(x => x);

  render(<NumPagenation
    curr={curr}
    min={min}
    max={max}
    window={window}
    onIndex={mockHandler}
  />);

  // render buttons
  expect(screen.getAllByText(`${min}`).length).toBe(2);
  for (let i = min+1; i < min+window; i++) {
    expect(screen.getByText(`${i}`)).toBeInTheDocument;
  }

  // clicks
  const btns = screen.getAllByRole('button');
  btns.map((b) => {
    fireEvent.click(b);
  })
  // onPrev won't call the handler since curr == min
  expect(mockHandler).toBeCalledTimes(8);
});

test('when max equals curr.', () => {
  const {
    curr,
    min,
    max,
    window
  } = testCases[2];

  const mockHandler = jest.fn(x => x);

  render(<NumPagenation
    curr={curr}
    min={min}
    max={max}
    window={window}
    onIndex={mockHandler}
  />);

  // render buttons
  expect(screen.getAllByText(`${max}`).length).toBe(2);
  for (let i = 16; i < max; i++) {
    expect(screen.getByText(`${i}`)).toBeInTheDocument;
  }

  // clicks
  const btns = screen.getAllByRole('button');
  btns.map((b) => {
    fireEvent.click(b);
  })
  // onNext won't call the handler since curr == max
  expect(mockHandler).toBeCalledTimes(8);
});

test('when window is larger than the actual range.', () => {
  const {
    curr,
    min,
    max,
    window
  } = testCases[3];

  const mockHandler = jest.fn(x => x);

  render(<NumPagenation
    curr={curr}
    min={min}
    max={max}
    window={window}
    onIndex={mockHandler}
  />);

  // render buttons
  expect(screen.getAllByText(`${min}`).length).toBe(2);
  expect(screen.getAllByText(`${max}`).length).toBe(2);
  for (let i = min+1; i < max; i++) {
    expect(screen.getByText(`${i}`)).toBeInTheDocument;
  }

  // clicks
  const btns = screen.getAllByRole('button');
  btns.map((b) => {
    fireEvent.click(b);
  })
  expect(mockHandler).toBeCalledTimes(max - min + 1 + 4);
});

test('check callback arg values from buttons', () => {
  const {
    curr,
    min,
    max,
    window
  } = testCases[0];

  const mockHandler = jest.fn(x => x);

  render(<NumPagenation
    curr={curr}
    min={min}
    max={max}
    window={window}
    onIndex={mockHandler}
  />);

  // clicks
  const prev = screen.getByText('previous');
  const next = screen.getByText('next');

  fireEvent.click(prev);
  fireEvent.click(next);
  fireEvent.click(screen.getByText(`${min}`));
  fireEvent.click(screen.getByText(`${max}`));

  expect(mockHandler.mock.calls[0][0]).toBe(curr-1);
  expect(mockHandler.mock.calls[1][0]).toBe(curr+1);

  expect(mockHandler.mock.calls[2][0]).toBe(min);
  expect(mockHandler.mock.calls[3][0]).toBe(max);


  for (let i = 5; i < 10; i++) {
    fireEvent.click(screen.getByText(`${i}`));
    expect(mockHandler.mock.calls[i-1][0]).toBe(i);
  }
});


