# Image recognition api



Nodejs + Vue.js(Vuetify) project. Imagga as image recognition service

### Installation
Install https://ngrok.com/ for port forwarding ( server to be acessable from the net )
### Server
```shad
$ cd titanium_test
$ npm i
```
- add .env variables { API_KEY= Imagga key; API_SECRET= Imagga secret; SERVER_ADDRESS= ngrok adress ( frontend will be doing calls to this link ) MONGO_ADDRESS= link to DB } 
- add to .babelrc : "plugins": [ "@babel/plugin-proposal-class-properties" ]

```
npm run dev
```
### Frontend
```shad
cd ./frontend
npm i
add .env variable VUE_APP_SERVER_ADDRESS=SERVER_ADDRESS ( ngrok link to server )
npm run serve
```