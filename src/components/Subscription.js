import React from 'react';
import { useState } from 'react';
import api, { Subscribe } from '../api/mockApi';

function Subscription(props) {
  const {size} = props;

  const [subscribed, setSubscribed] = useState(false);

  const title = "Subscribe for Exclusive Offer";
  const thankMsg = "Thanks for your subscription!";

  const EmailForm = (props) => {

    const [email, setEmail] = useState("");
    const [validating, setValidating] = useState("");

    const subscribe = (e) => {
      e.preventDefault();

      setValidating("was-validated");
      if(e.target.checkValidity()===false) return;

      api(Subscribe(email)).then((r) => {
        if(r.success === true) setSubscribed(true);
      }).catch((e) => {
        console.error("failed sending subscription.");
        console.error(e);
      });
    };

    return (
      <form className={`input-group input-group-lg ${validating}`}
        noValidate
        onSubmit={subscribe}
      >
        <input type="email" className="form-control" name="subscribeEmail"
          placeholder="Your email address" required
          value={email} onChange={(e) => setEmail(e.target.value)}
        />
        <div className="input-group-append">
          <button className="btn btn-primary" type="submit">Subscribe</button>
        </div>
        <div className="invalid-feedback">Please enter valid email.</div>
      </form>
    );
  };

  function SmallForm(props) {
    const successMsg = (
      <div className="col-md-8 text-center">
        <h2 className="mb-3 mb-md-0">{thankMsg}</h2>
      </div>
    );

    const subform = (
      <React.Fragment>
      <div className="col-md-4 col-lg-5 text-center text-md-left">
        <h2 className="mb-3 mb-md-0">{title}</h2>
      </div>
      <div className="col-md-7">
        <EmailForm />
      </div>
      </React.Fragment>
    );

    return (
      <div className={`py-4 bg-info Subscribe`}>
        <div className="container">
          <div className="row no-gutters justify-content-between align-items-center">
            {subscribed ? successMsg : subform}
          </div>
        </div>
      </div>
    )
  }

  function LargeForm(props) {
    const successMsg = (
      <h2 className="fz-title mb-md-4 mb-3">{thankMsg}</h2>
    );

    const subform = (
      <React.Fragment>
        <h2 className="fz-title mb-md-4 mb-3">{title}</h2>
        <EmailForm />
      </React.Fragment>
    )

    return (
      <section className={`Subscribe--lg bg-info`} data-aos="fade-up">
        <div className="container d-flex flex-column justify-content-center align-items-center">
          {subscribed ? successMsg : subform}
        </div>
      </section>
    )
  }

  if (size === 'large') {
    return <LargeForm />;
  } else {
    return <SmallForm />;
  }
}

export default Subscription;