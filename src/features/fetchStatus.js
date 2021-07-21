export const SLICER_INIT = 'INIT';
export const AJAX_STATUES_LOADING = "AJAX_LOADING";
export const AJAX_STATUES_SUCCESS = "AJAX_SUCCESS";
export const AJAX_STATUES_FAILED = "AJAX_FAILED";

const empty = <div></div>;

export function switchFetchStatus(status, onSuccess=empty, onLoading=empty, onFailed=empty) {
  switch(status) {
    case AJAX_STATUES_SUCCESS:
      return onSuccess;
    case AJAX_STATUES_LOADING:
      return onLoading;
    case AJAX_STATUES_FAILED:
      return onFailed;
    default:
      return empty
  }
}