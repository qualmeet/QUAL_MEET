import {createServer} from "./server";
import {env} from "./config/env";


async function start(){
    const {httpServer}=await createServer();

    httpServer.listen(env.PORT,()=>{
        console.log(`signaling service listening on port ${env.PORT}`);
    });
}

 start();

