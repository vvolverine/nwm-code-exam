# Overview
## Prerequisites
Please ensure that Node and NPM installed on machine
## How to execute
Please step in into `functional_test` directory
```
     > cd functional_test
```
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
#### Allure Reports
*NOTE* Available only for functional tests

After rest or web suite execution, please run `npm run allure-serve `. This will generate report and open it in a browser.

For non interactive mode plain generation option present `npm run allure-generate` that will just generate report but not open it.
### Performance suite - Local
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

Execute from the root of the project `k6 run load_test/load_script/load_script.js -e APP_HOST=localhost -e APP_PORT=17080` that will start execution.
After execution statistic will be printed, 3 stages was used to ramp up Virtual User Count to 20.

After test is done stop the docker container with application for test. Check the container id and stop it.
```
 > docker ps
 CONTAINER ID        IMAGE                   COMMAND                  CREATED             STATUS              PORTS                     NAMES
 70fe4bf90a59        pheodor/dummy-web-app   "docker-entrypoint.s…"   3 minutes ago       Up 3 minutes        0.0.0.0:17080->7070/tcp   relaxed_antonelli
 > docker stop 70fe4bf90a59
 70fe4bf90a59
```
### Performance suite - Cloud
For Cloud performance test suite execution require to have a working Kubernetes cluster. It may be GKE hosted at Google Cloud or any other instance. Current version was tested using local version of Kubernetes cluster provided by Docker Desktop. Please refer sections below for details of configuration.

Assumption before apply k8s configurations:
* kubectl tool installed and pointed to correct Kubernetes cluster
* 'default' namespace exist and user has enough privileges to it
* Kubernetes cluster configured to work with Docker registry that holds the images
* Docker images for dummy server and load script are build and pushed to the desired Docker registry

Note: Section below will help to satisfy criteria above. Follow it before start processing steps

#### Steps:

1. Deploy dummy server
    ```
        > kubectl apply -f load_test/dummy_server/k8s/deployment_config.yml
        deployment.apps/web-app created
        
        > kubectl apply -f load_test/dummy_server/k8s/service_config.yml
        service/web-app-service exposed
    ```
2. Validate that server up and running
    ```
         > kubectl get deployments
        NAME            READY   UP-TO-DATE   AVAILABLE   AGE
        dummy-service   1/1     1            1           63m
        
         > kubectl get services
        NAME              TYPE        CLUSTER-IP       EXTERNAL-IP   PORT(S)    AGE
        dummy-service     ClusterIP   10.105.55.193    <none>        80/TCP     52m
    ```
3. Start the load script execution
    ```
         > kubectl apply -f load_test/load_script/k8s/deployment_config.yml
        job.batch/load-script created
    ```
4. Observe execution and wait for results
    ```
         > kubectl get pods
        NAME                             READY   STATUS    RESTARTS   AGE
        dummy-service-7487f57779-rrmbd   1/1     Running   0          51m
        load-script-zkntt                1/1     Running   0          77s
        
         > kubectl logs load-script-zkntt
                       /\      |‾‾|  /‾‾/  /‾/
                  /\  /  \     |  |_/  /  / /
                 /  \/    \    |      |  /  ‾‾\
                /          \   |  |‾\  \ | (_) |
               / __________ \  |__|  \__\ \___/ .io
             
               execution: local--------------------------------------------------]   servertor
                  output: -
                  script: load_script.js
             
                 duration: -, iterations: -
                      vus: 1, max: 20
             ........        
             
             init [----------------------------------------------------------] starting
             ✓ status was 200
             ✓ transaction time OK
         
             checks.....................: 100.00% ✓ 1208 ✗ 0
             data_received..............: 141 kB  1.0 kB/s
             data_sent..................: 52 kB   370 B/s
             http_req_blocked...........: avg=534.1µs  min=26.8µs  med=32.7µs  max=97.32ms  p(90)=124.82µs p(95)=420.33µs
             http_req_connecting........: avg=119.63µs min=0s      med=0s      max=48.67ms  p(90)=0s       p(95)=0s
             http_req_duration..........: avg=8.86ms   min=752.1µs med=1.94ms  max=150ms    p(90)=23.54ms  p(95)=42.25ms
             http_req_receiving.........: avg=557.59µs min=56.3µs  med=110.7µs max=51.34ms  p(90)=313.81µs p(95)=828.74µs
             http_req_sending...........: avg=286.97µs min=25.8µs  med=40.7µs  max=40.33ms  p(90)=153.61µs p(95)=405.66µs
             http_req_tls_handshaking...: avg=0s       min=0s      med=0s      max=0s       p(90)=0s       p(95)=0s
             http_req_waiting...........: avg=8.02ms   min=634.3µs med=1.6ms   max=149.81ms p(90)=17.5ms   p(95)=39.89ms
             http_reqs..................: 604     4.314272/s
             iteration_duration.........: avg=3.03s    min=3s      med=3s      max=3.42s    p(90)=3.09s    p(95)=3.16s
             iterations.................: 584     4.171416/s
             vus........................: 1       min=1  max=20
             vus_max....................: 20      min=20 max=20
    ```    
    
