import { refreshToken } from "./auth";

const API_BASE_URL=import.meta.env.VITE_API_BASE_URL ?? "http://localhost:4000";




//accessTokenExpiry
let accessTokenExpiry:number | null =null;

export function setAccessTokenExpiry(expiry:number){
    accessTokenExpiry=expiry;
    localStorage.setItem("access_expiry",expiry.toString());
}

export function getAccessTokenExpiry(){
    if(accessTokenExpiry!==null)
        return accessTokenExpiry;

    const stored=localStorage.getItem("access_expiry");
    if(stored){
        accessTokenExpiry=Number(stored);
        return accessTokenExpiry;
    }

    return null;
}

export function clearAccessTokenExpiry(){
    accessTokenExpiry=null;
    localStorage.removeItem("access_expiry");

    if(expiryTimer){
        clearTimeout(expiryTimer);
        expiryTimer=null;
    }
}




//refreshPromise to handle multiple refresh token calls 
let refreshPromise:Promise<{success:boolean; accessTokenExpiry:number}> | null=null;


export async function handleTokenRefresh(){
    if(!refreshPromise){
        refreshPromise=refreshToken()
            .then((res)=>{
                setAccessTokenExpiry(res.accessTokenExpiry);
                startExpiryTimer();

                //notify the whole app that token refrehsed so old socket connection breaks and new socket connection forms using new access token
                window.dispatchEvent(new Event("token_refreshed"));

                return res;
            })
            .finally(()=>{
                refreshPromise=null;
            })
    }

    return refreshPromise;
}





//tracking expiry time of access token to refresh the access token
let expiryTimer:ReturnType<typeof setTimeout> | null=null;

export function startExpiryTimer(){
    const expiry=getAccessTokenExpiry();

    if(!expiry)
        return;

    const delay=expiry-Date.now()-5000; //5 seconds before actual expiry

    if(delay<=0)
        return;

    if(expiryTimer){
        clearTimeout(expiryTimer);
    }

    expiryTimer=setTimeout(async()=>{
        try{
            console.log("[auth] proactive refresh");

            await handleTokenRefresh();

            //restart timer again with new expiry
            startExpiryTimer();
        }
        catch{
            clearAccessTokenExpiry();
        }
    },delay);
}




//getting csrf tokrn from cookie
export function getCSRFToken(){
    const match=document.cookie.match(/csrf_token=([^;]+)/);

    return match ? match[1] : null;
}




interface RequestOptions extends RequestInit{
    auth?:boolean;
}

export async function apiRequest<T>(
    path:string,
    options:RequestOptions={}
):Promise<T>{

    let hasRetried=false;
    
    const headers:Record<string, string>={
        "Content-Type":"application/json",
    };

    if(options.headers){
        if(options.headers instanceof Headers){
             // Convert Headers → object
            options.headers.forEach((value,key)=>{
                headers[key]=value;
            });
        }
        else if(Array.isArray(options.headers)){
            // Convert array → object
            for(const [key,value] of options.headers){
                headers[key]=value;
            }
        }
        else{
            // Already object → merge
            Object.assign(headers,options.headers);
        }
    }

    
    const csrfToken=getCSRFToken();
    if(csrfToken && options.method && options.method!=="GET"){
        headers["x-csrf-token"]=csrfToken;
    }

    

    let res=await fetch(`${API_BASE_URL}${path}`,{
        ...options,
        headers,
        credentials:"include", // to include cookies in requests
    });

    if(res.status===401  && !hasRetried){
        const errorBody =await res.json().catch(()=>({}));

        if(errorBody.error === "TOKEN_EXPIRED"){

           try{
                 console.log("Access token expired, attempting to refresh...");

                await handleTokenRefresh();

                hasRetried=true;

                //retrying original request
                res=await fetch(`${API_BASE_URL}${path}`,{
                    ...options,
                    headers,
                    credentials:"include",
                });
           }
           catch{
                clearAccessTokenExpiry();
                throw new Error("SESSION_EXPIRED");
           }
        }
        else{
            throw new Error(errorBody.error || "Unauthorized");
        }
        
    }

    if(!res.ok){
        const errorBody=await res.json().catch(()=>({}));
        throw new Error(errorBody.error || "API request failed");
    }

    return res.json() as Promise<T>;

}


