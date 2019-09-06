export const GET_VEHICLES = 'GET_VEHICLES';
export const GET_VEHICLE_MODELS = 'GET_VEHICLE_MODELS';
export const GET_VEHICLE_TYPES = 'GET_VEHICLE_TYPES';
export const GET_VEHICLE_BRANDS = 'GET_VEHICLE_BRANDS';
export const GET_VEHICLE_CONFIGURATIONS = 'GET_VEHICLE_CONFIGURATIONS';

function fetchGraphQL({ query }) {
  const fetchURL = `https://azaryah.sdyalor.me/api/graphql`;
  return fetch(fetchURL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    body: JSON.stringify({
      query: query
    })
  })
    .then(r => r.json())
    .then(r => r.data);
  //  .then(r => r.data);
}
/*  Fetch fromVehicles */
/** historial vehiculos*/

export const getAllVehicles = () => dispatch => {
  return fetchGraphQL({
    query: `query { vehiculo {codVehiculo codMarca codModelo codTipo placa codConfiguracion} }`
  }).then(vehicles => dispatch({ type: GET_VEHICLES, vehicles }));
};

export const getAllVehicleModels = () => dispatch => {
  return fetchGraphQL({ query: `query { modeloVehiculo { codModelo descripcion } }` }).then(
    vehicleModels => dispatch({ type: GET_VEHICLE_MODELS, vehicleModels })
  );
};

export const getAllVehicleTypes = () => dispatch => {
  return fetchGraphQL({
    query: `query { tipoVehiculo { codTipo descripcion } }`
  }).then(vehicleTypes => dispatch({ type: GET_VEHICLE_TYPES, vehicleTypes }));
};

export const getAllVehicleBrands = () => dispatch => {
  return fetchGraphQL({
    query: `query { marcaVehiculo { codMarca descripcion } }`
  }).then(vehicleBrands => dispatch({ type: GET_VEHICLE_BRANDS, vehicleBrands }));
};

export const getAllVehicleConfigurations = () => dispatch => {
  return fetchGraphQL({
    query: `query { configuracion { codConfi descripcion } }`
  }).then(vehicleConfigurations =>
    dispatch({ type: GET_VEHICLE_CONFIGURATIONS, vehicleConfigurations })
  );
};
