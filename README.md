# film-portal

## Run UI
```sh
cd film-ui
npm i
```
change config in ./dist/static/config.js if you need

#### For Dev
```sh
npm start
```
open localhost:3000

#### For Production
```sh
npm run build
node ./prod_server.js
```
open localhost:8081

## Run BE
#### You should use your MySql Sakila sample DB

```sh
cd film-be
npm i
```
change config in ./etc/config.js if you need

```sh
npm run nodemon
```
