import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
  stages: [
      { duration: '30s', target: 20 },
      { duration: '1m30s', target: 10 },
      { duration: '20s', target: 0 },
    ]
};

export default function() {
  const host = __ENV.APP_HOST
  const port = __ENV.APP_PORT
  const response = http.get('http://' + host + ':'+ port + '/');
  check(response, {
      'status was 200': r => r.status == 200,
      'transaction time OK': r => r.timings.duration < 200,
    });
  sleep(3);
}