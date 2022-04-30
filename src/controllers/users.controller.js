// Include external modules
const userService = require("../services/users.service")

// Controller to register an user
async function register(req, res, next) {
    let link = "xxx"//linkGenerator.getLink()
    try {
        const result = await userService.registerUser(req.body.name, req.body.email, req.body.address, req.body.sex, link)
        res.json({"code": 200, "message": "User created correctly", "result": result});
    } catch (err) {
        console.error(`Error while registering user`, err.message);
        res.json({"code": 500, "message": "Internal server error: Error while registering user"});
        next(err);
    }
}

// Export module with controllers related to users
module.exports = {
    register,
}