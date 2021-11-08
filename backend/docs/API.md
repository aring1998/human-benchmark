# 接口文档

- **baseurl** `http://81.68.189.158:3000`
- **注册** `post` `/api/users/register`
  - **data** `username` *用户名
  - **data** `password` *密码
  - **data** `email` 邮箱
- **登录** `post` `/api/users/login`
  - **data** `username` *用户名
  - **data** `password` *密码
- **token** `post` `/api/users/token`
  - **Header** `Authorization` *令牌
- **保存分数** `post` `/api/scores/saveScore`
  - **data** `gameId` *游戏id
  - **data** `score` *分数
- **获取游戏统计数据** `get` `/api/scores/getChartData`
  - **query** `gameId` *游戏id
  - **query** `lte` 获取区间的最小值
  - **query** `gte` 获取区间的最大值
- **获取用户最佳分数** `get` `/api/scores/getBestScore`