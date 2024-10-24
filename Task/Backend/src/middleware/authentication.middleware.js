const jwt = require("jsonwebtoken");
const User = require("../models/user.model");
const isAuthenticated = async (req, res, next) => {
  try {
    const token = req.headers.authorization;

    if (!token) {
        return res.json({
            message:"please login for this feature",
            status: 'failure',
           code: 400,
            data:{}
         } );
    }

    const jwtToken = token.split(" ")[1];

    try {
      const tokenExpiry = jwt.verify(jwtToken, "asdgy");

      // If verification is successful, proceed
      const userDetails = await User.findOne({ id: tokenExpiry._id });
      req.user = userDetails;
      next();
    } catch (err) {
      // Handle different JWT verification errors
      if (err.name === 'TokenExpiredError') {
        return res.json({
            message:"Session Expired",
            status: 'failure',
           code: 401,
            data:{}
         } );
      } else {
        return res.json({
            message:"unauthorized",
            status: 'failure',
           code: 401,
            data:{}
         } );
      }
    }
  } catch (error) {
    // Handle other errors
    return res.json({
        message:"Internal server error",
        status: 'failure',
       code: 500,
        data:{}
     } );
  }
};


module.exports = isAuthenticated;