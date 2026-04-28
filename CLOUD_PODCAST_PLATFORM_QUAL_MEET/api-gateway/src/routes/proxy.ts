import { createProxyMiddleware } from "http-proxy-middleware";
import type { Options } from "http-proxy-middleware";
import type { ClientRequest,IncomingMessage } from "http";

const authProxyOptions: Options = {
  target: process.env.AUTH_SERVICE_URL,
  changeOrigin: true,
  proxyTimeout: 60000,  
  timeout: 60000,

  on: {
    proxyReq: (proxyReq: ClientRequest, req: IncomingMessage) => {
      const body = (req as any).body;

      if (!body) return;

      const bodyData = JSON.stringify(body);

      proxyReq.setHeader("Content-Type", "application/json");
      proxyReq.setHeader("Content-Length", Buffer.byteLength(bodyData));

      proxyReq.write(bodyData);
    },
  },
};

export const authProxy = createProxyMiddleware(authProxyOptions);



//room-service proxy - private route(jwt required)
export const roomProxy=createProxyMiddleware({
    target:process.env.ROOM_SERVICE_URL,
    changeOrigin:true,
    proxyTimeout: 60000,  
    timeout: 60000,

    on:{
      proxyReq:(proxyReq:ClientRequest,req:IncomingMessage)=>{
        const body=(req as any).body;

        if(!body)
            return;

        const bodyData=JSON.stringify(body);

        proxyReq.setHeader("Content-Type","application/json");
        proxyReq.setHeader("Content-Length",Buffer.byteLength(bodyData));
        proxyReq.write(bodyData);
      },
    },
});

// turn-credential-service proxy (private route)
export const turnProxy = createProxyMiddleware({
  target: process.env.TURN_CREDENTIAL_URL,
  changeOrigin: true,
  proxyTimeout: 60000,  
  timeout: 60000,

  on: {
    proxyReq: (proxyReq: ClientRequest, req: IncomingMessage) => {
      const body = (req as any).body;
      if (!body) return;

      const bodyData = JSON.stringify(body);

      proxyReq.setHeader("Content-Type", "application/json");
      proxyReq.setHeader("Content-Length", Buffer.byteLength(bodyData));
      proxyReq.write(bodyData);
    },
  },
});


export const mediaProxy=createProxyMiddleware({
  target:process.env.MEDIA_RECORDING_URL,
  changeOrigin:true,
  proxyTimeout: 60000,  
  timeout: 60000,

   on: {
    proxyReq: (proxyReq: ClientRequest, req: IncomingMessage) => {
      const body = (req as any).body;
      if (!body) return;

      const bodyData = JSON.stringify(body);

      proxyReq.setHeader("Content-Type", "application/json");
      proxyReq.setHeader("Content-Length", Buffer.byteLength(bodyData));
      proxyReq.write(bodyData);
    },
  },
});