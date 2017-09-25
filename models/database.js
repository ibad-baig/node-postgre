const { Pool } = require('pg');
const dbConfig = require('../dbconfig');

const tables = [
    'CREATE TABLE IF NOT EXISTS items(id SERIAL PRIMARY KEY, text VARCHAR(40) not null, complete BOOLEAN)',
    'CREATE TABLE IF NOT EXISTS users(id SERIAL PRIMARY KEY, username VARCHAR(20) not null, email VARCHAR(50)',
    'ALTER TABLE users ADD COLUMN isEditable BOOLEAN SET DEFAULT FALSE'
];

let pool = new Pool(dbConfig);
tables.forEach((table, index) => {
    pool.query(table, (err, result) => {
        if (err) {
            console.log(err);
        } else {
            console.log(`table ${index + 1} has been created.`);
        }
    });
});
