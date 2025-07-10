import User from "../models/userModel.js";
import bcrypt from "bcrypt";
import genToken from "../utils/auth.js";

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

    const isVerified = await bcrypt.compare(password, user.password);

    if (!isVerified) {
      const error = new Error("Invalid Username or Password");
      error.statusCode = 401;
      return next(error);
    }

    genToken(user._id, res);

    res
      .status(200)
      .json({ message: `Welcome Back ${user.fullName}`, data: user });
  } catch (error) {
    next(error);
  }
};


export const Logout =(req, res)=>{
    res.json({message:"User Register Done"});
}


export const Update =(req, res)=>{
    res.json({message:"User Register Done"});
}




