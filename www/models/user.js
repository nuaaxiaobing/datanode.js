'use strict'

const dbtypes = require('../dbtypes');

module.exports = {
    name: 'User',
    table: 'user',
    fields: {
        username: {
            type: dbtypes.TEXT,
            allowNull: false
        },
        password: {
            type: dbtypes.TEXT,
            allowNull: false
        }
    }
};