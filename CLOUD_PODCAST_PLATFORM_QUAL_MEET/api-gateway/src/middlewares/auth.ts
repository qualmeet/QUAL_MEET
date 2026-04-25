import {Request,Response,NextFunction} from "express";
import jwt from "jsonwebtoken";
import { JWT_PUBLIC_KEY } from "../config/env";
import { JwtPayload } from "@qualmeet/shared";

export function authenticate(req:Request,res:Response,next:NextFunction){


    const token = req.cookies?.access_token;

    if(!token){
        return res.status(401).json({
            error:"Access token missing",
        });
    }

    try{
        //decodes the payload (id,email,fullName)
        const decoded=jwt.verify(token,JWT_PUBLIC_KEY,{
            algorithms:["RS256"],
        })as JwtPayload;


        //attach verified identity to request
        (req as any).user=decoded;
        //req.user.userId
        //req.user.email
        //req.user.fullName

        req.headers["x-user-id"]=decoded.userId;
        req.headers["x-user-email"]=decoded.email;
        req.headers["x-user-name"]=decoded.fullName;

        next();
    }
    catch(error:any){
         if (error.name === "TokenExpiredError") {
            return res.status(401).json({ error: "TOKEN_EXPIRED" });
        }

        return res.status(401).json({ error: "INVALID_TOKEN" });
    }

}