import {Request,Response} from "express";
import { SignupRequestDTO,LoginRequestDTO } from "../dto/auth.dto";
import {signupUser,loginUser,refreshAccessToken, getCurrentUser} from "../services/auth.service";
import { AppError } from "../errors/AppError";
import crypto from "crypto";


export interface UserDTO {
  id: string;
  email: string;
  fullName: string;
}

export interface SignupResponse {
  user: UserDTO;
}

export interface LoginResponse {
  user: UserDTO;
  accessTokenExpiry:number; // in ms
}


// POST /auth/signup
export async function signup(req:Request,res:Response){

    try{
        //verifying req body data at compile time using dto, will not work at run time 
        const data=req.body as SignupRequestDTO;

        const user=await signupUser(data);

        const response={
            user,
        }satisfies SignupResponse;

        return res.status(201).json(response);
    }
    catch(error:unknown){
        if(error instanceof AppError){
            return res.status(error.statusCode).json(
                {
                    error:"User with this email already exists",
                }
            )
        }

        console.error("Unexpected Sign up error: ",error);

        return res.status(500).json({
            error:"Internal server error",
        })
    }
}


export async function login(req:Request,res:Response){

    try{
        //verifying req body data at compile time using dto, will not work at run time
        const data=req.body as LoginRequestDTO;

        const {accessToken,refreshToken,user}=await loginUser(data);

        const csrfToken=crypto.randomBytes(32).toString("hex"); // 64 char random string

        const isProd = process.env.NODE_ENV === "production";

        res.cookie("csrf_token",csrfToken,{
            secure: isProd,                     
            sameSite: isProd ? "none" : "lax", 
            httpOnly:false, // accessible by client-side js
        });

        res.cookie("access_token", accessToken, {
            httpOnly:true,
            secure: isProd,                     
            sameSite: isProd ? "none" : "lax", 
            maxAge:15*60*1000, //15 mins
        });

        res.cookie("refresh_token", refreshToken, {
            httpOnly:true,
            secure: isProd,                     
            sameSite: isProd ? "none" : "lax", 
            path:"/api/auth/refresh", // refresh token only sent to refresh endpoint
            maxAge:7*24*60*60*1000, //7 days
        });

        const accessTokenExpiry=Date.now() + 15*60*1000; // in ms

        return res.status(200).json({
            user,
            accessTokenExpiry,
        } satisfies LoginResponse);
    }
    catch(error:unknown){
        if(error instanceof AppError){
            return res.status(error.statusCode).json(
                {
                    error:error.message,
                }
            );
        }

        console.error("Unexpected Login error",error);
        return res.status(500).json({
            error:"Internal server error",
        });
    }
}


//refreshing "access token" using refresh token

export async function refresh(req:Request,res:Response){
    try{

        const refreshToken=req.cookies?.refresh_token;


        if(!refreshToken){
            return res.status(401).json({
                error:"NO_REFRESH_TOKEN",
            });
        }

        const {accessToken}=await refreshAccessToken(refreshToken);

        const isProd = process.env.NODE_ENV === "production";

        //set new access token in cookie
        res.cookie("access_token",accessToken,{
            httpOnly:true,
            secure: isProd,                     
            sameSite: isProd ? "none" : "lax", 
            maxAge:15*60*1000, //15 mins
        });

        const accessTokenExpiry=Date.now() + 15*60*1000;

        return res.status(200).json({
            success:true,
            accessTokenExpiry,
        });
    }
    catch(error:unknown){
        if(error instanceof AppError){
            return res.status(error.statusCode).json(
                {
                    error:error.message,
                }
            );
        }
        console.error("Unexpected error in refreshing access token",error);
        return res.status(500).json({
            error:"Internal server error",
        });
    }
}


export async function logout(req:Request,res:Response){
    try{

        const isProd = process.env.NODE_ENV === "production";

        res.clearCookie("access_token",{
            httpOnly:true,
            secure: isProd,                   
            sameSite: isProd ? "none" : "lax",
        });

        res.clearCookie("refresh_token",{
            httpOnly:true,
            secure: isProd,                     
            sameSite: isProd ? "none" : "lax", 
            path:"/api/auth/refresh",
        });

        return res.status(200).json({success:true});    
    }
    catch(error:unknown){
        console.error("Unexpected error in logout",error);
        return res.status(500).json({
            error:"Internal server error",
        });
    }
}


export async function getMe(req:Request,res:Response){
    try{
        const accessToken=req.cookies?.access_token;

        if(!accessToken){
            return res.status(401).json({
                error:"No access token provided",
            });
        }

        const user=await getCurrentUser(accessToken);

        const accessTokenExpiry=user.exp * 1000; // convert to ms

        return res.status(200).json({
            user:{
                id:user.id, 
                email:user.email,
                fullName:user.fullName,
            },
            accessTokenExpiry,
        });
    }
    catch(error:unknown){
        if(error instanceof AppError){
            return res.status(error.statusCode).json(
                {
                    error:error.message,
                }
            );
        }
        console.error("Unexpected error in getting user",error);
        return res.status(500).json({
            error:"Internal server error",
        });
    }
}