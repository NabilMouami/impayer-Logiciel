import { LOAD_CURRENT } from "./type";

export const load= (item) => (dispatch) => {

  return dispatch({
    type: LOAD_CURRENT,
    payload: item,
  });
};


