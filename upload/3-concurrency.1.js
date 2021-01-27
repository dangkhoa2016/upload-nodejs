const helper = require('../helper');
const async_pool = require('../async_pool');
const TOKEN = process.env.TOKEN;
const ENDPOINT = process.env.ENDPOINT;
const max_allow = 5;

class Concurrency1 {
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
    await async_pool(max_allow, arr, async (item) => {
      return await helper.upload(item);
    });
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

  await new Concurrency1(number_process).start();
}
