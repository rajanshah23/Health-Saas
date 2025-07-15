import { Request, Response } from "express";
import User from "../../../database/models/userModel";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

class AuthController {
  static async registerUser(req: Request, res: Response) {
    console.log(req.body);
    if (req.body === undefined) {
      res.status(400).json({
        message: "No data was sent",
      });
    }
    //incoming data accept
    const { email, username, password } = req.body;
    if (!email || !username || !password) {
      res.status(400).json({
        message: "Please provide email, username, password",
      });
    }
    const existingUser = await User.findOne({
      where: {
        email: email,
      },
    });
    if (existingUser) {
      //  Email already registered
      res.status(400).json({
        message: "Email already exists",
      });
    }
    //inserts into user table
    await User.create({
      username: username,
      email: email,
      password: bcrypt.hashSync(password, 12),
    });
    res.status(201).json({
      message: "User registered successfully",
    });
  }
  static async loginUser(req: Request, res: Response) {
    // incoming data accept
    const { email, password } = req.body;
    if (!email || !password) {
      res.status(400).json({
        message: "Please provide email, password",
      });
    }
    //check if email exist or not in our user Table for this use findALL()
    const data = await User.findAll({
      where: { email: email },
    });
    if (data.length === 0) {
      res.status(404).json({
        message: "Not registered",
      });
    } else {
      // Check Password
      //compare(plain password user bata aako password,hashed password  registered vako bela ko password)
      const isPasswordMatched = await bcrypt.compare(
        password,
        data[0].password
      );
      if (isPasswordMatched) {
        const token = jwt.sign({ id: data[0].id },"hahaha", {
          expiresIn: "2min",
        });
        res.cookie("jwtToken", token);
        return res.status(201).json({
          message: "Login Successfull",
        });
      } else {
        res.status(400).json({
          message: "Invalid email or password",
        });
      }
    }
  }

}

export default AuthController;
