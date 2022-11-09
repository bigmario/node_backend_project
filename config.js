const process = require('process');

module.exports = {
    api: {
        host: process.env.HOST || 'localhost',
        port: process.env.API_PORT || 3000,
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
    }
}