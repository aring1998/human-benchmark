# 开发游戏细则

## Index.vue文件
```html
### template 部分 ###
<template>
  <!-- pages类名能帮助您铺设好页面背景色和设定好相关的边距 -->
  <div class="pages">
    <!-- 
      chartOptions 图标配置: 传入echart图标相关的配置，一般采用平滑折线图
      aboutText 关于测试文本: 即简单介绍您的测试，写做数组格式，每个逗号用以分段落
     -->
    <base-layout :aboutText="aboutText">
      <!-- 
        这是游戏第一次打开时展示的界面
          一般情况下点击开始后，隐藏当前GameIntro组件，使用动态组件，即下文v-show部分
      -->
      <game-intro 
        slot="wrap"
        title="这里是游戏名"
        intro="这里是游戏玩法简介"
        v-show="componentName === ''"
        @start="componentName = '这里配置第一次打开的动态组件名'"
      />
      <!-- 
        动态组件
          用以游戏界面的切换
          在游戏界面通过`this.$parent.$parent.componentName = 'xxx'`切换界面
      -->
      <component
        slot="wrap"
        :is="componentName"
      ></component>
    </base-layout>
  </div>
</template>
```
``` javascript
### script 部分 ###
// 引入公用的页面布局组件
import BaseLayout from '@/components/BaseLayout.vue'
import GameIntro from '@/components/GameIntro.vue'
// 引入./game中的游戏内容
import GameContent from './game/GameContent.vue'
import Result from './game/Result.vue'
// 引入./config中的配置数据
import { aboutText } from './config/data'

export default {
  data() {
    return {
      aboutText,
      componentName: '',
      // 接下来此处一般存储游戏公用数据部分，如；level, score等
      level: 1
    }
  },
  components: {
    BaseLayout,
    GameIntro,
    GameContent,
    Result
  }
}
```

## config文件夹
```javascript
/**
 * data.js
 * 这里主要用于存储配置数据，通过导入/导出进行模块划分避免冗余代码
 */
export const exportData = 'Hellow World'
export const choiceLevel = (level) => {
  if (level > 10) return '更高难度'
}
```

## game文件夹
```javascript
/**
 * xxx.vue
 * 这里会存储整个游戏的核心部分
 * 此处建议自行阅读源码了解到更多相关组件的用法，避免冗余代码
 */
```