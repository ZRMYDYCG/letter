import Router from "koa-router";
import commentController from "../controller/comment.controller";

const commentRouter = new Router({
  prefix: "/comment",
});

commentRouter.post("/", commentController.createComment);

commentRouter.get("/", commentController.getCommentsByMessageId);

export default commentRouter;
