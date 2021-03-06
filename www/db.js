/**
 * 初始化数据库，建立ORM
 * author pc ref. Liao 2017/9/22
 */
'use strict'

const 
    fs = require('fs'),
    _ = require('lodash'),
    util = require('util'),
    logger = require('./logger'),
    config = require('./config'),
    utils = require('./utils'),
    dbtypes = require('./dbtypes'),
    Sequelize = require('sequelize'),
    uuid = require('uuid/v4');

logger.info('init sequelize...');

const 
    ID_LENGTH = 50,
    SHOW_SQL = config.db.showsql || false,
    paddings = (() => {
        let _paddings = [];
        for(let i = 0; i < 30; i++) {
            _paddings.push(new Array(i).join('0'));
        }
        return _paddings;
    })();

/**
 * a id generate function that generate 50-chars id string with:
 * current timestamps;
 * random uuid;
 * 
 * 
 * @returns id
 */
function nextId() {
    let id = util.format('%d%s000', Date.now(), uuid().replace(/\-/g, ''));
    return paddings[ID_LENGTH - id.length] + id;
}

    
const sequelize = new Sequelize(
    config.db.database,
    config.db.username,
    config.db.password,
    {
        dialect: 'mysql',
        host: config.db.host,
        // storage: config.db.storage,
        dialectOptions: {
            charset: 'utf8'
        },
        pool: {
            maxConnections: config.db.maxConnections,
            minConnections: config.db.minConnections,
            maxIdleTime: config.db.maxIdleTime
        },
        logging: function(t) {
                if (SHOW_SQL) {
                    logger.info('SQL: ' + t);
                }
        }
    }
);

/**
 * 封装sequelize的ORM模型定义。
 * 
 * @param {any} modelName 模型名称
 * @param {any} tableName 数据库表名称
 * @param {any} attributes 模型属性
 * @param {any} extraFields 扩展字段
 * @returns sequelize定义的模型，可用此模型进行ORM操作
 */
function defineModel(modelName, tableName, attributes, extraFields) {
    let attrs = {
        id: {
            type: dbtypes.ID,
            allowNull: false,
            primaryKey: true
        }
    };
    for (let key in attributes) {
        if (attributes.hasOwnProperty(key)) {
            let opt = attributes[key];
            // opt.allowNull = opt.allowNull === undefined ? true : opt.allowNull && true;
            opt.allowNull = opt.allowNull || false; //the allowNull of field default false
            attrs[key] = opt;
        }
    }

    let options = {
        tableName: tableName,
        charset: 'utf8',
        timestamps: false
        
    };
    if (Array.isArray(extraFields)) {  //the extraFields must be a array
        let getters = {},
            setters = {};
        for (let extraField of extraFields) {
            getters[extraField] = function () {
                return this['_' + extraField];
            };
            setters[extraField] = function (value) {
                this['_' + extraField] = value
            };
        }
        options.getterMethods = getters;
        options.setterMethods = setters;
    }

    let model = sequelize.define(tableName, attrs, options);
    return model;
}

let
    files = utils.getAllFiles(__dirname + '/models'),
    re = new RegExp('^[A-Za-z][A-Za-z0-9/\\_]*\\.js$');  //match the .js file(model file)

let exp = {
    ID_LENGTH: ID_LENGTH,
    sequelize: sequelize,
    nextId: nextId,
    sync: async (showsql = false) => {
        if (process.env.NODE_ENV !== 'production') {
            await sequelize.sync({  //sync all defined model to db
                force: true,
                logging : (t) => {
                    if(showsql) {
                        logger.info(t);
                    }
                }
            });
        } else {
            throw new Error('cannot call sync() when NODE_ENV is set to \'production\'.');
        }
    }
}


//add each model to exports
files.filter((f) => {
    return re.test(f);
}).map((f) => {
    return f.substring(0, f.length - 3);
}).forEach((modelName) => {
    let modelDefination = require('./models/' + modelName);
    exp[modelDefination.name] = defineModel(modelDefination.name, modelDefination.table, modelDefination.fields, modelDefination.extraFields);
});

logger.info('db exports: ' + Object.getOwnPropertyNames(exp).join(','));

module.exports = exp;



