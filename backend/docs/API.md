# 接口文档

- **baseurl** `http://81.68.189.158:3000`

## 用户

- **注册** `post` `/api/users/register`
  - **data** `username` *用户名
  - **data** `password` *密码
  - **data** `email` 邮箱

- **登录** `post` `/api/users/login`
  - **data** `username` *用户名
  - **data** `password` *密码

- **token** `post` `/api/users/token`
  - **Header** `Authorization` *令牌

- **修改密码** `post` `api/users/changePassword`
  - **oldPassword** *旧密码
  - **newPassword** *新密码

- **重置密码** `post` `api/users/resetPassword`
  - **vCode** *验证码
  - **newPassword** *新密码


## 游戏分数

- **保存分数** `post` `/api/scores/saveScore`
  - **data** `gameId` *游戏id
  - **data** `score` *分数

- **获取游戏统计数据** `get` `/api/scores/getChartData`
  - **query** `gameId` *游戏id
  - **query** `lte` 获取区间的最小值
  - **query** `gte` 获取区间的最大值

- **获取用户最佳分数及对应百分位** `get` `/api/scores/getBestScore`
  - **query** `gameCount` 游戏总量
  - **query** `gameId` 游戏Id,如若传该值,则仅返回对应游戏的最佳分数

## 邮件

- **发送意见反馈** `post` `api/mailer/feedback`
  - **data** `qq` QQ号
  - **data** `opnion` *意见反馈

- **发送重置密码验证码** `post` `api/mailer/resetMail`
  - **data** `email` *邮箱
