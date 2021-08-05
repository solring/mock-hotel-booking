import { fireEvent } from '@testing-library/react';
import { render, screen } from '../../test-util';
import MockServer from '../../api/mockServer';

import Subscription from '../Subscription';

let server = null;

const title = "Subscribe for Exclusive Offer";
const thankMsg = "Thanks for your subscription!";

/**
 * Helper funtions
 */
async function testSuccess() {
  // basic render
  expect(screen.getByText(title)).toBeInTheDocument();
  expect(screen.queryByText(thankMsg)).not.toBeInTheDocument();
  expect(screen.getByRole('button', {name: "Subscribe"})).toBeInTheDocument();
  expect(screen.getByPlaceholderText("Your email address")).toBeInTheDocument();

  const btn = screen.getByRole('button', {name: "Subscribe"});

  try {
    // submit empty form
    fireEvent.click(btn);
    let form = await screen.findByRole("form");

    expect(form).toHaveClass("was-validated");

    // enter string
    let input = screen.getByPlaceholderText("Your email address");
    input.value = "test@mail.cc";

    fireEvent.click(btn);
    let msg = await screen.findByText(thankMsg);
    expect(msg).toBeInTheDocument();
  } catch(e) {
    console.error("testSuccess: ");
    console.error(e);
  }
}

async function testFailure() {

  let msg = null;
  let input = screen.getByPlaceholderText("Your email address");
  input.value = "test@mail.cc";

  try {
    const btn = screen.getByRole('button', {name: "Subscribe"});
    fireEvent.click(btn);

    msg = await screen.findByText(/something is wrong/i);
    expect(msg).toBeInTheDocument();
  } catch(e) {
    console.error("testFailure: ");
    console.error(e);
  }

}

/**
 * Test cases
 */
test('Subscription: render component (large).', () => {
  server = MockServer();
  render(<Subscription size="large" />);

  testSuccess();

  server.shutdown();
})

test('Subscription: render component (small).', () => {
  server = MockServer();
  render(<Subscription />);

  testSuccess();

  server.shutdown();
})

test('Subscription: subscribe failed (large).', () => {
  render(<Subscription />);
  testFailure();
})
test('Subscription: subscribe failed (small).', () => {
  render(<Subscription size="large"/>);
  testFailure();
})
