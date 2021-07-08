function MemberProfile(props) {
  const {member} = props;

  if(!member) return <div></div>;

  const cardBtnStyles = "btn btn-light btn-block bg-light p-3";

  const cardInfo = (cards) => (
    <ul className="d-flex">
      {cards.map((card, idx) => (
        <li key={idx} className="w-50 mr-2">
          <a className={`${cardBtnStyles} text-left`} href="#">
            <p className="card-subtitle">{card.cardNum}</p>
            <p className="card-subtitle">{card.cardOwner}</p>
            <p className="d-flex justify-content-between card-subtitle">{card.expire} <span className={`icon-${card.type}`}></span></p>
          </a>
        </li>
      ))}
      <li key="add" className="w-50">
        <a className={`${cardBtnStyles} h-100 centering-total`} href="#">
          <span className="bg-primary rounded-circle material-icons text-light p-1">add</span>
        </a>
      </li>
    </ul>
  );

  return (
    <div className="col-lg-4 mb-5">

      <div className="d-flex justify-content-between my-4">
        <h2 className="h4">
          Profile
          <span className="badge badge-primary badge-pill small align-icons ml-2">
            <span className="material-icons">done</span> Verified
          </span>
        </h2>
        <a href="#" className="btn btn-link text-uppercase font-weight-bold">edit</a>
      </div>

      <div className="card bg-info">
        <div className="card-body">

          <div className="row">
            <div className="col-md-6 col-lg-12">

              <h6 className="card-title d-inline-block d-md-block d-lg-inline-block">User details</h6>
              <img src={member.pic} alt="profile picture" className="thumbnail rounded-lg align-top d-inline-block float-right float-md-none float-lg-right" />
              <div className="d-inline-block ml-md-3 ml-lg-0">
                <p className="card-subtitle mb-3">{member.name}</p>
                <p className="card-subtitle mb-3">{member.email}</p>
                <p className="card-subtitle mb-3">{member.phone}</p>
              </div>

            </div>

            <div className="col-md-6 col-lg-12">
              <h6 className="card-title">Payment methods</h6>
              {cardInfo(member.payments)}
            </div>
          </div>

        </div>
      </div>

    </div>
  );
}

export default MemberProfile;