#!/usr/bin/env bash

# Any subsequent(*) commands which fail will cause the shell script to exit immediately
set -euxo pipefail

## Preparing before docker build
prepare_before_docker_build() {
    echo "Make preparing jobs before docker build:"
    echo "Clean up backend and rebuild it..."
    ./gradlew clean :backend:app:assemble
}

## Main
### Go to directory this script belonged to
cd `dirname $0`
### Task
case "${1-''}" in
    build)
        # prepare_before_docker_build
        docker-compose build
        ;;
    up)
        # prepare_before_docker_build
        docker-compose up -d --build
        ;;
    down)
        docker-compose down
        ;;
    logs)
        docker-compose logs -f
        ;;
    *)
        echo "Usage: ./build.sh <build|up|down|logs>"
        ;;
esac