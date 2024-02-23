const { catchAsyncFun } = require("../middleware/asyncFun")
const Contact = require("../modals/contact");
const { AllHttpCode } = require("../utils/allStatusCode");
const uploadClodinary = require("../utils/cloudinary");
const ErrorHandler = require("../utils/errorCustomClass");
// ADD NEW CONTACT DATA
// POST METHOD

exports.createContact = catchAsyncFun(async (req, res, next) => {
    const { name, phone, email, address } = req.body;

    if (!name || !phone || !email || !address) {
        return next(new ErrorHandler("All fields are required!", AllHttpCode.All_Fields_Required));
    }

    const profileImg = req.files?.image[0]?.path;

    const uplaodedImage = await uploadClodinary(profileImg);

    const contact = await Contact.create({
        name,
        email,
        phone,
        address,
        image: uplaodedImage.url
    });

    res.status(200).json({
        success: true,
        message: "Contact created successfully."
    })
});

exports.getContact = catchAsyncFun(async (req, res, next) => {

    const contact = await Contact.findById(req.params.id);

    if (!contact) {
        return next(new ErrorHandler("Not Found", AllHttpCode.Not_Found))
    }

    res.status(200).json({
        success: true,
        data: contact
    })
});

exports.getContacts = catchAsyncFun(async (req, res, next) => {

    const { name } = req.query;
    let query = {};

    // Check if the 'name' query parameter is provided
    if (name) {
        // If provided, use it to filter the query
        query = { name: { $regex: new RegExp(name, 'i') } };
    }

    // Use the query to find contacts
    const contacts = await Contact.find(query);
    if (!contacts) {
        return next(new ErrorHandler("Not Found", AllHttpCode.Not_Found))
    }
    res.status(200).json({
        success: true,
        data: contacts
    })
});

exports.UpdateContact = catchAsyncFun(async (req, res, next) => {
    const { name, phone, email, address } = req.body;

    if (!name || !phone || !email || !address) {
        return next(new ErrorHandler("All fields are required!", AllHttpCode.All_Fields_Required));
    }
    
    if(req?.files?.image && req?.files?.image[0] !== undefined){
        const profileImg = req?.files?.image[0]?.path;
        const uplaodedImage = await uploadClodinary(profileImg);
        const contact = await Contact.findByIdAndUpdate(req.params.id, {
            name,
            email,
            phone,
            address,
            image: uplaodedImage.url
        });
        }else{
            const contact = await Contact.findByIdAndUpdate(req.params.id, {
                name,
                email,
                phone,
                address,
            });
        }
    res.status(200).json({
        success: true,
        message: "Contact updated successfully."
    })
});

exports.deleteContact = catchAsyncFun(async (req, res, next) => {

    const contact = await Contact.deleteOne({ "_id": req.params.id });

    res.status(200).json({
        success: true,
        message: "Contact deleted successfully."
    })
});
