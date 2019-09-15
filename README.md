# Image recognition api



Nodejs + Vue.js(Vuetify) project. Imagga as image recognition service
### Installation
Install https://ngrok.com/ for port forwarding ( server to be acessable from the net if you dnon't have an AWS S3 )
### Server
```shad
$ cd project_dir
$ npm i
```
- add .env variables { API_KEY= Imagga key; API_SECRET= Imagga secret; SERVER_ADDRESS= ngrok adress  MONGO_ADDRESS= link to DB } 
- If you have an AWS S3 bucket add to .env - AWS_KEY=, AWS_SECRET=, AWS_REGION=, AWS_BUCKET=
- add to .babelrc : "plugins": [ "@babel/plugin-proposal-class-properties" ]

```
npm run dev
```
### Frontend
```shad
cd ./frontend
npm i
add .env variable VUE_APP_SERVER_ADDRESS=https://10df3d0f.ngrok.io/ (for example, fill in your address)
npm run serve
```

### Build instructions

To build frontend app(don't forget ./frontend/.env) : 
```shad
cd ./frontend
npm run build
```
dist folder will be created with the ready to deploy app

To build backend : 
```shad
cd project_folder 
npm run build 
```
dist folder will be created with the ready to deploy app (don't forget about .env)
