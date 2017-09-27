'use strict' 

module.exports = {
    //server domain name
    domain: 'local.datanode.com',

    theme: 'default',

    db: {
        //sqlite username
        username: 'datanode',
        //sqlite password
        password: 'datanode',
        //sqlite database name
        database: 'datanode',
        //log sql
        showsql: 'false',
        //pool settings
        storage: 'datanode.sqlite',
        maxConnections: 20,
        minConnections: 1,
        maxIdleTime: 60000  //60s
    }
}