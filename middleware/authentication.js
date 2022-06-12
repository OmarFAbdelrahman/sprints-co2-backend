const jwt = require("jsonwebtoken");
const CustomError = require("../errors");


const requireAuth = (req, res, next) => {


    const token = req.cookies.jwt;
  const isTokenValid = ({ token }) => jwt.verify(token, process.env.JWT_SECRET || "CO2-eCommerce-Project", (err, decoded) => {
    console.log(decoded);
  });


    if (!token) {
      throw new CustomError.UnauthenticatedError('Authentication Invalid');
    }
  
    try {
      isTokenValid({ token });
      next();
    } catch (error) {
      throw new CustomError.UnauthenticatedError('Authentication Invalid');
    }
  };



module.exports = {requireAuth};