'use strict' 

const 
    logger = require('../logger'),
    db = require('../db'),
    User = db.User;

async function getUser(username) {
    return await User.findAll({
        where: {
            username: username
        }
    });
}
var user;
db.sync().then(() => {
    logger.info("create table ok...");
    return User.create({username:'foo',password:'12345'});
}).then(() => {
    logger.info('begin query user...');
    return user = getUser('foo');
}).then(() => {
    logger.info(user);
});

 



