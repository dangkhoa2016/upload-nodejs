// var test = require('../upload/1-single');

// var test = require('../upload/2-multiple.1');

//wait for retry time
// var test = require('../upload/2-multiple.2');

// divide to max allow request
// var test = require('../upload/2-multiple.3');

//no package
// var test = require('../upload/3-concurrency.1');

//using good package
var test = require('../upload/3-concurrency.2');



const number_process = 12;

(async () => {
  var start_time = new Date();
  console.log(`Start at: ${start_time}`);
  try {
    await test(number_process);
  } catch (e) {
    // Deal with the fact the chain failed
    console.log('error', e);
  }

  var end_time = new Date();
  console.log(`End at: ${end_time}`);

  // To calculate the time difference of two dates 
  var difference_in_time = end_time.getTime() - start_time.getTime();

  // To calculate the no. of days between two dates 
  var sec = difference_in_time / (1000);
  console.log(`Total: ${sec} second(s)`);

})();
