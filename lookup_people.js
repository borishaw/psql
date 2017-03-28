const pool = require('./lib/db');
const person = process.argv[2];

pool.connect(function(err, client, done) {
  if(err) {
    return console.error('error fetching client from pool', err);
  }

  client.query("SELECT * FROM famous_people WHERE first_name = $1 OR last_name = $1", [person], function(err, result) {
    // done(err);
    // if(err) {
    //   return console.error('error running query', err);
    // }

    done();
    console.log("Searching...");
    console.log(`Found ${result.rows.length} person(s) by the name ${person}`);
    for (let i in result.rows){
      console.log(`- ${parseInt(i) + 1}: ${result.rows[i].first_name} ${result.rows[i].last_name} born ${result.rows[i].birthdate}`);
    }
    client.end();
  });
});

