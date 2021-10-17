import {render, fireEvent, screen} from '@testing-library/react';

import FilterWrapper from '../FilterWrapper';

test('Filter: test fullscreen mode', () => {

  const mockFunc = jest.fn(x => x);
  const mockToggle = jest.fn(x => x)

  render(
    <FilterWrapper
      onFilter={mockFunc}
      resNumber={123}
      toggle={true}
      toggleSetter={mockToggle}
    />
  );

  expect(screen.getByText(/Found 123 results\./)).toBeInTheDocument();

  // test buttons
  expect(screen.getByText(/filter_list/)).toBeInTheDocument();
  expect(screen.getByTestId("bottom-modal")).toBeInTheDocument();

  const btnFilter = screen.getByRole('button', {name: "Filter"});
  const btnCancel = screen.getByRole('button', {name: "cancel"});
  const btnClose= screen.getByRole('button', {name: "close"});
  expect(btnFilter).toBeInTheDocument();
  expect(btnCancel).toBeInTheDocument();
  expect(btnClose).toBeInTheDocument();

  fireEvent.click(btnFilter);
  expect(mockToggle).toHaveBeenCalledTimes(1);
  expect(mockFunc).toHaveBeenCalledTimes(1);
  expect(mockToggle).lastCalledWith(false);

  fireEvent.click(btnCancel);
  expect(mockToggle).toHaveBeenCalledTimes(2);
  expect(mockToggle).lastCalledWith(false);

  fireEvent.click(btnClose);
  expect(mockToggle).toHaveBeenCalledTimes(3);
  expect(mockToggle).lastCalledWith(false);
});