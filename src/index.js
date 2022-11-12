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
import { generateAccessToken } from "./middleware/generateToken.js";
import { authenticateToken } from "./middleware/authenticateToken.js";
import { newUserID } from "./middleware/generateUserId.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 5500;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.options("*", cors());

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

app.get("/api/files", authenticateToken, function (req, res) {
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