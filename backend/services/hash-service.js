const crypto = require("crypto");



class HashService {
  hashOtp(otp) {
    return crypto.createHmac('sha256',"Touhid").update(otp).digest('hex');
  }
}

module.exports = new HashService();
