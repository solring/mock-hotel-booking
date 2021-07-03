function Filter(props) {
  return <div></div>;
}

function FullscreenFilter(props) {
  return (

<div id="filterCollapse" class="fullscreen-collapse collapse">
<div class="fullscreen-collapse-wrapper">

<div class="fullscreen-header bg-light">
  <div>
    <span class="material-icons icon-lg">filter_list</span> FILTER
  </div>
  <button type="button" class="btn btn-link text-dark" data-toggle="collapse" data-target="#filterCollapse">
    <span class="material-icons icon-lg">close</span>
  </button>
</div>

<div class="fullscreen-content bg-info">
  <div class="container pt-4">
    <Filter />
  </div>
</div>

<div class="fullscreen-footer bottom-modal text-left">
  <div class="bottom-modal-wrapper">
    <h4 class="mb-4">Find 1,245 results</h4>
    <div class="row">
      <div class="col-6"><button class="btn btn-outline-light btn-lg btn-block text-uppercase" data-toggle="collapse" data-target="#filterCollapse">clear</button></div>
      <div class="col-6"><button class="btn btn-primary btn-lg btn-block text-uppercase" data-toggle="collapse" data-target="#filterCollapse">filter</button></div>
    </div>
  </div>
</div>

</div>
</div>
  );
}

export default Filter;