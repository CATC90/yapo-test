# Artist tracks finder (Yapo.cl test fullstack 2022)

## Instalación / Primeros pasos

Este proyecto consta de 2 partes (backend y frontend) cada una puede ser construida y puesta en marcha independientemente, sin embargo pueden ser montandas en simultaneo utilizando el comando `npm start` desde la raiz del proyecto, para esta acción se debe tener instalado docker previamente en la maquina.

### Dependencias

Para este proyecto fueron utilizadas las siguientes dependencias del sistema.

```
  node v17.0.0
  npm 8.1.0
  Angular CLI: 13.3.2
  Nest CLI Version : 8.2.5
```

```shell
git clone https://github.com/CATC90@yapo-test
cd yapo-test
npm start
```

> Inicio del proceso
> ![npm start](https://github.com/CATC90/yapo-test/blob/main/images/npm-start.png?raw=true)

> Final del proceso
> ![npm start finish](https://github.com/CATC90/yapo-test/blob/main/images/finish-docker-compose.png?raw=true)

> :warning: **En ocaciones el proceso de frontend no envia los logs a la consola por lo cual no se aprecia cuando termina**: pero se puede observar el proceso desde el dashboard de docker!
> ![docker dashboard](https://github.com/CATC90/yapo-test/blob/main/images/docker-dashboard.png?raw=true)

Una ves finalizado
El frontend se puede acceder por `http:localhost:4200/tracks`

El backend se lenvata en el `http:localhost:3000` y expone las siguientes rutas

```
http:localhost:3000/search_tracks?name=${artistName}
http:localhost:3000/favoritos?name=${artistName}
```

> ❗ Se incluye documento de postman para probar backend.

### Levantar frotend

Navegar al fichero `cd yapo-test-frontend` y ejecutar `npm i` seguido de `npm start`, el servicio se levantara en `http:localhost:4200` de igual manera.

Para ejecutar los test `npm run test` lo cual iniciara karma y correra los teste creados.

### Levantar backend

Navegar al fichero `cd yapo-test` y ejecutar `yarn` seguido de `yarn start:dev` lo cual iniciara el servicio en `http:localhost:3000`.

Para ejecutar los test `yarn test:all` lo cual ejecutara los test e2e y unitarios para luego mezclar los resultados y mostrar el coverage completo.
