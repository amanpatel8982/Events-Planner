import jwt from "jsonwebtoken";

const genToken = (userID, res) => {
  const token = jwt.sign({ ID: userID }, process.env.JWT_SECRET, {
    expiresIn: "1D",
  }); // Agar ham ek bar kisi bhi website ko login kr lete hai to phir use ham 1 din tk login rhta hai ek din ke baad vo apne aap logout ho jayega

  res.cookie("IDCard", token, {
    maxAge: 1000 * 60 * 60 * 24,
    httpOnly: true, // essentially means that the cookie cannot be accessed via JavaScript, which helps prevent XSS attacks.
    secure: false,
    sameSite: "lax", // helps to prevent CSRF attacks by ensuring that the cookie is only sent with same-site requests.
  });
};

export default genToken;
