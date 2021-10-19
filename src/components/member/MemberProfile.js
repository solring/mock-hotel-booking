import Loading from '../Loading';

function CardBtn({className, children, ...props}) {
  return <button className={"btn btn-light btn-block bg-light p-3 " + className} {...props}>{children}</button>;
}

function MemberProfile(props) {
  const {member, loading} = props;

  const cardInfo = (cards) => (
    <ul className="d-flex align-items-stretch">
      {cards.map((card, idx) => (
        <li key={idx} className="w-50 mr-2">
          <CardBtn className="text-left">
            <p className="card-subtitle">{card.cardNum}</p>
            <p className="card-subtitle">{card.cardOwner}</p>
            <p className="d-flex justify-content-between card-subtitle">{card.expire} <span className={`icon-${card.type}`}></span></p>
          </CardBtn>
        </li>
      ))}
      <li key="add" className="w-50">
        <CardBtn className="h-100 centering-total">
          <span className="bg-primary rounded-circle material-icons text-light p-1">add</span>
        </CardBtn>
      </li>
    </ul>
  );

  const Profile = () => {

    if(!member || Object.keys(member).length === 0) return (
      <div className="card-body">
        <h6>No data.</h6>
      </div>
    );

    return (
    <div className="card-body">

      <div className="row">
        <div className="col-md-6 col-lg-12">

          <h6 className="card-title d-inline-block d-md-block d-lg-inline-block">User details</h6>
          <img src={member.pic} alt="profile" className="thumbnail rounded-lg align-top d-inline-block float-right float-md-none float-lg-right" />
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
    )
  };

  return (
    <div className="col-lg-4 mb-5">

      <div className="d-flex justify-content-between my-4">
        <h2 className="h4">
          Profile
          { member && member.verified &&
            <span className="badge badge-primary badge-pill small align-icons ml-2">
              <span className="material-icons">done</span> Verified
            </span>
          }
        </h2>
        <button className="btn btn-link text-uppercase font-weight-bold">edit</button>
      </div>

      <div className="card bg-info">
        { loading ? <div className="card-body"><Loading /></div> : Profile() }
      </div>

    </div>
  );
}

export default MemberProfile;