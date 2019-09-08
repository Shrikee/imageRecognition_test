********

Nodejs + Vue.js(Vuetify) project.
Imagga as image recognition service 

- Instalation : 
    Install ngrok for port forwarding ( server to be acessable from the net )

Server side : 
    -cd $projectname
    -npm i 
    -add .env variables { API_KEY= Imagga key; API_SECRET= Imagga secret; SERVER_ADRESS= ngrok adress ( frontend will be doing calls to this link )
    MONGO_ADRESS= link to DB }
    - add to .babelrc :  "plugins": [
        "@babel/plugin-proposal-class-properties"
    ]

Frontend :
    - cd ./frontend
    - npm i
    - add .env variable VUE_APP_SERVER_ADRESS=SERVER_ADRESS ( ngrok link to server )

********



