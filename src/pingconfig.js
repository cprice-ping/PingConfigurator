// pingconfig.js
// where this node app starts

// init project
const newman = require("newman");
const async = require("async");

var collections = process.env.COLLECTIONS.split(",");
console.log(collections);

async.eachSeries(collections, function (collection, next){

    // call newman.run to pass `options` object and wait for callback
    newman.run(
      {
        collection: collection,
        environment: './postman_vars.json',
        ignoreRedirects: true,
        insecure: true,
        reporters: 'cli'
      },
    ).on('start', function (err, args) { // on start of run, log to console
      console.log('Running Collection: ', collection);
    }).on('done', function (err, summary) {
      if (err || summary.error) {
          console.error('Collection encountered an error.');
      }
      else {
          console.log('Collection run completed.');
          next(err, summary);
      }
    });
})