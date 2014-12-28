oneliner-express
================

Describe anything in one line.
A proof of concept built with Express, and AngularJS.

### Client

Built with AngularJs. 

Use `grunt build` to minify and compile the project into `server/dist`.

### Server

#### Environments

In a production environment, Express will serve assets from `server/dist`. In a development environment, Express will serve assets from `client` directory.

Use `npm run-script dev` to launch the server in a development environment.

#### Testing

Run `npm test`

#### Deploying

After running `grunt build` in the `client` directory, the client source will be complied into `server/dist`.
`server` directory is the only thing that needs to be deployed. 

When deploying to Heroku, simply use git subtree to deploy the `server` directory.
`git subtree push --prefix server heroku master`

Don't forget to set the environment variable in Heroku.
`heroku config:set NODE_ENV=production`

### TODO

* Pagination
* Rails port
