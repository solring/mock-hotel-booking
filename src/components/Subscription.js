import { useState } from 'react';

function Subscription(props) {
  const {size} = props;

  const [email, setEmail] = useState("");

  const title = "Subscribe for Exclusive Offer";
  const form = (
    <form action="#" class="input-group input-group-lg" method="post">
      <input type="email" class="form-control" name="subscribeEmail"
        placeholder="Your email address"
        value={email} onChange={(e) => setEmail(e.target.value)}
      />
      <div class="input-group-append">
        <button class="btn btn-primary">Subscribe</button>
      </div>
    </form>
  );

  const formSmall = (
    <div class={`py-4 bg-info Subscribe`}>
      <div class="container">
        <div class="row no-gutters justify-content-between align-items-center">
          <div class="col-md-4 col-lg-5 text-center text-md-left">
            <h2 class="mb-3 mb-md-0">{title}</h2>
          </div>
          <div class="col-md-7">
            {form}
          </div>
        </div>
      </div>
    </div>
  );

  const formLarge = (
    <section class={`Subscribe--lg bg-info`} data-aos="fade-up">
      <div class="container d-flex flex-column justify-content-center align-items-center">
        <h2 class="fz-title mb-md-4 mb-3">{title}</h2>
        {form}
      </div>
    </section>
  );

  if (size === 'large') {
    return formLarge;
  } else {
    return formSmall;
  }
}

export default Subscription;