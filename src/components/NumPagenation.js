function NumPagenation(props) {
  const {start, end, min, max} = props;

  let nums = [];
  for(let i = start; i<end+1; i++) {
    nums.push(i);
  }

  return (
    <nav className="bg-info rounded-lg p-3 w-100 mt-4 mb-5 d-flex justify-content-between">
      <button className="btn btn-outline-primary text-uppercase">previous</button>
      <ul className="pagination">

        {min && <li key={min} className="page-item"><a className="page-link" href="#">{min}</a></li>}
        {min && <li key="upperEllipsis" className="page-item text-primary">...</li>}
        {nums.map((n) => <li key={n} className="page-item d-none d-md-block"><a className="page-link" href="#">{n}</a></li>)}
        {max && <li key="lowerEllipsis" className="page-item text-primary">...</li>}
        {max && <li key={max} className="page-item"><a className="page-link" href="#">{max}</a></li>}

      </ul>
      <button className="btn btn-primary text-uppercase">next</button>
    </nav>
  )
}

export default NumPagenation;