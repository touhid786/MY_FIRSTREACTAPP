const OtpService = require("../services/otp-service");
const HashService = require("../services/hash-service");
const UserService = require("../services/user-service");
const TokenService = require("../services/token-service");
const UserDto = require("../dtos/user-dto");
const tokenService = require("../services/token-service");
const userService = require("../services/user-service");
const { update } = require("../models/user-model");
const refreshModel = require("../models/refresh-model");
const { updateRefreshToken } = require("../services/token-service");

class AuthController {
  async sendOtp(req, res) {
    const { phone } = req.body;
    if (!phone) {
      return res.status(400).json({
        message: "Phone number is required",
      });
    }

    //GENERATION OTP CODE
    const otp = await OtpService.generateOtp();

    //GENERATING HASH
    const ttl = 1000 * 60 * 2; //2 minutes
    const expires = Date.now() + ttl;
    const data = `${phone}.${expires}.${otp}`;
    const hash = HashService.hashOtp(data);

    //SENDING OTP
    try {
      //await OtpService.sendBySms(phone, otp);
      return res.json({
        message: "OTP sent successfully",
        hash: `${hash}.${expires}`,
        phone,
        otp,
      });
    } catch (e) {
      console.log(e);
      res.status(500).json({
        message: "message sending falied",
      });
    }
  }

  async verifyOtp(req, res) {
    const { otp, hash, phone } = req.body;
    console.log(req.body);
    if (!otp || !hash || !phone) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }
    const [hashOtp, expires] = hash.split(".");
    if (Date.now() > +expires) {
      res.status(400).json({ message: "OTP expired" });
    }

    const data = `${phone}.${expires}.${otp}`;
    const isValid = OtpService.verifyOtp(hashOtp, data);

    if (!isValid) {
      return res.status(400).json({ message: "OTP is invalid" });
    }

    let user;
    try {
      user = await UserService.findUser({ phone });
      if (!user) {
        user = await UserService.createUser({ phone });
      }
    } catch (err) {
      console.log(err);
      return res.status(500).json({ message: "Db error" });
    }

    // TOKEN GENERATION
    const { accessToken, refreshToken } = TokenService.generateTokens({
      _id: user._id,
      activated: false,
    });

    await tokenService.storeRefreshToken(refreshToken, user._id);

    res.cookie("refreshToken", refreshToken, {
      maxAge: 1000 * 60 * 60 * 24 * 30,
      httpOnly: true,
    });

    res.cookie("accessToken", accessToken, {
      maxAge: 1000 * 60 * 60 * 24 * 30,
      httpOnly: true,
    });

    const userDto = new UserDto(user);
    return res.json({ user: userDto, auth: true });
  }

  //get refresh token from cookie
  async refreshToken(req, res) {
    const { refreshToken: refreshTokenFromCookie } = req.cookies;
    //console.log("This is the refresh Token " + refreshTokenFromCookie);

    //check if token is valid or not
    let userData;
    try {
      userData = await tokenService.verifyRefreshToken(refreshTokenFromCookie);
      //console.log("This is the userData of refreshToken " + userData);
    } catch (e) {
      return res.status(401).json({ message: "Invalid refresh token" });
    }

    //check if token is in database or not
    //Here i have to pass userData._id and refreshToke which is refreshTokenFromCookie

    //console.log("This is the _id :"+userData._id);

    try {
      const token = await tokenService.findRefreshToken(
        userData._id,
        refreshTokenFromCookie
      );
      // console.log(
      //   "This is the data of user which we finding on database:" + token
      // );

      if (!token) {
        return res.status(401).json({ message: "Token not found" });
      }
    } catch (e) {
      return res.status(500).json({ message: "Internal Error" });
    }

    //check if the user is valid or not
    const user = await userService.findUser({ _id: userData._id });
    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    //generate new tokens
    const { refreshToken, accessToken } = tokenService.generateTokens({
      _id: userData._id,
    });
    // console.log("This is the new refreshToken " + refreshToken);
    // console.log("This is the new accessToken " + refreshToken);

    // update the new tokens in database
    try {
      await tokenService.updateRefreshToken(userData._id, refreshToken);
    } catch (e) {
      return res.status(500).json({ message: "Internal Error" });
    }

    res.cookie("refreshToken", refreshToken, {
      maxAge: 1000 * 60 * 60 * 24 * 30,
      httpOnly: true,
    });

    res.cookie("accessToken", accessToken, {
      maxAge: 1000 * 60 * 60 * 24 * 30,
      httpOnly: true,
    });

    //response
    const userDto = new UserDto(user);
    return res.json({ user: userDto, auth: true });
  }
}

module.exports = new AuthController();
