const tokenService = require("../services/token-service");


const AuthMiddleware = async (req, res, next) => {
  try {
    const { accessToken } = req.cookies;
    console.log(accessToken);
    if (!accessToken) {
      throw new Error();
    }
    const userData = await tokenService.verifyAcessToken(accessToken);
  
    if(!userData){
        throw new Error();
    }

    req.user = userData;
    console.log(userData);
    next();

  
  } catch (err) {
    res.status(401).json({ message: "Invalid token" });
  }
};

module.exports = AuthMiddleware;
``;
