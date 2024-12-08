import Router from "koa-router";
import send from "koa-send";

const downloadRouter = new Router();

/**
 * @description 文件下载
 */
downloadRouter.post("/download/:filename", async (ctx) => {
  const filename = ctx.params.filename;
  const filePath = `./src/public/uploads/${filename}`;

  try {
    await send(ctx, filePath);
  } catch (error) {
    ctx.status = 404;
    ctx.body = { message: "文件未找到" };
  }
});

export default downloadRouter;
