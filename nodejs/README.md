# NodeJS Related Info

## Framework & Extension & Plugin

### Swagger

Installation

```bash
# Swagger related components installation.
$ npm install --save cookie-parser express swagger-jsdoc swagger-ui-express
$ npm install --save-dev nodemon
```

### MoleculerJS

`MoleculerJS` is a framework capable of creating and managing microservices

#### Simple demo for a quick start

```bash
# Enter workdir
$ cd moleculer-demo

# Test case for service communication in single node mode
$ npm install --save moleculer
## Run coding
$ node starter/single-broker.js

# Core concepts learning: an actual implementation of an online store showing the flow of user's request.
## Need nats server as a communicatoin bus.
$ docker run -d --name nats-main -p 4222:4222 -p 6222:6222 -p 8222:8222 nats
### nats cluster - Not necessary
$ docker run -d --name=nats-2 --link nats-main -p 5222:4222 -p 7222:6222 -p 9222:8222 nats -c nats-server.conf --routes=nats-route://ruser:T0pS3cr3t@nats-main:6222 -DV
### Checkout nats server (clusters) info by accessing http based monitor service with browser.
$ open http://localhost:8222
## Install independencies for online store
$ npm install --save moleculer moleculer-web nats
## Run coding
$ node starter/multi-brokers.js
## Access the moleculer's services with curl requesting the http web gateway server.
$ curl http://localhost:3000/products
```

#### Start MoleculerJS with official template by `moleculer-cli`

```bash
# Install project generation tools globally.
$ npm install -g moleculer-cli
# Init a new project for a module.
$ moleculer init module my-module
# Init a new Moleculer project.
$ moleculer init project my-first-project
# Init a new Moleculer project with typescript template
$ moleculer init project-typescript moleculer-ts
```

#### Start all in one MoleculerJS project

```bash
# Use all in one scaffold with moleculerjs, swagger, docker etc.
$ git clone https://github.com/pankod/moleculerjs-boilerplate.git
```

## Reference

[MoleculerJS Example](https://moleculer.services/docs/0.14/examples.html). Please start from Short examples.

[Core concepts illustrated by an implementation of the flow of user's request](https://moleculer.services/docs/0.14/concepts.html)

[MoleculerJS code source in Github](https://github.com/moleculerjs/moleculer)

[MoleculerJS Architecture](https://wiredelta.com/moleculerjs-framework-for-nodejs/)

[MoleculerJS project generatation tools moleculer-cli](https://www.npmjs.com/package/moleculer-cli)

[MoleculerJS's module list](https://moleculer.services/modules.html)

[nats server](https://hub.docker.com/_/nats/)

[moleculerjs-boilerplate](https://pankod.github.io/moleculerjs-boilerplate/docs/setup)
