export const GET_TIRES = 'GET_TIRES';

export const getAllTires = () => dispatch => {
  const fetchURL = `https://azaryah.sdyalor.me/api/graphql`;

  return fetch(fetchURL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    body: JSON.stringify({
      query: `query { neumaticos { codNeumatico codMarca codModelo codMedida codDiseno estado codProveedor} }`
    })
  })
    .then(r => r.json())
    .then(tires => dispatch({ type: GET_TIRES, tires }));
};
