# navigate-miami-map
A Leaflet map for Navigate Miami

**Demo** - https://maurop123.github.io/navigate-miami-map/

## How to add to your project

- add files in dist folder to your project
- add these lines to your index.html
```
<link href='https://fonts.googleapis.com/css?family=Roboto:300,400,500,700|Material+Icons' rel="stylesheet">
<link rel="stylesheet" href="https://unpkg.com/leaflet@1.3.1/dist/leaflet.css" integrity="sha512-Rksm5RenBEKSKFjgI3a41vrjkw4EVPlJ3+OiI65vTjIdo9brlAacEuKOiQ5OFh7cOI1bkDwLqdLw3Zg0cRJAAQ==" crossorigin=""/>
```
- add imports for the css and js files you copied from this project
- add vue runtime `<script src="https://cdn.jsdelivr.net/npm/vue"></script>`
- add a div like this somewhere on your page `<div id="miami-map"></div>`

## Setup to Develop
```
yarn install
yarn serve
```

Build with `yarn build`. This will setup your dist folder.
