const { raw } = require("body-parser");
const Jimp = require("jimp");
const path = require("path");
const UserDto = require("../dtos/user-dto");
const userService = require("../services/user-service");

class ActivateController {
  async activate(req, res) {
    //Activation logic here
    const { name, avtar } = req.body;
    // console.log("Here I am getting name:"+name);
    // console.log("Here I am getting avtar:"+avtar);
    if (!name || !avtar) {
      return res.status(400).json({ message: "Name and avatar are required" });
    }

    //Image Base64 decoding
    const buffer = Buffer.from(
      avtar.replace(/^data:image\/\w+;base64,/, ""),
      "base64"
    );

    const imagePath = `${Date.now()}.${Math.round(Math.random() * 1e9)}.png`;

    try {
      const jimRes = await Jimp.read(buffer);
      jimRes
        .resize(150, Jimp.AUTO)
        .write(path.resolve(__dirname, `../storage/${imagePath}`));
    } catch (err) {
      return res.status(400).json({ message: "Invalid image" });
    }

    //update user details

    try {
      const userId = req.user._id;

      const user = await userService.findUser({ _id: userId });
      if (!user) {
        res.status(400).json({ message: "User not found" });
      }

      user.activated = true;
      user.name = name;
      user.avtar = `/storage/${imagePath}`;
      user.save();
      res.json({ user: new UserDto(user), auth: true });
      
    } catch (err) {
      res.status(400).json({ message: "Db error" });
    }
  }
}

module.exports = new ActivateController();
