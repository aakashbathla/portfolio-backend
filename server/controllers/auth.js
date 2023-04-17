import db from "../db.js";
import bcrypt from "bcrypt";
import Jwt from "jsonwebtoken";

export const register = async (req, res) => {
  try {
    db.connect();
    const q = "SELECT * FROM users WHERE email=? OR user_name=?";
    db.query(q, [req.body.email, req.body.username], async (error, data) => {
      if (error) return res.json(error);
      if (data.length) return res.status(409).json("User already exists");
      // Hash the password
      const salt = bcrypt.genSaltSync(10);
      const hash = bcrypt.hashSync(req.body.password, salt);
      const q =
        "INSERT INTO users (user_name,email,password,user_type) VALUES (?) ";
      const values = [req.body.username, req.body.email, hash, "user"];
      db.query(q, [values], (err, data) => {
        if (err) return res.json(err);
        return res.status(200).json("User hash been created");
      });
    });
  } catch (error) {
    console.log(error);
  }
};

export const login = (req, res) => {
  try {
    db.connect();
    const q = "SELECT * FROM users WHERE email=?";
    db.query(q, [req.body.email], (err, data) => {
      if (err) return res.json(err);
      if (data.length === 0) return res.status(404).json("User not found");
      console.log(req.body.password);
      console.log(data);
      const isPasswordCorrect = bcrypt.compareSync(
        req.body.password,
        data[0].PASSWORD || data[0].password
      ); // true
      console.log(isPasswordCorrect);
      if (!isPasswordCorrect)
        return res.status(400).json("Wrong email or password");
      const token = Jwt.sign({ id: data[0].id }, "jwtkey");
      const { password, ...other } = data[0];
      console.log(token);
      return res
        .cookie("access_token", token, {
          path: "/",
          domain: `${process.env.DOMAIN}`,
          sameSite: "Lax",
          secure: true,
        })
        .status(200)
        .json(other);
    });
  } catch (error) {
    console.log(error);
  }
};

export const logout = (req, res) => {
  try {
    return res
      .clearCookie("access_token", {
        path: "/",
        domain: `${process.env.DOMAIN}`,
        sameSite: "Lax",
        secure: `${process.env.SECURE}`,
      })
      .status(200)
      .json("User has been logged out.");
  } catch (error) {
    console.log(error);
  }
};
