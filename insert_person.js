const settings = require('./settings');

const pg = require('knex')({
  client: 'pg',
  connection: settings,
  searchPath: 'knex, public'
});

const first_name = process.argv[2];
const last_name = process.argv[3];
const birthdate = process.argv[4];

pg('famous_people')
  .insert({first_name: first_name, last_name: last_name, birthdate: birthdate})
  .asCallback(function (err, result) {
    if (err) {
      console.log(err);
    } else {
      console.log("Success");
      pg.destroy();
    }
  });