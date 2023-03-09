# 初试题目

## 说明
后端：mysql8+、springboot、mybatis

前端：vue3、pinia、element-plus、vite

服务器：docker、Nginx
[演示地址：http://101.33.209.174](http://101.33.209.174)

serve文件夹是后端项目

ui文件夹是前端项目
## 如何运行

前端

```
# 克隆到本地
git clone https://github.com/fkomorebi/boss.git

# 进入文件夹
cd /boss/ui

# 安装依赖
pnpm install

# 开启本地服务器localhost:8081
pnpm dev

# 发布环境
pnpm build

```

后端

创建数据库，名为user_info，再执行sql文件下的sql脚本导入数据
