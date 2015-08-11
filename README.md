# validators.ripple.com human user interface

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

For the stating and production environments Circle CI will copy
the corresponding config file to override config/config.json

