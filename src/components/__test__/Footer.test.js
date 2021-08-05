import {render, fireEvent, screen} from '@testing-library/react';
import { LANGUAGES, CURRENCIES } from '../../utils/constants';
import Footer from '../Footer';

const selectOption = async (btnName, label) => {
  // open dropdown
  let dropdown = screen.getByLabelText(label);
  fireEvent.click(dropdown);

  // click option
  let btn = await screen.findByRole('button', {name: btnName});
  fireEvent.click(btn);

  let res = await screen.findByLabelText(label);
  expect(res).toHaveTextContent(btnName);
}


test('Footer: dropdowns', async () => {
  render(<Footer />)

  let dropdownLan = screen.getByLabelText("language");
  let dropdownCur = screen.getByLabelText("currency");

  expect(dropdownLan).toHaveTextContent(LANGUAGES[0]);
  expect(dropdownCur).toHaveTextContent(CURRENCIES[0]);

  await selectOption(LANGUAGES[1], "language");
  await selectOption(LANGUAGES[2], "language");

  await selectOption(CURRENCIES[1], "currency");
  await selectOption(CURRENCIES[2], "currency");

})
