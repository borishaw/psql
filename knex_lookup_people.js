const settings = require('./settings');

const pg = require('knex')({
  client: 'pg',
  connection: settings,
  searchPath: 'knex, public'
});

const person = process.argv[2];

pg.select().from('famous_people').where({
  last_name: person
}).orWhere({
  first_name: person
}).asCallback(function (err, result){
  if (err) {
    return console.log(err);
  }
  console.log(result);
  pg.destroy();
});

