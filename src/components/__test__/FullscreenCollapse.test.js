import {render, fireEvent, screen} from '@testing-library/react';

import FullscreenCollapse from '../FullscreenCollapse';

test('render closed.', () => {
  render(<FullscreenCollapse toggle={false} onClose={() => {}}/>);

  expect(screen.getByTestId("fs-collapse")).not.toHaveClass("show");
});

test('render open.', () => {

  const mockClose = jest.fn(x => x);
  render(
    <FullscreenCollapse
      toggle={true}
      onClose={mockClose}
      title="Test Title"
      footer="Test Footer"
    />
  );

  expect(screen.getByTestId("fs-collapse")).toHaveClass("show");
  expect(screen.getByText("Test Title")).toBeInTheDocument();
  expect(screen.getByText("Test Footer")).toBeInTheDocument();

  const btn = screen.getByRole('button', { name: 'close' });
  fireEvent.click(btn);

  expect(mockClose).toBeCalledTimes(1);
});



