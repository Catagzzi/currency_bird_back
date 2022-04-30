// Include external modules
const db = require("./db.service")

// Function to register an user in table user
async function registerUser(name, email, address, sex, link) {
    query = `INSERT INTO user (name, email, address, sex, referral_link)
    values ('?', '?', '?', '?', '?');`
    const rows = await db.query(query, [name, email, address, sex, link])
    return rows
}

async function checkEmail(email) {
    query = `SELECT COUNT(*) AS exist FROM user WHERE email = '?';`
    const rows = await db.query(query, email)
    return rows
}

// Export module with db connection function
module.exports = {
    registerUser,
    checkEmail,
}