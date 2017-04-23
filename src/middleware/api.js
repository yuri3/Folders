import fetch from 'isomorphic-fetch';

export const CALL_API = 'CALL API';

const callApi = (endpoint, requestOptions) => {
  return fetch(`http://localhost:3001/${endpoint}`, requestOptions)
    .then(response => {
      const json = response.json();
      if(response.ok) {
        return json;
      } else {
        //return json.then((error) => Promise.reject(error));
        return Promise.reject(json);
      }
    });
};

export default store => next => action => {
  const callAPI = action[CALL_API];
  if(typeof callAPI === 'undefined') {
    return next(action);
  }

  const {types, requestOptions = {}} = callAPI;
  let {endpoint} = callAPI;

  if(typeof endpoint === 'function') {
    endpoint = endpoint(store.getState());
  }

  if(typeof endpoint !== 'string') {
    throw new Error('Specify a string endpoint URL.');
  }
  if(!Array.isArray(types) || types.length !== 3) {
    throw new Error('Expected an array of three action types.');
  }
  if(!types.every(type => typeof type === 'string')) {
    throw Error('Expected action types to be strings.');
  }

  const [requestType, successType, failureType] = types;
  next({type: requestType});
  setTimeout(() => {
    return callApi(endpoint, requestOptions)
      .then(response => {
        next({type: successType, response})
      })
      .catch(error => {
        //console.log(error);
        next({
          type: failureType,
          error: error.message || 'Something bad happened.',
        })
      });
  }, 1000);
};
