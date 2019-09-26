import {
  ADD_DESCRIPTIONS_TO_TIRES,
  ADD_DESCRIPTIONS_TO_VEHICLES
} from '../actions/viewsActions.js';

const INITIAL_STATE = {
  tiresView: [],
  vehiclesView: []
};

export const viewsReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ADD_DESCRIPTIONS_TO_TIRES:
      return {
        ...state,
        tiresView: action.tiresView
      };
    case ADD_DESCRIPTIONS_TO_VEHICLES:
      return {
        ...state,
        vehiclesView: action.vehiclesView
      };
    default:
      return state;
  }
};
