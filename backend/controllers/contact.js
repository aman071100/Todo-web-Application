const { catchAsyncFun } = require("../middleware/asyncFun")
const Contact = require("../modals/contact");
const uploadClodinary = require("../utils/cloudinary");
const errorHandler = require("../utils/errorCustomClass");
// ADD NEW CONTACT DATA
// POST METHOD

exports.createContact = catchAsyncFun(async (req, res, next)=>{
    const {name, phone, email} = req.body;

    if( !name || !phone || !email){
        return next(new errorHandler("All fields are required!"));
    }

     const profileImg = req.files?.image[0]?.path;

    const uplaodedImage = await uploadClodinary(profileImg);

    const contact = await Contact.create({
        name,
        email,
        phone,
        image : uplaodedImage.url
    });

    res.status(200).json({
        success : true,
        message : "Contact created successfully."
    })
});

exports.getContact = catchAsyncFun(async (req, res, next)=>{

    const contact = await Contact.findById(req.params.id);

    res.status(200).json({
        success : true,
        data : contact
    })
});

exports.getContacts = catchAsyncFun(async (req, res, next)=>{

    const { name } = req.query;
    let query = {};

    // Check if the 'name' query parameter is provided
    if (name) {
        // If provided, use it to filter the query
        query = { name: { $regex: new RegExp(name, 'i') } };
    }
    
    // Use the query to find contacts
    const contacts = await Contact.find(query);

    res.status(200).json({
        success : true,
        data : contacts
    })
});

exports.UpdateContact = catchAsyncFun(async (req, res, next)=>{
    const {name, phone, email} = req.body;

    if( !name || !phone || !email){
        return next(new errorHandler("All fields are required!"));
    }

    const profileImg = req.files?.image[0]?.path;

    const uplaodedImage = await uploadClodinary(profileImg);

    const contact = await Contact.findByIdAndUpdate(req.params.id, {
        name,
        email,
        phone,
        image : uplaodedImage.url
    });

    res.status(200).json({
        success : true,
        message : "Contact updated successfully."
    })
});

exports.deleteContact = catchAsyncFun(async (req, res, next)=>{

    const contact = await Contact.deleteOne({"_id" : req.params.id});

    res.status(200).json({
        success : true,
        message : "Contact deleted successfully."
    })
});
