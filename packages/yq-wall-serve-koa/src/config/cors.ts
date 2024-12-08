import { Context } from "koa";
export const corsHandler = {
  origin: (ctx: Context) => {
    const allowedOrigins = ["http://localhost:5173"];
    if (allowedOrigins.includes(ctx.request.headers.origin)) {
      return ctx.request.headers.origin;
    }
    return false; // 拒绝其他来源
  },
  maxAge: 7 * 24 * 60 * 60,
  credentials: true,
  allowMethods: ["GET", "POST", "OPTIONS", "DELETE"],
  allowHeaders: ["Content-Type", "Authorization", "Accept", "X-Requested-With"],
};
