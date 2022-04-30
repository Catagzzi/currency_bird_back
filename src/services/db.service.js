// Include external modules
const mysql = require("mysql2/promise")
const config = require("../configs/db.config")

// Function to create connection with db
async function connect() {
    const connection = await mysql.createConnection(config.db);
    console.log("Connected to database")
    return connection
}

// Function to execute queries with parameters
async function query(sql, params) {
    const connection = await connect();
    const [result, ] = await connection.execute(sql, params);
    return result;
}

// Export module with db connection function
module.exports = {
    connect,
    query,
}