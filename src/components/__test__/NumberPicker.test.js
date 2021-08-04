import React from 'react';
import {render, fireEvent, screen} from '@testing-library/react';
import NumberPicker from '../NumberPicker';

test('render components & basic operations.', () => {
  let num = 0;
  const mockHandler = (n) => {
    num = n;
  }
  render(<NumberPicker number={0} onNumChange={mockHandler}/>);

  // check render result
  expect(screen.getByText('0')).toBeInTheDocument();
  expect(screen.getByText('remove')).toBeInTheDocument();
  expect(screen.getByText('add')).toBeInTheDocument();

  // minus 1 to 0
  fireEvent.click(screen.getByText('remove'));
  expect(num).toBe(0);

  // plus 1 to 0
  fireEvent.click(screen.getByText('add'));
  expect(num).toBe(1);

})

test('test upper bound', () => {
  let num = 100;
  const mockHandler = (n) => {
    num = n;
  }
  render(<NumberPicker number={100} onNumChange={mockHandler}/>);

  // plus 1 to 100
  fireEvent.click(screen.getByText('add'));
  expect(num).toBe(100);

  // minus 1 to 100
  fireEvent.click(screen.getByText('remove'));
  expect(num).toBe(99);
})

