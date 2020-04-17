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
  const response = http.get('http://127.0.0.1:17080/');
  check(response, {
      'status was 200': r => r.status == 200,
      'transaction time OK': r => r.timings.duration < 200,
    });
  sleep(3);
}