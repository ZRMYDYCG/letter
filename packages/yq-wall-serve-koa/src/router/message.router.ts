import Router from "koa-router";
import messageController from "../controller/message.controller";

const messageRouter = new Router({
  prefix: "/message",
});

// @ts-ignore
messageRouter.post("/", messageController.createMessage);
// @ts-ignore
messageRouter.delete("/:id", messageController.deleteMessage);
// @ts-ignore
messageRouter.get("/", messageController.getMessage);
// @ts-ignore
messageRouter.post("/like", messageController.likeMessage);
// @ts-ignore
messageRouter.post("/unlike", messageController.unlikeMessage);

export default messageRouter;
