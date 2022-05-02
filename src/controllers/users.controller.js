// Include external modules
const userService = require("../services/users.service")
const uuid = require("../utils/link_generator.util")

// Controller to register an user
async function register(req, res, next) {
    let link = uuid.getLink()
    try {
        const userExist = await userService.checkEmail(req.body.email);
        if (userExist > 0) {
            res.json({"code": 409, "message": "Conflict: The user already exists in DB"});
        } else {
            if (req.body.referral_link != '') {
                try{
                    //TODO: implement transaction
                    // Insert refered user in table user
                    const resultRegister = await userService.registerUser(req.body.name, req.body.email, req.body.address, req.body.sex, link);
                    // Get the id of the referred user
                    const insertedID = resultRegister.insertId;
                    // Insert the referred user into table referral
                    const resultSaveReferral = await userService.saveReferralData(insertedID, 5000);
                    // Get the ID of the source user
                    const sourceUserID = await userService.getIDByLink(req.body.referral_link);
                    // Update referred quantity (+1) and total (+5000)
                    const resultUpdateReferral = await userService.updateReferralData(sourceUserID);
                    // Create the response
                    res.json({"code": 200, "message": "User created correctly", "result": {resultRegister, resultSaveReferral, resultUpdateReferral}});
                } catch (err) {
                    throw(err)
                }
            } else {
                try {
                    // Insert refered user in table user
                    const resultRegister = await userService.registerUser(req.body.name, req.body.email, req.body.address, req.body.sex, link);
                    // Get the id of the referred user
                    const insertedID = resultRegister.insertId;
                    // Insert the referred user into table referral
                    const resultSaveReferral = await userService.saveReferralData(insertedID, 0);
                    res.json({"code": 200, "message": "User created correctly", "result": {resultRegister, resultSaveReferral}});
                } catch (err) {
                    throw(err)
                }
            }
        }
    } catch (err) {
        console.log("REQUEST", req.body)
        console.error(`Error while registering user`, err.message);
        res.json({"code": 500, "message": "Internal server error: Error while registering user"});
        next(err);
    }
}

// Controller to obtain the summary table
async function getTable(req, res, next) {
    try {
        const result = await userService.getSummaryTable();
        res.json({"code": 200, "message": "Success getting result", "result": result});
    } catch  (err) {
        console.error(`Error getting the summary table`, err.message);
        res.send({"code": 500, "message": "Internal server error: Error getting the summary table"});

    }
}

// Controller to obtain the referral link of an user
async function getReferralLink(req, res, next) {
    try {
        console.log("REQUEST", req.body)
        const userExist = await userService.checkEmail(req.body.email);
        if (userExist > 0) {
            const result = await userService.getReferralLink(req.body.email);
            res.json({"code": 200, "message": "Success getting the referral link", "result": result});
        } else {
            res.json({"code": 404, "message": "Error: User not found"});
        }
    } catch  (err) {
        console.log("REQUEST", req.body)
        console.error(`Error getting the referral link`, err.message);
        res.send({"code": 500, "message": "Internal server error: Error getting the referral link"});
    }
}

// Export module with controllers related to users
module.exports = {
    register,
    getTable,
    getReferralLink,
}