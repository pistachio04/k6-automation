import {check} from 'k6';
import http from 'k6/http';
import { expect } from 'https://jslib.k6.io/k6chaijs/4.3.4.1/index.js';

export const options = {
    vus: 10,
    duration: '5s'
};

export default function() {
    let res = http.get('https://test.k6.io/');
    check(res,{
        'status should be 200': (r) => r.status === 200
    });
    expect(res.status, 'status').to.equal(200);
} ;

