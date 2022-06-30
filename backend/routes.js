const router = require("express").Router();
const AuthController=require('./controllers/auth-controller')
const ActivateController=require("./controllers/activate-controller");
const AuthMiddleware=require("./middlewares/auth-middleware");
const { AuthCallsCredentialListMappingContext } = require("twilio/lib/rest/api/v2010/account/sip/domain/authTypes/authCallsMapping/authCallsCredentialListMapping");




router.post("/api/send-otp",AuthController.sendOtp);
router.post("/api/verify-otp",AuthController.verifyOtp);
router.post("/api/activate",AuthMiddleware,ActivateController.activate);
router.get("/api/refresh",AuthController.refreshToken);

module.exports = router;
