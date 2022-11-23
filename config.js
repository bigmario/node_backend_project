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
    mysqlService: {
        servicePort: process.env.MYSQL_SRV_PORT || 3001,
        host: process.env.MYSQL_HOST || 'localhost',
        user: process.env.MYSQL_USER || 'admin',
        password: process.env.MYSQL_PASSWORD || 'admin',
        database: process.env.MYSQL_DATABASE || 'database',
        port: process.env.MYSQL_PORT || 3307,
    },
    cacheService: {
        servicePort: process.env.REDIS_SERVICE_PORT || 3003,
        host: process.env.REDIS_HOST || 'localhost',
        user: process.env.REDIS_USER || '',
        port: process.env.REDIS_PORT || 6380,
        password: process.env.REDIS_PASSWORD || '',
    }
}