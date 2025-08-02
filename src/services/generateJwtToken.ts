import jwt from "jsonwebtoken";

const generateToken = (data: { id: string, clinicNumber?: string }) => {
  //@ts-ignore
    const token = jwt.sign(
        data,  
        process.env.JWT_SECRET as string, 
        {
            expiresIn: process.env.JWT_EXPIRES_IN,  
        }
    );
    return token;
};

export default generateToken;