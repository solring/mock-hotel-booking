function ButtomModel(props) {
  const { total, roomNum, night} = props;
  return (
<div id="cartCollapse" class="collapse bottom-modal fixed-bottom">
  <div class="bottom-modal-wrapper">
    <div class="container d-flex justify-content-md-between flex-column flex-md-row">
      <div>
        <p class="small text-secondary">{roomNum} room・{night} night</p>
        <h4 class="mb-4">TWD {total}</h4>
      </div>
      <div class="row">
        <div class="col-6">
          <button class="btn btn-outline-primary btn-lg btn-block text-uppercase" data-target="#cartCollapse" data-toggle="collapse">cencel</button>
        </div>
        <div class="col-6">
          <a href="./reservation" class="btn btn-primary btn-lg btn-block text-uppercase">reserve</a>
        </div>
      </div>
    </div>
  </div>
</div>
  );
}

export default ButtomModel;