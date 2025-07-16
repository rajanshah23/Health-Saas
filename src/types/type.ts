import { Request } from "express"

 export interface IExtended extends Request{
    user?:{
        email:string,
        username:string,
    };
}