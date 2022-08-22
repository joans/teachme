# How to connect the backend

## Install homebrew if using macOS or Linux

### `/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"``

Installs [homebrew](https://brew.sh)

## Set up mysql

### `brew install mysql`

Installs mysql

### `brew services start mysql`

Starts mysql

### `mysqladmin -u root password 'password'`

Sets password

## sequelize commands

### `npm i -g sequelize-cli`

Installs sequelize

## Choose location

`cd` into a directory with an Express app

### `sequelize db:create`

Creates your database

### `sequelize db:migrate`

Tests your connection

## nodemon

### `npm i -g nodemon`

Installs [nodemon](https://nodemon.io), a utility that monitors for any changes in your source and automatically restarts your server

### `nodemon app.js`

Starts the backend
