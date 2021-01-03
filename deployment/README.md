# Docker Deployment Helpers
This repository contains Docker deployment scripts of the micro-services. Makefile manages all Docker commands.

## Deployment
Following command builds and deploys containers.
```
make buildUp
```

## Available Make Commands

### up
It deploys all containers and creates the network if it doesn't exist.

### build
It builds Docker containers.
```
make build
make build service="gateway"
```

### npmBuild
It runs `npm run build` commands.

### buildUp
It runs `npmBuild`, `build` and `up` in order.

### start
It runs docker-compose.

### down
It downs docker-compose.

### clean
It downs docker-compose with option -v removes volumes and removes network.

### network
It creates the network if it doesn't exist.

