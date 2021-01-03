COMPOSE_PROJECT := ticket-management
DOCKER_NETWORK_NAME := n1
export

.PHONY: up build npmBuild buildUp start down clean network

docker_compose := docker-compose -p ${COMPOSE_PROJECT} -f docker-compose.yaml

up: network
	${docker_compose} up -d
build:
	${docker_compose} build ${service}
npmBuild:
	@cd ../auth; npm run build
	@cd ../ticket; npm run build
buildUp: npmBuild build up
start:
	${docker_compose} start
down:
	${docker_compose} down
clean:
	${docker_compose} down -v
	docker network rm ${DOCKER_NETWORK_NAME}
network:
	docker network inspect ${DOCKER_NETWORK_NAME} >/dev/null 2>&1 || \
	    docker network create --driver bridge ${DOCKER_NETWORK_NAME}
