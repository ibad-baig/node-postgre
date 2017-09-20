const config = {
    user: 'postgres', // name of the user account
    password: 'postgres',
    database: 'todo', // name of the database
    max: 10, // max number of clients in the pool
    idleTimeoutMillis: 30000 // how long a client is allowed to remain idle before being closed
}

module.exports = config;