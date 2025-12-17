import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

// eslint-disable-next-line no-undef
const JWT_SECRET = process.env.JWT_SECRET;

const generateTokenService = (userId, username, role) => {
  const payload = {
    id: userId,
    username: username,
    role: role,
  };
  return jwt.sign(payload, JWT_SECRET, { expiresIn: "60min" });
};

export default generateTokenService;
