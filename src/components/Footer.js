import { LANGUAGES } from '../utils/language';
import { Dropdown } from 'react-bootstrap';

import { useState } from 'react';

function Footer(props) {
  const {short} = props;

  //TODO: lift states
  const [lang, setLang] = useState('English');
  const [curr, setCurr] = useState('TWD');

  const currencies = [
    'TWD', 'JPY', 'USD'
  ];

  const langItem = (title) => (
    <Dropdown.Item key={title} onClick={(e) => setLang(title)}>
      {title}
    </Dropdown.Item>
  );

  const currItem = (title) => (
    <Dropdown.Item key={title} onClick={(e) => setCurr(title)}>
      {title}
    </Dropdown.Item>
  );

  const genOptions = () => {
    if (short === true) return;

    return(
      <ul className="navbar-nav d-none d-lg-flex">
        <li className="nav-item dropup">
          <Dropdown>
            <Dropdown.Toggle variant="light" id="dropdownFooterLang">
              <span className="material-icons icon-md">language</span> {lang}
            </Dropdown.Toggle>
            <Dropdown.Menu aria-labelledby="dropdownFooterLang">
              {LANGUAGES.map(langItem)}
            </Dropdown.Menu>
          </Dropdown>
        </li>
        <li className="nav-item dropup">
          <Dropdown>
              <Dropdown.Toggle variant="light" id="dropdownFooterCurrency">
                <span className="material-icons icon-md">attach_money</span> {curr}
              </Dropdown.Toggle>
              <Dropdown.Menu aria-labelledby="dropdownFooterLang">
                {currencies.map(currItem)}
              </Dropdown.Menu>
          </Dropdown>
        </li>
      </ul>
    );
  }

  let containerClass = (short === true) ? "col-lg-8 border-top border-info py-3" : "py-3";
  let navbarClass = (short === true) ? "row justify-content-cente" : "border-top border-info";
  let justifyContentLg = (short === true) ? "" : "justify-content-lg-start";

  return (
      <div className={`navbar navbar-expand navbar-light ${navbarClass}`}>
        <div className={`container justify-content-between ${containerClass}`}>
          <div className="d-flex w-100 justify-content-between">
            <div className={`d-flex flex-column-reverse flex-md-row justify-content-between flex-fill ${justifyContentLg}`}>

              <p className="navbar-text text-sub mr-0 mr-md-6 text-center">© 2020 ALOHA, Inc. All rights reserved.</p>
              <ul className="nav flex-row text-sub justify-content-center justify-content-md-start">
                <li className="nav-item"><a href="faq.html" className="nav-link">FAQs</a></li>
                <li className="nav-item"><a href="terms.html" className="nav-link">Terms of use</a></li>
                <li className="nav-item"><a href="privacy.html" className="nav-link">Privacy policy</a></li>
              </ul>
            </div>
            {genOptions()}
          </div>
        </div>
      </div>
  );
}

export default Footer;