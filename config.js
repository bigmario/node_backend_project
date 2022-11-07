module.exports = {
    api: {
        host: process.env.HOST || 'localhost',
        port: process.env.API_PORT || 3000,
    },
    jwt: {
        secret: process.env.JWT_SECRET || 'notASecret',
    }
}