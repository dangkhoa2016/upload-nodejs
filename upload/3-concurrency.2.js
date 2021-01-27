const helper = require('../helper');
const TOKEN = process.env.TOKEN;
const ENDPOINT = process.env.ENDPOINT;
var Promise = require("bluebird");
const max_allow = 5;

class Concurrency2 {
  constructor(number_process) {
    this.number_process = number_process
  }

  async start() {
    var arr = [];
    for (var i = 0; i < this.number_process; i++) {
      arr.push(i + 1);
    }

    await this.run_batch(arr);
  }

  async run_batch(arr) {

    /* no order
    await Promise.map(arr, (item) => {
      return helper.upload(item);
    }, { concurrency: max_allow });
    */

    await Promise.map(arr, () => {
      const item = arr.shift();
      return helper.upload(item);
    }, { concurrency: max_allow });

  }
}

module.exports = async function(number_process) {

  if (!ENDPOINT) {
    console.log('No api endpoint to upload.');
    return null;
  }

  if (!TOKEN) {
    console.log('No token to upload.');
    return null;
  }

  if (!number_process || number_process < 1)
    number_process = 1;

  await new Concurrency2(number_process).start();
}
