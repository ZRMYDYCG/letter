import Router from "koa-router";
import commentController from "../controller/comment.controller";

const commentRouter = new Router({
  prefix: "/comment",
});

// @ts-ignore
commentRouter.post("/", commentController.createComment);

// @ts-ignore
commentRouter.get("/", commentController.getCommentsByMessageId);

export default commentRouter;
