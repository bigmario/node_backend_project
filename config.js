const process = require('process');

module.exports = {
    api: {
        host: process.env.HOST || 'localhost',
        port: process.env.API_PORT || 3000,
    },
    post: {
        host: process.env.POST_HOST || 'localhost',
        port: process.env.POST_PORT || 3002,
    },
    jwt: {
        secret: process.env.JWT_SECRET || 'notASecret',
    },
    mysql: {
        host: process.env.MYSQL_HOST || 'localhost',
        user: process.env.MYSQL_USER || 'admin',
        password: process.env.MYSQL_PASSWORD || 'admin',
        database: process.env.MYSQL_DATABASE || 'database',
        port: process.env.MYSQL_PORT || 3307,
    },
    mysqlService: {
        host: process.env.MYSQL_SRV_HOST || 'localhost',
        user: process.env.MYSQL_SRV_USER || 'admin',
        password: process.env.MYSQL_SRV_PASSWORD || 'admin',
        database: process.env.MYSQL_SRV_DATABASE || 'database',
        port: process.env.MYSQL_SRV_PORT || 3308,
    }
}