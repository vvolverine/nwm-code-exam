# Overview
## Prerequisites
Please ensure that Node and NPM installed on machine
## How to execute
Before execution please check that project has all required dependencies. For this please execute 
`npm install`
### Rest API suite
To start scenarios for all CRUD operations run
`npm run rest-suite`

To start scenario for specific operation execute
`npm run rest-suite -- --tags=@put`
### Web suite
To start checkout scenario execute
`npm run web-suite`
### Performance suite
To avoid overwhelming requests to real production services, dummy REST service was introduced. To start working with it, please build the Docker image first and then start it locally.

*NOTE* The Docker machine instance required, so please check that you have one and it is up and running

```
cd load_test/dummy_server
docker build -t {your_name_here}/dummy-web-app .
docker run -p 17080:7070 -d {your_name_here}/dummy-web-app
```

This will start simple REST service with available root endpoint and GET method
`http://localhost:17080` will return `{"greetings":"Hello!"}`

Once the service under the load ready, please check that k6 tool available locally
```
 > k6 version
   k6 v0.26.2 (dev build, go1.14, darwin/amd64)
```

Execute from the root of the project `k6 run load_test/load_script.js` that will start execution
After execution statistic will be printed. 3 stages was used to ramp up Virtual User Count to 20.

After test is done stop the docker container with application for test. Check the container id and stop it.
```
 > docker ps
 CONTAINER ID        IMAGE                   COMMAND                  CREATED             STATUS              PORTS                     NAMES
 70fe4bf90a59        pheodor/dummy-web-app   "docker-entrypoint.s…"   3 minutes ago       Up 3 minutes        0.0.0.0:17080->7070/tcp   relaxed_antonelli
 > docker stop 70fe4bf90a59
 70fe4bf90a59
```