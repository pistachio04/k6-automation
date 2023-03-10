import http from 'k6/http';
import { expect } from 'https://jslib.k6.io/k6chaijs/4.3.4.1/index.js';
import { randomString, randomItem, randomBetween } from 'https://jslib.k6.io/k6-utils/1.2.0/index.js'
import { htmlReport } from 'https://raw.githubusercontent.com/alamsz/k6-reporter/main/dist/bundle.js'

export const options = {
    vue: 5,
    duration: '3s'
};

export default function () {
    const url = 'https://reqres.in/api/users';

    const data = {
        name: `belajarr${randomString(5)}`,
        job: 'qaqa'
    }

    const payload = JSON.stringify(data);

    const params = {
        headers:{
            'Content-Type': 'application/json'
        },
    };

    const res = http.post(url, payload, params);
    expect(res.status, 'STATUS').to.equal(201);
    expect(res.json().name, 'Name').to.equal(data.name);
    expect(res.json().job, 'Job').to.equal(data.job);
    console.log(res.body);
}
export function handleSummary(data) {
    console.log('Preparing the end-of-test summary...')
    return {
      'report-demo.html': htmlReport(data, { title: 'Demo Performance Automation' }),
    }
  }