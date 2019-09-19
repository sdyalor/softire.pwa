import { ADD_DESCRIPTIONS_TO_TIRES } from '../actions/viewsActions.js';

const INITIAL_STATE = {
  tiresView: []
};

export const tiresViewReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ADD_DESCRIPTIONS_TO_TIRES:
      return {
        ...state,
        tiresView: action.tiresView
      };
    default:
      return state;
  }
};
