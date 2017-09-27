
var logger = require('../logger');

var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database(':memory:');

db.serialize(function() {
    db.run("create table lorem (info TEXT)");
    var stmt = db.prepare("insert into lorem values (?)");
    for(var i = 0; i < 10; i++) {
        stmt.run("Ipsum" + i);
    }
    stmt.finalize();

    db.each("select rowid as id, info from lorem", function(err, row) {
        logger.log('info', row.id + ': ' + row.info);
    });
});

db.close(); 