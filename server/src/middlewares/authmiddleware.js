import jwt from "jsonwebtoken";
import User from "../models/userModel.js";

export const Protect = async (req, _res, next) => {
  try {
    const token = req.cookies.IDCard || "";

    if (!token) {
      const error = new Error("Unauthorized !! Login Again");
      error.statusCode = 401;
      return next(error);
    }

    const decode = jwt.verify(token, process.env.JWT_SECRET);

    const verifiedUser = await User.findById(decode.ID);

    if (!verifiedUser || verifiedUser.status !== "Active") {
      const error = new Error("Unauthorized !! Login Again");
      error.statusCode = 401;
      return next(error);
    }

    req.user = verifiedUser;
    next();
  } catch (error) {
    if (
      error instanceof jwt.JsonWebTokenError ||
      error instanceof jwt.TokenExpiredError
    ) {
      const authError = new Error(
        "Your session has expired. Please sign in again.",
      );
      authError.statusCode = 401;
      return next(authError);
    }

    next(error);
  }
};

export const isAdmin = async (req, _res, next) => {
  try {
    if (req.user.role !== "Admin") {
      const error = new Error("Unauthorized !! Admin Permission Required");
      error.statusCode = 403;
      return next(error);
    }
    next();
  } catch (error) {
    next(error);
  }
};
