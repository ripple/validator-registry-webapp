# validators.ripple.com human user interface

[![Circle CI](https://circleci.com/gh/ripple/validator-registry-webapp.svg?style=svg)](https://circleci.com/gh/ripple/validator-registry-webapp)

Completely static html, css, and javascript

## Dependencies

````
npm install -g bower
bower install
npm install
````

## Development

````
npm start
````

Will start the development server on port 3000

## Configuration

All configuration is injected with `config/config.json`

For the staging and production environments Circle CI will copy
the corresponding config file to override config/config.json

