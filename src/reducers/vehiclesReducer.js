import {
  GET_VEHICLES,
  GET_VEHICLE_TYPES,
  GET_VEHICLE_BRANDS,
  GET_VEHICLE_MODELS,
  GET_VEHICLE_CONFIGURATIONS
} from '../actions/vehiclesActions.js';
//import { createSelector } from 'reselect';

const INITIAL_STATE = {
  vehicles: [],
  vehicleTypes: [],
  vehicleBrands: [],
  vehicleModels: [],
  vehicleConfigurations: [],
  error: ''
};

export const vehiclesReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_VEHICLES:
      return {
        ...state,
        vehicles: action.vehicles
      };
    case GET_VEHICLE_TYPES:
      return {
        ...state,
        vehicleTypes: action.vehicleTypes
      };
    case GET_VEHICLE_BRANDS:
      return {
        ...state,
        vehicleBrands: action.vehicleBrands
      };
    case GET_VEHICLE_MODELS:
      return {
        ...state,
        vehicleModels: action.vehicleModels
      };
    case GET_VEHICLE_CONFIGURATIONS:
      return {
        ...state,
        vehicleConfigurations: action.vehicleConfigurations
      };
    default:
      return state;
  }
};
