<template>
  <div class="footer-bar-wrap">
    <div class="footer-bar">
      <div class="line"></div>
      <p>该站点为开源项目，欢迎开发者访问参考学习</p>
      <p>请尊重知识产权，切勿进行商业用途</p>
      <a href="https://gitee.com/aring1998/human-benchmark" target="_blank">访问项目源码</a>
      <router-link to="/account/opinion">意见反馈</router-link>
      <a class="hide-on-mob" href="http://wpa.qq.com/msgrd?v=3&uin=1303340995&site=qq&menu=yes" target="_blank">联系作者</a>
      <a class="hide-on-pc" href="mqqwpa://im/chat?chat_type=wpa&uin=1303340995&version=1&src_type=web&web_src=http:://wpa.b.qq.com">联系作者</a>
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="scss">
.footer-bar-wrap {
  background-color: #e6e8f4;
  font-size: 12px;
  padding-bottom: 30px;
  .footer-bar {
    display: flex;
    flex-flow: column nowrap;
    max-width: $max-width;
    margin: 0 auto;
    box-sizing: border-box;
    padding: 0 30px;
    .line {
      height: 1px;
      width: 100%;
      margin: 0 auto;
      background-color: #a0a0a080;
      margin-bottom: 20px;
    }
    p {
      color: #a0a0a0;
      text-align: right;
      margin: 4px 0;
    }
    a {
      text-align: right;
      margin: 4px 0;
      text-decoration: none;
      &:hover {
        text-decoration: underline;
      }
    }
  }
}

@media screen and (max-width: 480px) {
  .footer-bar-wrap {
    .footer-bar {
      padding: 0 10px;
    }
  }
}
</style>