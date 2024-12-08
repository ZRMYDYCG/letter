import Router from "koa-router";

import userRouter from "./user.router";
import authRouter from "./auth.router";
import uploadRouter from "./upload.router";
import messageRouter from "./message.router";
import commentRouter from "./comment.router";
import downloadRouter from "./download.router";

export const router = new Router();

router.use(userRouter.routes());
router.use(authRouter.routes());
router.use(uploadRouter.routes());
router.use(messageRouter.routes());
router.use(commentRouter.routes());
router.use(downloadRouter.routes());

// @ts-ignore
export default router;
