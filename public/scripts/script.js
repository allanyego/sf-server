const responseOutput = document.querySelector("#response-output");
function setupRequestButtons() {
  let routeButtons = document.querySelectorAll('.route-item button');
  routeButtons = Array.from(routeButtons);
  
  routeButtons.forEach(function(btn) {
    btn.addEventListener('click', initRequest, false);
  })
}

document.addEventListener('DOMContentLoaded', () => {
  setupRequestButtons()
}, false);

function initRequest(event) {
  const removeSpinner = createSpinner(event.target.parentNode),
        {method, url} = event.target.dataset;
  request(method, url)
    .then(res => {
      removeSpinner();
      responseOutput.textContent = res;
      openmodal('response-modal');
    })
    .catch(err => {
      removeSpinner();
      if (err.res) {
        responseOutput.textContent = err.res;
      } else {
        response.textContent = err
      }

      openmodal('response-modal');
    });
}

function createSpinner(parent) {
  const spinner = document.createElement('i');
  spinner.classList.add('fas', 'fa-spinner');
  parent.appendChild(spinner);
  return () => {
    parent.removeChild(spinner);
  };
}

function request(method, url, body) {  
  if (!method || !url) {
    return Promise.reject(new Error("request() requies a 'url' and 'method'"));
  }
  
  if ((method = method.toUpperCase()) === 'GET') {
    if (body && typeof body === 'object') {
      url = url + '/' + encodeFormData(body);
    }
  }
  if (method === 'POST') {
    if (!body || typeof body !== 'object') {
      return Promise.reject(new Error('Missing/invalid POST body.'));
    }
    body = encodeFormData(body);
  }

  const baseURL = window.location.origin;
  const xhr = new XMLHttpRequest();
  return new Promise((resolve, reject) => {
    console.log('Response to', baseURL, '-', url);
    xhr.open(method, baseURL + url);
    xhr.onload = () => {
        if (xhr.status >= 400)
            reject({res: xhr.responseText});
        else
            resolve(xhr.responseText);
    };
    xhr.onerror = (err) => {
      reject(err.message);
    };
    xhr.send(body);
  });
}

function encodeFormData(data) {
  if (!data) return ""; // always return a string
  const pairs = [];
  for (let prop in data) {
    if (!data.hasOwnProperty(prop)) continue;
    if (typeof prop === 'function') continue;
    let value = data[prop].toString();
    // Encode and add to temp array
    prop = encodeURIComponent(prop.replace(" ", "+"));
    value = encodeURIComponent(value.replace(" ", "+"));
    pairs.push(prop + "=" + value);
  }
  return pairs.join("&");
}

function showCustomSnack(snackId, msg) {
    document.querySelector('#'+snackId).textContent = msg;
    showsnackbar(snackId);
  }