const mysql = require('mysql2');
const config = require('../config');

const dbConf = {
    host: config.mysqlService.host,
    user: config.mysqlService.user,
    password: config.mysqlService.password,
    database: config.mysqlService.database,
    port: config.mysqlService.port,
};

//connect

let connection;

function handleConn() {
    connection = mysql.createConnection(dbConf);
    connection.connect((error) => {
        if (error) {
            console.error('[dbError]: ', error);
            setTimeout(handleConn, 2000);            
        } else {
            console.log('DB Connected !!');
        }
    })
    connection.on('error', error => {
        console.error('[dbError]: ', error);
        if (error.code === 'PROTOCOL_CONNECTION_LOST') {
            handleConn();
        } else {
            throw error;
        }
    })
}

handleConn();

async function list(table) {
    return new Promise((resolve, reject) => {
        connection.query(`SELECT * FROM ${table}`, (err, data) => {
            if (err) return reject(err);
            resolve(data);
        })
    })
}

async function get(table, id) {
    return new Promise((resolve, reject) => {
        connection.query(`SELECT * FROM ${table} WHERE id='${id}'`, (err, data) => {
            if (err) return reject(err);
            resolve(data);
        })
    })
}

async function insert(table, data) {
    return new Promise((resolve, reject) => {
        connection.query(`INSERT INTO ${table} SET ?`, data,  (err, result) => {
            if (err) return reject(err);
            resolve(result);
        })

    })
}

async function update(table, data) {
    return new Promise((resolve, reject) => {
        connection.query(`UPDATE ${table} SET ? WHERE id=?`, [data, data.id],  (err, result) => {
            if (err) return reject(err);
            resolve(result);
        })

    })
}

function query(table, q, join) {
    let joinQuery = '';
    if (join) {
        const key = Object.keys(join)[0];
        const val = join[key];
        joinQuery = `JOIN ${key} ON ${table}.${val} = ${key}.id`;
    }
    return new Promise((resolve, reject) => {
        connection.query(`SELECT * FROM ${table} ${joinQuery} WHERE ${table}.?`, q,  (err, result) => {
            if (err) return reject(err);
            resolve(result[0] || null );
        })
    });
}

module.exports = { list, get, insert, update, query };