import Koa from "koa"; // 引入 Koa 框架
import bodyParser from "koa-bodyparser"; // 引入解析请求体的中间件
import Database from "./db/index"; // 引入数据库连接模块
import router from "./router"; // 引入路由模块
import serve from "koa-static"; // 引入静态文件服务中间件
import path from "path"; // 引入 path 模块，用于处理文件路径
import koajwt from "koa-jwt"; // 引入 JWT 认证中间件
import websocket from "koa-websocket";
import OpenAI from "openai";

const app = websocket(new Koa());
// -----------
// 配置 Moonshot AI 客户端
const client = new OpenAI({
  apiKey: "sk-fV4Z2grYVGwWTxitQBu4ntwa8Y7ZgZwZsqn3I2p5LJ45FooS",
  baseURL: "https://api.moonshot.cn/v1", // Moonshot API 基础路径
});

// WebSocket 路由
app.ws.use((ctx) => {
  console.log("WebSocket 连接已建立");

  // 初始化上下文消息
  let messages = [
    {
      role: "system",
      content:
        "你是 Kimi，由 Moonshot AI 提供的人工智能助手，你更擅长中文和英文的对话。用户问什么问题,你都阴阳怪气他!",
    },
  ];

  // 监听前端发送的消息
  ctx.websocket.on("message", async (message: any) => {
    const { content } = JSON.parse(message); // 获取用户输入

    // 添加用户输入到上下文消息中
    messages.push({ role: "user", content });

    try {
      // 开启流式输出
      const stream = await client.chat.completions.create({
        model: "moonshot-v1-8k",
        messages: messages as any,
        temperature: 0.3,
        stream: true,
      });

      ctx.websocket.send(JSON.stringify({ reply: "", isStreaming: true }));

      let fullReply = ""; // 用于记录完整回复
      for await (const chunk of stream) {
        const delta = chunk.choices[0]?.delta;
        if (delta?.content) {
          ctx.websocket.send(JSON.stringify({ reply: delta.content }));
          fullReply += delta.content;
        }
      }

      // 将 AI 回复添加到上下文消息中
      messages.push({ role: "assistant", content: fullReply });
    } catch (error) {
      console.error("调用 Moonshot API 出错:", error.message);
      ctx.websocket.send(
        JSON.stringify({ reply: "Kimi 暂时无法回答您的问题，请稍后再试。" }),
      );
    }
  });
});
// -----------
// 配置静态文件服务，将 public/uploads 目录挂载到服务器上
app.use(serve(path.join(__dirname, "public/uploads")));

// 连接数据库
Database.connect();

// 使用 bodyParser 中间件，解析请求体
app.use(bodyParser());

// 配置 JWT 认证中间件，确保用户需要登录才能访问特定路由
app.use(
  koajwt({
    secret: "yq-yq-message-wall-server-jwt", // JWT 密钥
  }).unless({
    path: [
      /^\/auth\/login/,
      /^\/auth\/register/,
      /^\/message\/list/,
    ],
  }),
);

// 配置路由方法的允许类型
app.use(router.allowedMethods());

// 使用定义好的路由
app.use(router.routes());

// 启动服务器，监听 5174 端口
app.listen(5174, () => {
  console.log("Server is running on http://localhost:5174"); // 控制台输出服务器启动信息
});
