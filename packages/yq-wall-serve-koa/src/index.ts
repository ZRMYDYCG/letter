import Koa from "koa"; // 引入 Koa 框架
import bodyParser from "koa-bodyparser"; // 引入解析请求体的中间件
import Database from "./db/index"; // 引入数据库连接模块
import router from "./router"; // 引入路由模块
import serve from "koa-static"; // 引入静态文件服务中间件
import path from "path"; // 引入 path 模块，用于处理文件路径
import koajwt from "koa-jwt"; // 引入 JWT 认证中间件

const app = new Koa(); // 创建一个 Koa 应用实例

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
    path: [/^\/auth\/login/, /^\/auth\/register/], // 允许访问的路径，不需要认证
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
