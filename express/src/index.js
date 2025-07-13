import express from "express";
const app = express();

// 中间件配置
app.use(express.json()); // 解析 JSON 请求体
app.use(express.urlencoded({ extended: true })); // 解析 URL 编码的请求体

// 跨域配置
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  if (req.method === 'OPTIONS') {
    res.sendStatus(200);
  } else {
    next();
  }
});

// 路由
app.get("/table", (req, res) => {
  console.log(req.query);
  res.send("Hello World");
});
app.post("/table", (req, res) => {
  console.log(req.body);
  /** 获取客户端传进来的参数 */
  const { page, pageSize } = req.body;
  /** 根据参数查询数据库 */
  const list = [];
  for (let i = (page - 1) * pageSize; i < (page) * pageSize; i++) {
    list.push({
      name: "John",
      age: i + 1,
      id: i,
      num: i + 1,
      status: i % 2 === 0 ? "active" : "banned",
    });
  }
  /** 返回数据 */
  res.send({
    code: 200,
    message: "success",
    success: true,
    data: {
      list,
      total: 205,
      page,
      pageSize,
    },
  });
});
app.listen(3000, () => {
  console.log("Server is running on port 3000");
});