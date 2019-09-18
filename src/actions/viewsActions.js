export const TRANSPILE_TIRES = 'TRANSPILE_TIRES';

export const transpileAllTires = allTires => {
  return allTires;
};

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
