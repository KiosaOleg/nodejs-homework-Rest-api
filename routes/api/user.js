const express = require("express");

const { auth, upload, validation, ctrlWrapper } = require("../../middlewares");
const { user: ctrl } = require("../../controlers");
const { verifyEmailSchema } = require("../../schemas/verifyEmailSchema");
const middlewareVerifyEmailSchema = validation(verifyEmailSchema);

const router = express.Router();

router.get("/current", auth, ctrlWrapper(ctrl.getCurrent));
router.patch(
  "/avatars",
  auth,
  upload.single("avatar"),
  ctrlWrapper(ctrl.updateAvatar)
);

router.get("/verify/:verificationToken", ctrlWrapper(ctrl.verifyEmail));
router.post(
  "/verify",
  middlewareVerifyEmailSchema,
  ctrlWrapper(ctrl.resendVerifyEmail)
);

module.exports = router;
