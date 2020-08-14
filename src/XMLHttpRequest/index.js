function request(options) {
  let url = options.url;
  const method = options.method.toLocaleLowerCase() || 'get';
  const async = options.async;
  const data = options.data;
  const headers = options.headers;
  const xhr = new XMLHttpRequest();

  if (options.timeout && options.timeout > 0) {
    xhr.timeout = options.timeout;
  }

  return new Promise((resolve, reject) => {
    xhr.ontimeout = () => reject('timeout');
    xhr.onerror = (err) => reject(err);
    xhr.onreadystatechange = () => {
      if (xhr.readyState === 4) {
        if ((xhr.status >= 200 && xhr.status < 300) || xhr.status === 304) {
          resolve(xhr.responseText);
        } else {
          reject();
        }
      }
    };
    if (method === 'get') {
      let paramArr = [];
      if (data instanceof Object) {
        for (let key in data) {
          paramArr.push(
            encodeURIComponent(key) + '=' + encodeURIComponent(data[key])
          );
        }
      }
      url += `?${paramArr.join('&')}`;
    }

    xhr.open(method, url, async);
    for (let i in headers) {
      xhr.setRequestHeader(i, headers[i]);
    }
    if (method === 'get' || method === 'head') {
      xhr.send(null);
    } else {
      xhr.send(JSON.stringify(data));
    }
  });
}

// request({
//   url: 'http://129.28.162.148:8086/sys_domestic_routes/findById',
//   method: 'get',
//   data: { id: 100010 },
// }).then((res) => {
//   console.log(res);
// });
// request({
//   url: 'http://129.28.162.148:8086/sys_inland_route/insert',
//   method: 'post',
//   data: { schedules: [], name: '123' },
//   headers: { 'Content-Type': 'application/json' },
// })
//   .then((res) => {
//     console.log(res);
//   })
//   .catch((err) => {
//     console.log(err);
//   });
