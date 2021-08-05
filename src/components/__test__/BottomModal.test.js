import {render, fireEvent, screen} from '@testing-library/react';

import BottomModal from '../BottomModal';

/**
 * Helper functions
 */
async function testBasics(mockConfirm, mockClear) {

  let btn = screen.getByRole("button", { name: "Confirmed" });
  expect(btn).toBeInTheDocument();
  let btn2 = screen.getByRole("button", { name: "cancel" });
  expect(btn2).toBeInTheDocument();

  try {
    fireEvent.click(btn);
    fireEvent.click(btn);
    fireEvent.click(btn);
    expect(mockConfirm).toHaveBeenCalledTimes(3);

    fireEvent.click(btn2);
    fireEvent.click(btn2);
    fireEvent.click(btn2);
    fireEvent.click(btn2);
    expect(mockClear).toHaveBeenCalledTimes(4);

  } catch(e) {
    console.error(e);
  }
}

/**
 * Test cases
 */
test('BottomModal: callapse mode / closed.', () => {
  render(
    <BottomModal
      collapse={true}
      toggle={false}
      clearHandler={() => {}}
      confirmAction={() => {}}
      confirmText="Confirmed"
      direction="row"
    />
  );

  let modal = screen.getByTestId("bottom-modal");
  expect(modal).not.toHaveClass("show");
});

test('BottomModal: callapse mode / open.', () => {

  const mockConfirm = jest.fn( x => x);
  const mockClear= jest.fn( x => x);

  render(
    <BottomModal
      collapse={true}
      toggle={true}
      clearHandler={mockClear}
      confirmAction={mockConfirm}
      confirmText="Confirmed"
      direction="row"
    />
  );

  let modal = screen.getByTestId("bottom-modal");
  expect(modal).toHaveClass("show");

  testBasics(mockConfirm, mockClear);
});

test('BottomModal: normal mode.', () => {

  const mockConfirm = jest.fn( x => x);
  const mockClear= jest.fn( x => x);

  render(
    <BottomModal
      collapse={false}
      toggle={false}
      clearHandler={mockClear}
      confirmAction={mockConfirm}
      confirmText="Confirmed"
      direction="row"
    />
  );

  testBasics(mockConfirm, mockClear);
})
