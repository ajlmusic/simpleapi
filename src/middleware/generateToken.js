import jwt from "jsonwebtoken";

export function generateAccessToken(username) {
  return jwt.sign({ user: username }, process.env.TOKEN_SECRET, {
    expiresIn: "1800s",
  });
}
