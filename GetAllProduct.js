import {check} from 'k6';
import http from 'k6/http';
import { expect } from 'https://jslib.k6.io/k6chaijs/4.3.4.1/index.js';
import { htmlReport } from 'https://raw.githubusercontent.com/alamsz/k6-reporter/main/dist/bundle.js'


export const options = {
    vus: 10,
    duration: '30s'
};

export default function() {
    let res = http.get('https://dummyjson.com/products');
    check(res,{
        'status should be 200': (r) => r.status === 200
    });
    expect(res.status, 'status').to.equal(200);
} ;

export function handleSummary(data) {
    console.log('Preparing the end-of-test summary...')
    return {
      'report-GetAllProduct.html': htmlReport(data, { title: 'SIGID - REPORT PERFORMANCE GET ALL PRODUCTS' }),
    }
  }

