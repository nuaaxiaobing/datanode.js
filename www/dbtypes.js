'use strict'

const 
    Sequelize = require('sequelize'),
    TYPES = ['NULL', 'STRING', 'CHAR', 'DECIMAL', 'BIGINT', 'INTEGER', 'FLOAT',
     'DOUBLE', 'UUID', 'DATE', 'DATEONLY', 'BOOLEAN', 'TEXT'];

// use uuid for id
let exp = {
    ID: Sequelize.STRING(50)
};

// now only support sqlite3 type
for (let type of TYPES) {
    exp[type] = Sequelize[type];
}

module.exports = exp;