const helper = require('../helper');
const TOKEN = process.env.TOKEN;
const ENDPOINT = process.env.ENDPOINT;

class Single {
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
    for (let item of arr) {
      await helper.upload(item);
    }
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

  await new Single(number_process).start();
}
