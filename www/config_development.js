'use strict' 

module.exports = {
    //server domain name
    domain: 'local.datanode.com',

    theme: 'default',

    db: {
        host: '10.0.40.51',
        port: '3306',
        //sqlite username
        username: 'datanode',
        //sqlite password
        password: '123456',
        //sqlite database name
        database: 'datanode',
        //log sql
        showsql: 'true',
        //pool settings
        // storage: 'datanode.sqlite',
        maxConnections: 20,
        minConnections: 1,
        maxIdleTime: 60000  //60s
    }
}