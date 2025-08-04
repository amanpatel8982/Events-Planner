import User from "../models/userModel.js";
import bcrypt from "bcrypt";
import genToken from "../utils/auth.js";
import Deactivation from "../models/deactivationModel.js";


export const Register = async(req, res,next)=>{
    try{
        const{fullName,email,phone,password} = req.body;// request me jo data ayaa hai use fill kr rha hai object me 

    if(!fullName || !email || !phone || !password){
        const error = new Error ("All Fields Required");
        error.statusCode =400;
        return next(error);
    }

    const exitingUser = await User.findOne({email}) //mongodb ke anadar email ko search kr rhe hai wiht the help of ture / false

     if(exitingUser){
        const error = new Error("Email Already Registerd");
        error.statusCode=409;
       return next(error);
    }

    const hashedPassword = await bcrypt.hash(password,10); // 

       const profilePic = `https://placehold.co/600x400?text=${fullName.charAt(0).toUpperCase()}`

    
    
    const newUser = await User.create({  // User hamara mongodb ke andar create ho rha hai 
        fullName,
        email,
        phone,
        password:hashedPassword,
        photo:profilePic,
    });

    res.status(201).json({message:"Registration Successfull"})
    } catch (error){
        next(error);
    }
};

export const Login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      const error = new Error("all fleids Required");
      error.statusCode = 400;
      return next(error);
    }

    const user = await User.findOne({ email });
    if (!user) {
      const error = new Error("User Not Registered");
      error.statusCode = 400;
      return next(error);
    }

    const isVerified = await bcrypt.compare(password, user.password);// Password ko verify kr rha hai

    if (!isVerified) {
      const error = new Error("Invalid Username or Password");
      error.statusCode = 401;
      return next(error);
    }

    genToken(user._id, res); // Token generate kr rha hai aur response me bhej rha hai

    res
      .status(200)
      .json({ message: `Welcome Back ${user.fullName}`, data: user });
  } catch (error) {
    next(error);
  }
};

export const LogoutUser = (req, res, next) => {
  try {
    res.cookie("IDCard", "", { maxAge: 0 });
    res.status(200).json({ message: "Logout Successfull" });
  } catch (error) {
    next(error);
  }
};


export const UpdateUser = async (req, res, next) => {
  try {
    const currentUser = req.user;
    const {
      fullName,
      phone,
      gender,
      occupation,
      address,
      city,
      state,
      district,
      representing,
    } = req.body;

    if (!currentUser) {
      const error = new Error("User Not Found !! Login Again");
      error.statusCode = 401;
      return next(error);
    }
    const photo = req.file;
    let picture;
    if (photo) {
      const b64 = Buffer.from(photo.buffer).toString("base64");
      const dataURI = `data:${photo.mimetype};base64,${b64}`;

      const result = await cloudinary.uploader.upload(dataURI, {
        folder: "eventPlannerPictures",
        width: 500,
        height: 500,
        crop: "fill",
      });
      picture = result.secure_url;
    }

    const updatedUser = await User.findByIdAndUpdate(
      currentUser._id,
      {
        fullName,
        phone,
        gender,
        occupation,
        address,
        city,
        state,
        district,
        representing,
        photo: picture || currentUser.photo,
      },
      { new: true }
    );

    res.status(200).json({ message: "Profile Updated", data: updatedUser });
  } catch (error) {
    next(error);
  }
};


export const deleteUser = async (req, res, next) => {
  try {
    const userId = req.user;
    const { reason, feedback, confirmPassword } = req.body; // Or from params



    const currentUser = await User.findById(userId);
    if (!currentUser) {
      const error = new Error("User not found");
      error.statusCode = 404;
      return next(error);
    }

    // 2. Verify password
    const isPasswordValid = await bcrypt.compare(confirmPassword, currentUser.password);
    if (!isPasswordValid) {
      const error = new Error("Invalid password");
      error.statusCode = 401;
      return next(error);
    }

    // 3. Deactivate user (preserve password hash)
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { status: "Inactive" }, // Only update status
      { new: true }
    );

    if (!updatedUser) {
      const error = new Error("Deactivation failed");
      error.statusCode = 500;
      return next(error);
    }

    // 4. Log deactivation reason
    await Deactivation.create({ userId, reason, feedback });

    res.status(200).json({ message: "Account deactivated" });
  } catch (error) {
    next(error);
  }
};