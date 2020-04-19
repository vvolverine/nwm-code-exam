FROM loadimpact/k6

COPY *.js .

ENV APP_HOST web-app-service
ENV APP_PORT 8080

CMD [ "run", "load_script.js" ]