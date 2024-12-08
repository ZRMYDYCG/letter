import Router from "koa-router";
import send from "koa-send";

const downloadRouter = new Router();

/**
 * @dencription 文件下载
 * */
downloadRouter.post("/download/:filename", async (ctx: any) => {
  const filename = ctx.params.filename;

  console.log(`download ${filename}`);
  const filePath = `./src/public/uploads/${filename}`;
  ctx.attachment(filePath);
  ctx.body = await send(ctx, filePath);
});

export default downloadRouter;
