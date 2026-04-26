import brcypt from "bcrypt";
import jwt from "jsonwebtoken";
import {prisma} from "../db/prisma";
import { SignupRequestDTO,LoginRequestDTO } from "../dto/auth.dto";
import { UserAlreadyExistsError } from "../errors/AuthErrors";
import { getPrivateKey,getPublicKey } from "../utils/jwt";
import { AppError } from "../errors/AppError";

const SALT_ROUNDS=10;


export interface JwtPayload {
  userId: string;
  email: string;
  fullName: string;
}

//signup business logic
export async function signupUser(data:SignupRequestDTO){
    const {email,password,fullName}=data;

    //checking if user exists (same email)
    const existingUser= await prisma.user.findUnique({
        where:{email},
    });

    if(existingUser){
        throw new UserAlreadyExistsError();
    }

    //hash the passowrd to store in db
    const passwordHash=await brcypt.hash(password,SALT_ROUNDS);

    //create user in db
    const user=await prisma.user.create({
        data:{
            email,
            passwordHash,
            fullName,
        },
    });


    return {
        id:user.id,
        email:user.email,
        fullName:user.fullName,
        createdAt:user.createdAt,
    };
}


export async function loginUser(data:LoginRequestDTO){

    const {email,password}=data;

    //find user in the database
    const user=await prisma.user.findUnique({
        where:{email},
    });

    if(!user){
        throw new AppError("Invalid email or password",401);
    }


    //compare password
    const isValid=await brcypt.compare(password,user.passwordHash);

    if(!isValid){
        throw new AppError("Invalid email or password",401);
    }


    //create jwt payload
    const payload={
        userId:user.id,
        email:user.email,
        fullName:user.fullName,
    };

    //sign jwt (RS256)
    const accessToken=jwt.sign(payload,getPrivateKey(),{
        algorithm:"RS256",
        expiresIn:"15m",
    });

    const refreshToken=jwt.sign(payload,getPrivateKey(),{
        algorithm:"RS256",
        expiresIn:"7d",
    });

    return {
        accessToken,
        refreshToken,
        user
    };
}


export async function refreshAccessToken(refreshToken:string){
    try{

        //verifying refresh token from cookie
        const decoded=jwt.verify(refreshToken,getPublicKey(),{
            algorithms:["RS256"],
        }) as JwtPayload;

        //create jwt payload
        const payload={
            userId:decoded.userId,
            email:decoded.email,
            fullName:decoded.fullName,
        };

        //creating new access token
        const newAccessToken=jwt.sign(payload,getPrivateKey(),{
            algorithm:"RS256",
            expiresIn:"15m",
        });

        return{
            accessToken:newAccessToken,
        };
    }

    catch(error:any){
        if(error.name==="TokenExpiredError"){
            throw new AppError("REFRESH_TOKEN_EXPIRED",401);
        }
        throw new AppError("INVALID_REFRESH_TOKEN",401);
    }
}

type JwtPayloadWithExp=JwtPayload & {exp:number};

export async function getCurrentUser(accessToken:string){
    try{
        const decoded=jwt.verify(accessToken,getPublicKey(),{
            algorithms:["RS256"],
        }) as JwtPayloadWithExp;

        return {
            id:decoded.userId,
            email:decoded.email,
            fullName:decoded.fullName,
            exp:decoded.exp,  
        };

    }
    catch(error:any){
        if(error.name==="TokenExpiredError"){
            throw new AppError("TOKEN_EXPIRED",401);
        }
        throw new AppError("INVALID_TOKEN",401);
    }
}