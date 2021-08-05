import '@testing-library/jest-dom/extend-expect';
import { render , fireEvent, screen, resetStore } from '../../test-util';
import MockServer from '../../api/mockServer';
import SearchBar from '../SearchBar/SearchBar';

const locations = [
  ['Bangkok', 'Thailand'],
  ['Osaka', 'Japan'],
  ['Roma', 'Italy'],
  ['Paris', 'France'],
  ['Reykjavik', 'Iceland'],
];
let server = null;

beforeAll(() => {
  server = MockServer();
})

afterAll(() => {
  server.shutdown();
})

/**
 * Helper funtion:
 * Click all dropdown items and check UI change.
 */
const clickDestDropdownItems = async () => {
  const destBtn = screen.getByLabelText("searchItem-dest");
  expect(destBtn).toBeInTheDocument();

  // click dest
  fireEvent.click(destBtn);
  let menu = await screen.findByLabelText("searchMenu-dest");

  let btns = menu.querySelectorAll(".dropdown-item");
  expect(btns.length).toBeGreaterThan(0);

  for (const btn of btns) {
    fireEvent.click(btn);
    let input = await destBtn.querySelector('input');

    let city = btn.querySelector('p').textContent;
    let country = btn.querySelector('p.small').textContent;
    expect(input).toHaveValue(`${city}, ${country}`);
  }
};

/**
 * Helper function:
 * - Click date picker toggle and check UI.
 */
const clickDateBtn = async () => {
  const dateBtn = screen.getByLabelText("calendar");
  expect(dateBtn).toBeInTheDocument();

  // click date
  fireEvent.click(dateBtn);
  let picker = document.querySelector(".litepicker");
  expect(picker).toBeInTheDocument();
};

/**
 * Helper function:
 * Click guest picker toggle and check UI.
 * Click number picker and check UI.
 */
const clickGuestBtn = async () => {
  const guestBtn = screen.getByLabelText("searchItem-guest");
  expect(guestBtn).toBeInTheDocument();

  // click guest
  fireEvent.click(guestBtn);
  let menu = await screen.findByLabelText("searchMenu-guest");
  expect(menu).toBeInTheDocument();
  expect(menu).toHaveClass("show");
};


/**
 * Test cases
 */
test('render simplified.', async () => {
  render(<SearchBar simplified={true} />);
  await new Promise((resolve) => {
    setTimeout(resolve, 1000);
  });

  // Check buttons
  expect(screen.getByPlaceholderText("Destination")).toBeInTheDocument();

  expect(screen.getByText("Check-in / Check-out")).toBeInTheDocument();

  expect(screen.getByText(/Guest/)).toBeInTheDocument();

  await clickDestDropdownItems();

  await clickDateBtn();

  await clickGuestBtn();

});

test('render normal.', async () => {

  // to clear search options stored by the former test.
  resetStore();

  render(<SearchBar simplified={false} />);
  await new Promise((resolve) => {
    setTimeout(resolve, 1000);
  });

  // Check buttons
  expect(screen.getByRole('heading', {name: "destination"})).toBeInTheDocument();
  expect(screen.getByPlaceholderText("Destination")).toBeInTheDocument();

  expect(screen.getByRole('heading', {name: "check-in"})).toBeInTheDocument();
  expect(screen.getByRole('heading', {name: "check-out"})).toBeInTheDocument();
  expect(screen.getByRole('heading', {name: "check-in / out"})).toBeInTheDocument();

  expect(screen.getByRole('heading', {name: "guests"})).toBeInTheDocument();
  expect(screen.getAllByText("2 adults・1 room").length).toBe(2);

  await clickDestDropdownItems();

  await clickDateBtn();

  await clickGuestBtn();
});
