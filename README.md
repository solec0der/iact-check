Iact Check
==============

[![Build and Analyze Application](https://github.com/solec0der/iact-check/actions/workflows/build-and-analyze-core.yml/badge.svg)](https://github.com/solec0der/iact-check/actions/workflows/build-and-analyze-core.yml)
![GitHub tag (latest SemVer)](https://img.shields.io/github/v/tag/solec0der/iact-check?label=Version)

Table of content
----------------

* Prerequisites
Test



## MySQL

`docker run --name mysql -e MYSQL_ROOT_PASSWORD=root  -p 3306:3306 -d mariadb:latest --max_allowed_packet=100M`

## Keycloak

`docker run --name keycloak -e KEYCLOAK_USER=admin -e KEYCLOAK_PASSWORD=admin -d -p 8080:8080 jboss/keycloak:latest`
