import Router from "koa-router";
import messageController from "../controller/message.controller";

const messageRouter = new Router({
  prefix: "/message",
});

messageRouter.post("/", messageController.createMessage);
messageRouter.delete("/:id", messageController.deleteMessage);
messageRouter.get("/", messageController.getMessage);
messageRouter.post("/like", messageController.likeMessage);
messageRouter.post("/unlike", messageController.unlikeMessage);

export default messageRouter;
