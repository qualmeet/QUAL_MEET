import {Request,Response,NextFunction} from "express";

export function verifyCSRF(req:Request,res:Response,next:NextFunction){

    const csrfCookie=req.cookies?.csrf_token;
    const csrfHeader=req.headers["x-csrf-token"];

    if(!csrfCookie || !csrfHeader || csrfCookie !== csrfHeader){
        return res.status(403).json({
            error:"CSRF_TOKEN_INVALID",
        });
    }

    next();
}