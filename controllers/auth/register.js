const { UserDetails } = require("../../models/userModel");
const bcrypt = require("bcryptjs");

const register = async (req, res) => {
    try {
        let { email, password } = req.body;
        // first to check the email in database
        let user = await UserDetails.findOne({ email: email });
        if (!user) {
            // salt generation
            let salt = await bcrypt.genSalt(10);
            let hash = await bcrypt.hash(password, salt);
            req.body.password = hash;
            await UserDetails.create(req.body);
            res.json({
                statusCode: 201,
                message: " user Register Successfully",
            });
        } else {
            res.json({
                statusCode: 401,
                message: "Email address is already exists",
            });
        }
    } catch (error) {
        console.log(error);
        res.json({
            statusCode: 500,
            message: "Internal Server Error",
            error
        })
    }
};

 module.exports = { register };







