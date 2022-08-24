# How to connect the backend

## Install homebrew if using macOS or Linux

### `/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"``

Installs [homebrew](https://brew.sh)

## Set up mySQL

### `brew install mysql`

Installs mySQL

### `brew services start mysql`

Starts the mySQL service

### `mysqladmin -u root password 'password'`

Sets password for root user

## `mysql -u root -p`

Asks you for the above password and accesses mySQL

## sequelize commands

### `npm i -g sequelize-cli`

Installs sequelize command line interface

## Choose location

`cd` into backend

### `sequelize db:create`

Creates your database

### `sequelize db:migrate`

Migrates database models into database

## Run `npm install` to install all packages

## nodemon

### `npm i -g nodemon`

Installs [nodemon](https://nodemon.io), a utility that monitors for any changes in your source and automatically restarts your server

### `nodemon app.js`

Starts the backend

## Useful software for macOS

### Beekeeper Studio

We recommend installing [`Beekeeper Studio`](https://www.beekeeperstudio.io/), an open source SQL editor and database manager.

### Insomnia

We recommend installing [Insomnia](https://insomnia.rest/download), a collaborative API client and design tool to build and test the APIs.
