
window.loadConfig = function() {

  return new Promise(function(resolve, reject) {

    if (window.config) {

      resolve(config)
    } else {

      http
        .get('/config/config.json')
        .end(function(error, response) {

          window.config = response.body
          resolve(window.config)
        })
    }
  })
}

