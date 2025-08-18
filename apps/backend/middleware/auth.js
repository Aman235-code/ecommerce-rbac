import jwt from "jsonwebtoken";

export function verifyToken(req, res, next) {
  const header = req.headers.authorization;
  console.log(header);
  if (!header) return res.status(401).json({ error: "No token" });

  const token = header.split(" ")[1];
  console.log(token);
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // contains id, email, role
    next();
  } catch (err) {
    res.status(401).json({ error: "Invalid token" });
  }
}
