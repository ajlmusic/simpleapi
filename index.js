/**
 * Simple API with Express and JWT
 * @author Andrew Lewis <andrew.lewis@nehetek.com>
 * 
 */

import dotenv from "dotenv";
import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import cors from "cors";
import jwt from "jsonwebtoken";
import crypto from "crypto";

dotenv.config();

const app = express();
const port = process.env.PORT || 5500;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.options("*", cors());

let randomNum = Math.random();
let newUserID = crypto.randomBytes(16).toString("hex"); 

// TOKEN Generation and Verification

// generate token
function generateAccessToken(username) {
  return jwt.sign({user: username}, process.env.TOKEN_SECRET, { expiresIn: '1800s' });
}

// verify token
function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1];

  if (token == null) return res.sendStatus(401)

  jwt.verify(token, process.env.TOKEN_SECRET, (err, user) => {
    console.log(err)

    if (err) return res.sendStatus(403)

    req.user = user

    next()
  })
}

// endpoints
app.get("/api", (req, res) => {
  let msg = { msg: "Welcome to the Files API" };
  const token = generateAccessToken(newUserID);

  res.json({ msg, token });
});

app.get("/api/categories", authenticateToken, (req, res) => {
  let categories = [
    { id: 1, name: "books" },
    { id: 2, name: "colleges" },
    { id: 3, name: "events" },
    { id: 4, name: "locations" },
  ];
  res.json(categories);
});

app.get("/api/files", authenticateToken,function (req, res) {
  let options = {
    root: path.join(__dirname),
  };
  console.log(__dirname);
  let fileName = "welcome.pdf";
  res.sendFile(fileName, options, function (err) {
    if (err) {
      next(err);
    } else {
      console.log("Sent:", fileName);
    }
  });
});

app.listen(port, () => console.log(`App running at http://localhost:${port}`));
