'use strict' 

module.exports = {
    //server domain name
    domain: 'local.datanode.com',

    theme: 'default',

    session: {
        // http session cookie name:
        cookie: 'isession',
        // used to generate secure session cookie, can be set to any random string:
        salt: 'datanode.js',
        // signin expires in N seconds:
        expires: 7 * 24 * 3600,
        // node is behind a https reverse proxy?
        https: false
    },

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