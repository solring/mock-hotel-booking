import PropTypes from 'prop-types'

import { LANGUAGES, CURRENCIES } from '../utils/constants';
import { Dropdown } from 'react-bootstrap';

import { useState } from 'react';

function Footer(props) {
  const {short} = props;

  const [lang, setLang] = useState(LANGUAGES[0]);
  const [curr, setCurr] = useState(CURRENCIES[0]);

  const langItem = (title) => (
    <Dropdown.Item key={title} role='button' onClick={(e) => setLang(title)}>
      {title}
    </Dropdown.Item>
  );

  const currItem = (title) => (
    <Dropdown.Item key={title} role='button' onClick={(e) => setCurr(title)}>
      {title}
    </Dropdown.Item>
  );

  const genOptions = () => {
    if (short === true) return;

    return(
      <ul className="navbar-nav d-none d-lg-flex">
        <li className="nav-item dropup">
          <Dropdown>
            <Dropdown.Toggle variant="light" id="dropdownLang" aria-label="language">
              <span className="material-icons icon-md">language</span> {lang}
            </Dropdown.Toggle>
            <Dropdown.Menu aria-labelledby="dropdownLang">
              {LANGUAGES.map(langItem)}
            </Dropdown.Menu>
          </Dropdown>
        </li>
        <li className="nav-item dropup">
          <Dropdown>
              <Dropdown.Toggle variant="light" id="dropdownCurrency" aria-label="currency">
                <span className="material-icons icon-md">attach_money</span> {curr}
              </Dropdown.Toggle>
              <Dropdown.Menu aria-labelledby="dropdownCurrency">
                {CURRENCIES.map(currItem)}
              </Dropdown.Menu>
          </Dropdown>
        </li>
      </ul>
    );
  }

  let containerClass = (short === true) ? "col-lg-8 border-top border-info py-4" : "py-3";
  let navbarClass = (short === true) ? "row no-gutters justify-content-center p-0" : "border-top border-info";
  let justifyContentLg = (short === true) ? "" : "justify-content-lg-start";

  return (
    <footer className={`navbar navbar-expand navbar-light ${navbarClass}`}>
      <div className={`container justify-content-between ${containerClass}`}>
        <nav className="d-flex w-100 justify-content-between" aria-label="service infomation">
          <div className={`d-flex flex-column-reverse flex-md-row justify-content-between flex-fill ${justifyContentLg}`}>

            <p className="navbar-text text-sub mr-0 mr-md-6 text-center">© 2020 ALOHA, Inc. All rights reserved.</p>
            <ul className="nav flex-row text-sub justify-content-center justify-content-md-start">
              <li className="nav-item"><a href="faq.html" className="nav-link">FAQs</a></li>
              <li className="nav-item"><a href="terms.html" className="nav-link">Terms of use</a></li>
              <li className="nav-item"><a href="privacy.html" className="nav-link">Privacy policy</a></li>
            </ul>
          </div>
          {genOptions()}
        </nav>
      </div>
    </footer>
  );
}

Footer.propTypes = {
  short: PropTypes.bool,
}

export default Footer;