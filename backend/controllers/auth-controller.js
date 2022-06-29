const OtpService = require("../services/otp-service");
const HashService = require("../services/hash-service");
const UserService = require("../services/user-service");
const TokenService = require("../services/token-service");
const UserDto = require("../dtos/user-dto");
const tokenService = require("../services/token-service");

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
        otp
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
    const { accessToken, refreshToken } = TokenService.generateTokens({_id:user._id,activated:false});
    
     
    await tokenService.storeRefreshToken(refreshToken, user._id);
    
    
    
    res.cookie("refreshToken", refreshToken,{
      maxAge: 1000 * 60 * 60 * 24 * 30,
      httpOnly : true,
    });

    res.cookie("accessToken", accessToken,{
      maxAge: 1000 * 60 * 60 * 24 * 30,
      httpOnly : true,
    });




    const userDto=new UserDto(user);
    return res.json({user:userDto,auth:true});


  }
}

module.exports = new AuthController();
