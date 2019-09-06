export const GET_TIRES = 'GET_TIRES';
export const GET_TIRE_CONDITIONS = 'GET_TIRE_CONDITIONS';
export const GET_TIRE_DESIGNS = 'GET_TIRE_DESIGNS';
export const GET_TIRE_BRANDS = 'GET_TIRE_BRANDS';
export const GET_TIRE_MEASURES = 'GET_TIRE_MEASURES';
export const GET_TIRE_MODELS = 'GET_TIRE_MODELS';

const fetchURL = `https://azaryah.sdyalor.me/api/graphql`;
export const getAllTires = () => dispatch => {
  return fetch(fetchURL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    body: JSON.stringify({
      query: `query { neumaticos { codNeumatico codMarca codModelo codMedida codDiseno estado codProveedor} }`
    })
  })
    .then(r => r.json())
    .then(tires => dispatch({ type: GET_TIRES, tires: tires.data }));
};

export const getAllTireConditions = () => dispatch => {
  return fetch(fetchURL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    body: JSON.stringify({ query: `query { condicionesNeumatico { codCondicion descripcion } }` })
  })
    .then(r => r.json())
    .then(conditions => dispatch({ type: GET_TIRE_CONDITIONS, tireConditions: conditions.data }));
};

export const getAllTireDesigns = () => dispatch => {
  return fetch(fetchURL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    body: JSON.stringify({ query: `query { disenosNeumatico { codDiseno descripcion } }` })
  })
    .then(r => r.json())
    .then(designs => dispatch({ type: GET_TIRE_DESIGNS, tireDesigns: designs.data }));
};

export const getAllTireBrands = () => dispatch => {
  return fetch(fetchURL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    body: JSON.stringify({ query: `query { marcaNeumatico { codMarca descripcion } }` })
  })
    .then(r => r.json())
    .then(brands => dispatch({ type: GET_TIRE_BRANDS, tireBrands: brands.data }));
};

export const getAllTireMeasures = () => dispatch => {
  return fetch(fetchURL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    body: JSON.stringify({ query: `query { medidaNeumatico { codMedida descripcion } }` })
  })
    .then(r => r.json())
    .then(measures => dispatch({ type: GET_TIRE_MEASURES, tireMeasures: measures.data }));
};

export const getAllTireModels = () => dispatch => {
  return fetch(fetchURL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    body: JSON.stringify({ query: `query { modeloNeumatico { codModelo descripcion } }` })
  })
    .then(r => r.json())
    .then(models => dispatch({ type: GET_TIRE_MODELS, tireModels: models.data }));
};
