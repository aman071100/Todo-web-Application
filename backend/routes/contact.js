const express = require("express");
const { upload } = require("../middleware/multer");
const { createContact, getContact, UpdateContact, deleteContact, getContacts } = require("../controllers/contact");
const { isAuthenticated } = require("../middleware/isAuthenticated");
const router = express.Router();

router.post("/create", isAuthenticated, upload.fields([{
    name: 'image',
    maxCount: 1
}]), createContact);

router.get("/getAll", isAuthenticated, getContacts);
router.get("/getContact/:id",isAuthenticated, getContact)
router.patch("/updateContact/:id", isAuthenticated, upload.fields([{
    name: 'image',
    maxCount: 1
}]), UpdateContact)
router.delete("/deletedContact/:id",isAuthenticated, deleteContact);

module.exports = router;
