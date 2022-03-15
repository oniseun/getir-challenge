# getir-Challenge

> A RESTful API with a single endpoint that fetches the data in the
provided MongoDB collection and return the results in the requested format.

## Build Setup

``` bash
# Resources
- Node.js 12+
- Npm
- Docker
- Postman
- Mongodb

# install dependencies
$ yarn install

# create .env file
> create .env file from .envsample and update the MONGODB_URL to your prefered mongodb connection string


# Import environment and collection on postman
> Import postman collection and environment for local and live from the /docs folder

# run test with
$ yarn test

# serve with hot reload at localhost:3000
$ yarn dev

# build for production and launch server
$ yarn prod

# Live Deployed version on heroku

$ GET https://getir-challenge-nodejs.herokuapp.com/api/v1/health



$ POST https://getir-challenge-nodejs.herokuapp.com/api/v1/find/record

$    {
$       "startDate": "2016-01-26",
$        "endDate": "2018-02-02",
$        "minCount": 2700,
$        "maxCount": 3000
$    }