// Get environment variables to create db connection
const env = process.env;
const config = {
    db : {
        host: env.DB_HOST || "db",
        user: env.DB_USER || "root",
        password: env.DB_PASSWORD,
        database: env.DB_NAME || "currency_bird",
        port: env.DB_PORT || 3306,
    }
}

// Export module with db configuration
module.exports = config;