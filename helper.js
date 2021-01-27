const axios = require('axios');
const TOKEN = process.env.TOKEN;
const ENDPOINT = process.env.ENDPOINT;

function timeout(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function upload(index) {
  console.log(`[${new Date()}] Start post file ${index}`);
  try {
    const response = await axios.post(`${ENDPOINT}/api/upload`, {
      client: 'nodejs',
      name: `file ${index}`,
      file: 'content',
      size: index
    }, {
        headers: { token: TOKEN }
    });

    console.log(response.data);
  } catch (error) {
    console.error('Error get data: ' + error.response.data, error.response.headers);
  }
}

async function upload_with_retry(index) {
  console.log(`[${new Date()}] Start post file`);

  var start = async function() {
    var response = await axios.post(`${ENDPOINT}/api/upload`, {
      client: 'nodejs',
      name: `file ${index}`,
      file: 'content',
      size: index
    }, {
        headers: { token: TOKEN }
      });

    console.log(response.data);
  }

  var handle_error = async function(error, will_retry) {
    console.error('Error get data: ' + error.response.data, error.response.headers);
    if (will_retry) {
      //get number of second to wait
      var retry = error.response.headers && error.response.headers['retry-after'];

      if (retry) {
        var number_seconds = parseFloat(retry) + 1;
        console.log(`[${index}] Wait for limit time: ${number_seconds}`);

        await timeout(number_seconds * 1000);
        try {
          await start();
        } catch (error2) {
          await handle_error(error2, false);
        }
      }
    }
  }

  try {
    await start();
  } catch (error) {
    await handle_error(error, true);
  }
}

module.exports = {
  upload, upload_with_retry, timeout
};
