import http from 'k6/http';
import { expect } from 'https://jslib.k6.io/k6chaijs/4.3.4.1/index.js';
import { randomString, randomItem, randomBetween } from 'https://jslib.k6.io/k6-utils/1.2.0/index.js'
import { htmlReport } from 'https://raw.githubusercontent.com/alamsz/k6-reporter/main/dist/bundle.js'

export const options = {
    vue: 5,
    duration: '3s'
};

export default function () {
    const url = 'https://dummyjson.com/products/add';
    let seri  = Math.floor(Math.random() * 101)

    const data = {
        "title": `iPhone ${seri}`,
        "price": Math.floor(Math.random() * 501)
      }

    const payload = JSON.stringify(data);

    const params = {
        headers:{
            'Content-Type': 'application/json'
        },
    };

    const res = http.post(url, payload, params);
    expect(res.status, 'STATUS').to.equal(200);
    expect(res.json().title, 'Title').to.equal(data.title);
    expect(res.json().price, 'Price').to.equal(data.price);
    console.log(res.body);
}
export function handleSummary(data) {
    console.log('Preparing the end-of-test summary...')
    return {
      'report-AddProduct.html': htmlReport(data, { title: 'Report Performance Add Product' }),
    }
  }