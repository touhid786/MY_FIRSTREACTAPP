const crypto = require("crypto");
const hashService = require("./hash-service");
const smssid = process.env.SMS_SID;
const smsAuthToken = process.env.SMS_AUTH_TOKEN;
const smsFromNumber = process.env.SMS_FROM_NUMBER;

const twilo = require("twilio")(smssid, smsAuthToken, {
  lazyLoading: true,
});

class OtpService {
  async generateOtp() {
    const otp = crypto.randomInt(1000, 9999);
    return otp;
  }
  async sendBySms(phone, otp) {
    return await twilo.messages.create({
      to: phone,
      from: smsFromNumber,
      body: `Your OTP is ${otp}`,
    });
  }

  verifyOtp(hashedOtp, data) {
    let computedhash = hashService.hashOtp(data);
    return computedhash === hashedOtp;
    
  }
}

module.exports = new OtpService();
