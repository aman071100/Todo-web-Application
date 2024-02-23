const express = require("express");
const { createUser, loginUser, forgotPassword, resetPassword } = require("../controllers/user");
const { upload } = require("../middleware/multer");
const router = express.Router();

router.post("/register", createUser);

router.post("/login", loginUser);

router.post("/forgotPassword", forgotPassword);
router.patch("/resetPassword", resetPassword)


module.exports = router;
