// Include external modules
const { query } = require("express")
const db = require("./db.service")

// Function to register a user in table user
async function registerUser(name, email, address, sex, link) {
    const query = `INSERT INTO user (name, email, address, sex, referral_link)
    values (?, ?, ?, ?, ?);`
    const rows = await db.query(query, [name, email, address, sex, link])
    return rows
}

// Function to save referral data of a user in table referral
async function saveReferralData(userID, total) {
    const query = `INSERT INTO referral (user, referred_quantity, total)
    values (?, 0, ?);`
    const rows = await db.query(query, [userID, total])
    return rows
}

// Function to update referral data of a user in table referral
async function updateReferralData(userID) {
    const query = `
            UPDATE referral
            SET referred_quantity = referred_quantity + 1, total=total+5000 
            WHERE user = ?;`
    const rows = await db.query(query, [userID])
    return rows
}

// Function to check if a user exists in table users by the email
async function checkEmail(email) {
    const query = `SELECT COUNT(*) AS exist FROM user WHERE email = ?;`;
    const rows = await db.query(query, [email]);
    return rows[0].exist
}

// Function to get the information of table referral with de full name of the user
async function getSummaryTable() {
    const sqlGetTablaResumen = `
            SELECT ref.*, usr.name
            FROM referral AS ref
            INNER JOIN user AS usr ON ref.user = usr.id
            WHERE ref.referred_quantity > 0
            ORDER BY ref.total DESC, ref.referred_quantity DESC`;
    const rows = await db.query(sqlGetTablaResumen)
    return rows
}

// Function to get the user ID by referral_link
async function getIDByLink(link) {
    const sqlGetUserIDByLink = `
            SELECT id
            FROM user
            WHERE referral_link = ?`;
    const rows = await db.query(sqlGetUserIDByLink, [link]);
    return rows[0].id
}

// Function to check if a referral linl exists in table users
async function checkLink(link) {
    const sqlGetUserIDByLink = `
            SELECT count(id) AS exist
            FROM user
            WHERE referral_link = ?`;
    const rows = await db.query(sqlGetUserIDByLink, [link]);
    return rows[0].exist
}



// Function to get the referral link of a user by the email
async function getReferralLink(email) {
    const sqlGetReferralLink = `select referral_link FROM user where email = ?`;
    const rows = await db.query(sqlGetReferralLink, [email]);
    return rows[0].referral_link
}

// Export module with db connection function
module.exports = {
    registerUser,
    checkEmail,
    getSummaryTable,
    getReferralLink,
    getIDByLink,
    saveReferralData,
    updateReferralData,
    checkLink
}