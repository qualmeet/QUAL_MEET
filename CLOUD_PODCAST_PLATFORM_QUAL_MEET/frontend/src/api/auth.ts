import { apiRequest, getCSRFToken} from "./client";
const API_BASE_URL=import.meta.env.VITE_API_BASE_URL ?? "http://localhost:4000";


interface SignupInput{
    email:string;
    password:string;
    fullName:string;
}

interface LoginInput{
    email:string;
    password:string;
}

interface MeResponse{
    user:UserDTO;
    accessTokenExpiry:number;
}

export interface UserDTO {
  id: string;
  email: string;
  fullName: string;
}

/**
 * Auth signup response
 */

export interface SignupResponse {
  user: UserDTO;
}

/**
 * Auth login response
 */
export interface LoginResponse {
  user: UserDTO;
  accessTokenExpiry:number; // in ms
}


export async function signup(input:SignupInput):Promise<SignupResponse>{
    return apiRequest<SignupResponse>("/api/auth/signup",{
        method:"POST",
        body:JSON.stringify(input)
    });
}

export async function login(input:LoginInput):Promise<LoginResponse>{
    const res=await apiRequest<LoginResponse>("/api/auth/login",{
        method:"POST",
        body:JSON.stringify(input)
    });

    return res;
}

export async function logout():Promise<{success:boolean}>{
    console.log("logout step3");
    return apiRequest<{success:boolean}>("/api/auth/logout",{
        method:"POST",
    });
}

export async function getMe():Promise<MeResponse>{
    return apiRequest<MeResponse>("/api/auth/me",{
        method:"GET",
    });
}

export async function refreshToken():Promise<{success:boolean; accessTokenExpiry:number}>{
    
    const csrfToken=getCSRFToken();
    
    const res=await fetch(`${API_BASE_URL}/api/auth/refresh`,{
        method:"POST",
        credentials:"include",
        headers:{
            "Content-Type":"application/json",
            ...(csrfToken ? {"x-csrf-token":csrfToken} : {})
        }
    });

    if(!res.ok){
        throw new Error("Refresh failed");
    }

    return res.json();
}



