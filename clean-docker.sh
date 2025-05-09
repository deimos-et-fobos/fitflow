#!/bin/bash
docker stop $(docker ps)
docker rm $(docker ps -l)
docker rmi $(docker images)