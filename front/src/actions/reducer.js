import { LOAD_CURRENT } from "./type";

const initialState = {
  cheque: {},
};

// Creating my reducer
export default function reducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_CURRENT:
      return { ...state, cheque: action.payload };
    default:
      return state;
  }
}
