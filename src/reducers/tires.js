import { GET_TIRES } from '../actions/tires.js';
//import { createSelector } from 'reselect';

const INITIAL_STATE = {
  tires: {},
  error: ''
};

const tires = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_TIRES:
      return {
        ...state,
        tires: action.tires
      };
    default:
      return state;
  }
};

export default tires;