#### Local Kubernetes Preparation    
Prerequisites: Docker for Desktop up and ready and already installed locally at laptop

1. Enable Kubernetes, more information available here
[General info](https://collabnix.com/kubernetes-dashboard-on-docker-desktop-for-windows-2-0-0-3-in-2-minutes/) and
[How to setup K8S Dashabord](https://kubernetes.io/docs/tasks/access-application-cluster/web-ui-dashboard/)
    1. Example for service account
    ```
         > cat dashboard-admin.yml
        apiVersion: v1
        kind: ServiceAccount
        metadata:
          name: admin-user
          namespace: kube-system
          
         > kubectl apply -f dashboard-admin.yml  
    ```
    2. Useful command to get the secret `kubectl -n kube-system describe secret $(kubectl -n kube-system get secret | grep admin-user | awk '{print $1}')`
2. Ensure that `/etc/hosts` file has entry that similar to next
    ```
         > cat /etc/hosts
         ...
        # Added by Docker Desktop
        # To allow the same kube context to work on the host and the container:
        127.0.0.1 kubernetes.docker.internal
        # End of section
    ```
    This is important since Docker has issue to work with just `localhost`
3. Enable local Docker registry   
    ```
        # pull latest image
         > docker pull registry:2
        2: Pulling from library/registry
        486039affc0a: Pull complete
        ba51a3b098e6: Pull complete
        8bb4c43d6c8e: Pull complete
        6f5f453e5f2d: Pull complete
        42bc10b72f42: Pull complete
        Digest: sha256:7d081088e4bfd632a88e3f3bcd9e007ef44a796fddfe3261407a3f9f04abe1e7
        Status: Downloaded newer image for registry:2
        docker.io/library/registry:2
        
        # start registry
         > docker run --name private_registry -d --restart=always -p 5000:5000 registry:2
        
        b5e224db2c741a342064d5535ce75c370c95f422a80150727bfe3d5a56ea71fb
    ```
    1. This registry helps to push local images and share it with k8s cluster
    2. Update the docker configuration to allow insecure connections to the local registry like `vi ~/.docker/daemon.json`
    ```json
        {
          "experimental": true,
          "debug": true,
          "insecure-registries": [
            "kubernetes.docker.internal:5000"
          ]
        }
    ```
4. Build and push docker images for service and load script
    ```
         > docker build -t pheodor/dummy-web-app -t kubernetes.docker.internal:5000/pheodor/dummy-web-app load_test/dummy_server
         ...
         > docker build -t pheodor/load_script -t kubernetes.docker.internal:5000/pheodor/load_script load_test/load_script
         ...
         > docker push kubernetes.docker.internal:5000/pheodor/dummy-web-app
         ...
         > docker push kubernetes.docker.internal:5000/pheodor/load_script
    ```
    Simply check via `docker pull` that images present in registry and no unexpected errors