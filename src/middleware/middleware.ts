import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import User from "../database/models/userModel";
import { IExtended } from "../types/type";
class Middleware {
  static async isLoggedIn(req: IExtended, res: Response, next: NextFunction) {
    //check user is login or not
    //check token
    const token = req.headers.authorization;
    if (!token) {
      res.status(401).json({
        message: "Please provide token",
      });
      return;
    }
    // verify token
    jwt.verify(token, "hahaha", async (error, success: any) => {
      if (error) {
        res.status(400).json({
          message: "Invalid token",
        });
      } else {
        //double Verification
        const userData = await User.findByPk(success.id);
        if (!userData) {
          res.status(403).json({
            message: "No user with that id,Invalid token",
          });
        } else {
          req.user = userData;
          next();
        }
      }
    });
  }
}

export default Middleware;
