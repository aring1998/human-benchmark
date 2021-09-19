# 🎈开发规范

## 🎨命名规范
1. 变量/函数命名，采用小驼峰命名，例：humanBenchmark
2. .vue文件，采用大驼峰，例：GameContent
3. 路由路径，元素class，其他文件，采用横杠命名，例：top-bar
4. 命名要有意义，做到见字知意
5. 禁止采用拼音命名

## ✨新增游戏/测试
1. 打开[首页测试列表信息控制](/src/views/index/config/data.js)
2. 给新游戏选个心怡的[icon](/src/assets/js/iconName.js)（请使用ElementUI中的icon）
3. 无需配置路由模块，首页会自动生成一个对应的游戏入口
4. 按[页面模块目录](#页面模块目录结构)编写代码
5. 编写细则可参阅[开发细则](./dev-game-detail.md)
6. 请不要忘记在[仪表盘](/src/views/dashboard/detail/game-record/)新增对应的游戏记录组件（命名务必保持一致才会自动生成路由）

## 🥓目录结构

### 资源目录结构
```
src
├── assets  # 静态资源
├── pulic  # 项目入口文件
├── components  # 组件
├── router  # 路由模块
├── store  # Vuex仓库
├── uitls  # 方法类
└── views  # 页面
```

### 页面模块目录结构
```
views
├── components  # 存放该模块公用组件
├── config  # 存放静态数据/方法等
├── game  # 存放游戏内容组件
└── Indev.vue  # 页面入口文件
```