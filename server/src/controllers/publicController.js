import Contact from "../models/contactModel.js";

export const ContactUs = async (req, res, next) => {
  try {
    const { fullName, email, message, phone } = req.body;

    if (!fullName || !email || !message || !phone) {
      const error = new Error("All fields are required");
      error.statusCode = 400;
      return next(error);
    }

    const newContact = await Contact.create({
      fullName,
      email,
      message,
      phone,
      status: "Pending",
    });

    res.status(201).json({
      message: `Thanks for Contacting Us. You will receive a Response soon at ${newContact.email}`,
    });
  } catch (error) {
    next(error);
  }
};