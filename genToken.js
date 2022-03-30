function generateAccessToken(username) {
    require("dotenv").config();
    const jwt = require("jsonwebtoken");

    const token = jwt.sign(
        {
            data: username,
        },
        process.env.SESSION_SECRET,
        { expiresIn: '1h' }
    );

    return token;
}

module.exports = {
    generateAccessToken,
};
