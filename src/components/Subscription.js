import './Subscription.scss';

function Subscription(props) {
  const {size} = props;

  const formSmall = (
    <div class="py-4 bg-info subscribe">
      <div class="container">
        <div class="row no-gutters justify-content-between align-items-center">
          <div class="col-md-4 col-lg-5 text-center text-md-left">
            <h2 class="mb-3 mb-md-0">Subscribe for Exclusive Offer</h2>
          </div>
          <div class="col-md-7">
            <form action="#" class="input-group input-group-lg w-100" method="post">
              <input type="email" class="form-control" name="subscribeEmail" placeholder="Your email address" />
              <div class="input-group-append">
                <button class="btn btn-primary">Subscribe</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );

  const formLarge = (
    <section class="subscribe-lg bg-info" data-aos="fade-up">
      <div class="container d-flex flex-column justify-content-center align-items-center">
        <h2 class="fz-title mb-md-4 mb-3">Subscribe for Exclusive Offer</h2>
        <form action="#" class="input-group input-group-lg w-md-50" method="post">
          <input type="email" class="form-control" name="subscribeEmail" placeholder="Your email address" />
          <div class="input-group-append">
            <button class="btn btn-primary">Subscribe</button>
          </div>
        </form>
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