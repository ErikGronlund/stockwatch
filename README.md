# Stockwatch

Simple Lab project where I'm trying out Universal React and JavaScript (sharing same code between client and server). 

In this app the user can login using Facebook or Google account and add a number of stocks that should be fetched using the Yahoo finance api. The stocks are presented in a table using React.

Result is stored in a MongoDB and a local db is required to be up and running for this project to run.

## Getting started

Install [Node](https://nodejs.org/en/) using [nvm](https://github.com/creationix/nvm)

Install [mongoDB](https://docs.mongodb.org/manual/installation/) and make sure it is started locally

To start a dev server

```
npm install
gulp (requires gulp to be installed globally right now)
```