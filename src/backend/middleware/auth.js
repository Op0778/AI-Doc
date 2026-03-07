import jwt from "jsonwebtoken";

export default function (req, res, next) {
  const token = req.headers.authorization;

  if (!token) return res.status(401).json({ message: "No token" });

  try {
    const decoded = jwt.verify(token.split(" ")[1], "mysecretkey");
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ message: "Invalid token" });
    alert("Session expired. Please log in again.");
    console.log(error);
    res.redirect("/login");
  }
}
