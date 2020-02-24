// pingconfig.js
// where this node app starts

// init project
const newman = require("newman");

var collections = process.env.COLLECTIONS.split(",");
console.log(collections);


var i=0;
for (let i=0; i < collections.length; i++) {
// do {
  console.log("Loop Count: ", i);

    // call newman.run to pass `options` object and wait for callback
    newman.run(
      {
        collection: collections[i],
        environment: './postman_vars.json',
        ignoreRedirects: true,
        insecure: true,
        reporters: 'cli'
      },
    ).on('start', function (err, args) { // on start of run, log to console
      console.log('Running Collection: ', collections[i]);
    }).on('done', function (err, summary) {
      if (err || summary.error) {
          console.error('Collection encountered an error.');
      }
      else {
          console.log('Collection run completed.');
          i++;
      }
    });
}
// while (i < collections.length);