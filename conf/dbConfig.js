const config = {
    port: 3000,
    database: {
        DATABASE: 'xxxx',
        USERNAME: 'xxx',
        PASSWORD: 'xxx',
        HOST: 'xxx.xx.xx.xx',
        PORT: '3306',
        insecureAuth: true,
        useConnectionPooling: true,
        multipleStatements: true    //多条sql
    }
}

module.exports = config
