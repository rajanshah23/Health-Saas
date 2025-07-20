import { NextFunction, Response } from "express"
import { IExtendedRequest } from "../types/type"

class AsyncErrorHandler{
    errorHandler=(fn:Function)=>{
        return (req:IExtendedRequest,res:Response,next:NextFunction)=>{
            fn(req,res,next).catch((err:Error)=>{
                return res.status(400).json({
                    message:err.message,
                    fullError:err
                })
            })
        }
    }
}
const asyncHandler = new AsyncErrorHandler()
const HandleError = (fn:Function) => asyncHandler.errorHandler(fn);
export default HandleError