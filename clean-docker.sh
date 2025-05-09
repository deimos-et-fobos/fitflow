#!/bin/bash
# Detener todos los contenedores en ejecución
docker stop $(docker ps -q)

# Eliminar todos los contenedores (detenidos y activos)
docker rm $(docker ps -aq)

# Eliminar todas las imágenes (forzadamente para evitar dependencias colgantes)
docker rmi -f $(docker images -q)