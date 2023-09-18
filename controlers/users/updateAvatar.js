const path = require("path");
const fs = require("fs/promises");
const { User } = require("../../models");
// const { v4: uuidv4 } = require("uuid");
const Jimp = require("jimp");

const avatarDir = path.join(__dirname, "../../", "public", "avatars");

// const updateAvatar = async (req, res) => {
//   const { path: tempUpload, originalname } = req.file;
//   const { _id: id } = req.user;
//   const imageName = `${id}_${originalname}+${uuidv4()}`;
//   try {
//     const resultUpload = path.join(avatarDir, imageName);
//     await fs.rename(tempUpload, resultUpload);

//     const avatarURL = path.join("public", "avatars", imageName);
//     await User.findOneAndUpdate(req.user._id, { avatarURL });
//     res.json({ avatarURL });
//   } catch (error) {
//     await fs.unlink(tempUpload);
//     throw error;
//   }
// };
const updateAvatar = async (req, res) => {
  const { _id } = req.user;
  const { path: tempPath, originalname } = req.file;
  try {
    const image = await Jimp.read(tempPath);
    image.resize(250, 250).write(tempPath);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Server error. Were not able to resize image" });
  }
  const filename = `${_id}_${originalname}`;
  const resultDist = path.join(avatarDir, filename);
  await fs.rename(tempPath, resultDist);
  const avatarURL = path.join("avatars", filename);
  await User.findByIdAndUpdate(_id, { avatarURL });
  res.status(200).json({
    avatarURL,
  });
};

module.exports = updateAvatar;
