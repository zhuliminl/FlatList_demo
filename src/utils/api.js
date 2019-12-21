const defaultParams = {
  query: {},
  timeout: 10000,
  method: 'GET',
  body: {},
  headers: {'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'},
};

export default (url, params) => {
  const root = {};
  let {host = 'http://192.168.7.179:3000', sessionId = ''} = root;

  params = {...defaultParams, ...params};

  let {headers, query, method, body, timeout} = params;

  headers['sessionId'] = sessionId;

  let URL = `${host}${url}`;
  if (Object.keys(query).length !== 0) {
    URL = `${URL}?${Object.keys(query)
      .map(item => `${item}=${query[item]}`)
      .join('&')}`;
  }

  if (headers['Content-Type'] === undefined) {
    headers['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';
  }

  if (
    headers['Content-Type'] ===
    'application/x-www-form-urlencoded;charset=UTF-8'
  ) {
    body = Object.keys(body)
      .map(item => `${item}=${encodeURIComponent(body[item])}`)
      .join('&');
  } else {
    body = JSON.stringify(body);
  }

  method = method.toUpperCase();

  return timeoutPromise(
    10 * 1000,
    fetchData(URL, {
      method,
      headers,
      body,
    }),
  );
};

function fetchData(URL, {method, headers, body}) {
  return fetch(URL, {
    method,
    headers,
    body,
  })
    .then(response => {
      // console.log('saul API res', response.url, response.status);
      if (response.ok) {
        return response.json();
      } else {
        console.log('saul FetchError', JSON.parse(JSON.stringify(error)));

        const error = new Error(response.statusText);
        error.response = response;
        throw error;
      }
    })
    .then(res => {
      console.log('zhuliminl res data', res, URL);
      return res.data;
    })
    .catch(err => {
      throw err;
    });
}

function timeoutPromise(ms, promise) {
  return new Promise((resolve, reject) => {
    const timeoutId = setTimeout(() => {
      reject(new Error('networkTimeOut'));
    }, ms);
    promise.then(
      res => {
        clearTimeout(timeoutId);
        resolve(res);
      },
      err => {
        clearTimeout(timeoutId);
        reject(err);
      },
    );
  });
}
