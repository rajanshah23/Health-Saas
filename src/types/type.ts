import { Request } from "express"

 export interface IExtendedRequest extends Request{
    user?:{
        id:string,
        email:string,
        username:string,
    };
    currentclinicNumber?:string | number
}