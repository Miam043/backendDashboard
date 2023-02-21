const settings = {
    appSettings: {
        host: process.env.APP_HOST,
        port: process.env.APP_PORT
    },
    dbSettings: {
        host: process.env.DB_HOST
    }
}

module.exports = settings