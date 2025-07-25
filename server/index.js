import dotenv from "dotenv"; // npm package hai jo .env file me likhe variables ko use karne ke help krta hai/ ye app ke secret values (jaise password , API key) ko secure rakhne me madad krta hia
dotenv.config();// .env file se variables load karta hai  / speed ke sath variables ko load krta hai/ .env file me likhe sabhi variables ko process.env  me avaible kra deti hai


import express from 'express'; //Server banane ke liye framework ,Express.js framework ko import karti hai ,
import morgan from 'morgan'; // ek HTTP request logger middleware hai/ jab koe user request bhejta hia to morgan uska detail console me dikhata hai / de debugging ke liye helpgul hota hai
import  connectDB  from "./src/config/db.js";
import AuthRouter from "./src/routes/authroute.js";
import UserRouter from "./src/routes/userRoutes.js";
import cors from 'cors'; // jo request aa rhi hai vo kaha se aa rhi hai kaun bhej rha hai 
import cookieParser from "cookie-parser";
import cloudinary from "./src/config/cloudinary.js";
import PublicRouter from "./src/routes/publicRouter.js";


const app = express(); // check url states // eske though hum routes aur middlewares define karte hai / core app = express ke niche hi likha rhana chahiye
app.use(cors({origin:"http://localhost:5173",credentials: true}));


app.use(express.json()); // Ye middleware hai jo incoming request ka data (body) JSON format me convert karta hai
app.use(cookieParser());
app.use(morgan("dev"));  // 





app.use("/auth",AuthRouter); // Jab bhi URL /auth se start hoga, tab AuthRouter me jo bhi routes define hain, wo use honge.//auth/login, /auth/register wagaira
app.use("/user",UserRouter);
app.use("/public",PublicRouter);



app.get("/", (req, res) => {
  res.json({ message: "Server Connected" });
});


app.use((err,req,res,next)=>{ // error handling middleware hai
    const errorMessage = err.message || "Internal server Error" //err.message agar nahi mile to default message: "Internal server Error".
    const errorCode = err.statusCode || 500 //err.statusCode agar nahi mile to default code: 500.
    res.status(errorCode).json({message: errorMessage});
});


 const port = process.env.PORT || 5000; // process .env =>  Variable ko access karne ka tarika

app.listen(port, async()=>{ // Server start karta hai aur DB se connect hota hai
    console.log("Server started at", port);

    try {
    await connectDB();
    await cloudinary.api.resources({ max_results: 1 });
    console.log("Cloudinary Connected");
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
});
