import {render, fireEvent, screen} from '@testing-library/react';

import Filter from '../Filter';

const sections = [
  {
    title: "Deals",
    options: [
      {
        title: "freeCancel",
        text: "Free cancel",
      },
      {
        title: "noPrepay",
        text: "No prepayment",
      },
      {
        title: "specialOffer",
        text: "Special offer",
      },
    ],
  },
  {
    title: "Popular Filters",
    options: [
      {
        title: "breakfast",
        text: "Breakfast included",
      },
      {
        title: "freeWifi",
        text: "Free Wifi",
      },
      {
        title: "swimmingPool",
        text: "Swimming pool",
      },
    ],
  },
  {
    title: "Stay Type",
    options: [
      {
        title: "hotel",
        text: "Hotel",
      },
      {
        title: "apartment",
        text: "Apartment",
      },
      {
        title: "unique",
        text: "Unique",
      },
      {
        title: "hostel",
        text: "Hostel",
      },
    ],
  },
];

test('Filter: basic render, no handler, not fullscreen', () => {
  render(<Filter />);

  for (const sec of sections) {
    expect(screen.getByRole('heading', {name: sec.title})).toBeInTheDocument();

    for (const op of sec.options) {
      expect(screen.getByText(op.text)).toBeInTheDocument();
      expect(screen.getByLabelText(op.text).value).toBe("false");
    }
  }

  for (let i = 1; i <= 5; i++) {
    let str = "grade ".repeat(i).trim();
    expect(screen.getByText(str)).toBeInTheDocument();
    expect(screen.getByLabelText(`${str} ${i}.0`).value).toBe("false");
  }
  expect(screen.getByText("Unrated")).toBeInTheDocument();
  expect(screen.getByLabelText("Unrated").value).toBe("false");

  expect(screen.getByRole('heading', {name: "Budget"})).toBeInTheDocument();
  expect(screen.getByText('min price')).toBeInTheDocument();
  expect(screen.getByText('max price')).toBeInTheDocument();
});

test('Filter: click checkboxes.', async () => {

  const mockFunc = jest.fn(x => x);

  render(<Filter onFilter={mockFunc}/>);

  for (const sec of sections) {
    for (const op of sec.options) {
      let checkbox = screen.getByLabelText(op.text);
      fireEvent.click(checkbox);

      let res = await screen.findByLabelText(op.text);
      expect(res.value).toBe("true");
    }
  }
  expect(mockFunc).toBeCalledTimes(10);

  for (let i = 1; i <= 5; i++) {
    let str = "grade ".repeat(i).trim();
    let label = `${str} ${i}.0`;
    let check = screen.getByLabelText(label);
    fireEvent.click(check);

    let res = await screen.findByLabelText(label);
    expect(res.value).toBe("true");
  }
  let check = screen.getByLabelText('Unrated');
  fireEvent.click(check);
  expect(await screen.findByLabelText('Unrated'));

  expect(mockFunc).toHaveBeenCalledTimes(16);
});

test('Filter: test fullscreen mode', () => {

  const mockFunc = jest.fn(x => x);
  const mockToggle = jest.fn(x => x)

  render(
    <Filter
      onFilter={mockFunc}
      fullscreen={true}
      toggle={true}
      toggleSetter={mockToggle}
    />
  );
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

