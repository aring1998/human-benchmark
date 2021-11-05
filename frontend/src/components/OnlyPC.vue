<template>
  <div class="common-wrap hide-on-pc">
    <div class="only-pc">该测试旨在台式电脑和笔记本电脑上进行（或者您可以尝试将您的浏览器窗口变大）</div>
    <button class="common-btn" @click="$router.go(-1)">点击返回</button>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="scss">
.only-pc {
  background-color: rgb(255, 204, 153);
  font-size: 18px;
  color: #333;
  border-radius: 10px;
  width: 75%;
  padding: 20px;
  margin-bottom: 30px;
}
</style>