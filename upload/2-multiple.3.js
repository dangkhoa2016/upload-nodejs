const helper = require('../helper');
const TOKEN = process.env.TOKEN;
const ENDPOINT = process.env.ENDPOINT;
const max_allow = 5;

class Multiple3 {
  constructor(number_process) {
    this.number_process = number_process
  }

  async start() {
    var arr = [];
    for (var i = 0; i < this.number_process; i++) {
      arr.push(i + 1);
    }

    var length = arr.length;
    var number_batch = Math.ceil(length / max_allow);

    for (var n = 0; n < number_batch; n++) {
      var batch = [];
      var _from = n * max_allow;
      var _to = _from + max_allow;
      for (var i = _from; i < _to; i++) {
        if (i < length)
          batch.push(i + 1);
        else
          break;
      }
      await this.run_batch(batch);
    }
  }

  async run_batch(arr) {
    var promises = [];
    arr.map((item) => {
      promises.push(helper.upload(item));
    });

    await Promise.all(promises);
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

  await new Multiple3(number_process).start();
}
