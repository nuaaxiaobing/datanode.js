'user strict'

const 
    logger = require('../logger'),
    db = require('../db'),
    User = db.User;

async function _getUsers() {
    return await User.findAll({
    });
}

async function _getUser(username) {
    let 
        users = await _getUsers(),
        filtered = users.filter((user) => {
            return user.username === username;
        });
    if(filtered.length === 0) {
        throw new Error(`${username} not found`);
    }
    return filtered[0];
}

module.exports = {
    'GET /api/user/:name' : async function(ctx, next) {
        ctx.rest(await _getUser(ctx.params.name));
    }
}