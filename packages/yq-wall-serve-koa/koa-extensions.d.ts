import * as ws from "ws";

declare module "Koa" {
  interface Context {
    websocket?: ws; // 将 websocket 属性设置为可选
    path: string;
  }
}
