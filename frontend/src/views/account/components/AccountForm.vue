<template>
  <div class="account-form">
    <el-form :model="form" :rules="rules" ref="form" @submit.native.prevent>
      <el-form-item
        v-for="(item, index) of formOptions" :key="index"
        :label="item.label"
        :prop="item.prop"
      >
        <el-input v-model="form[item.prop]" :type="item.type" :show-password="item.showPassword" :placeholder="item.placeholder"></el-input>
      </el-form-item>
      <el-form-item>
        <button type="button" @click="checkForm">{{ submitName }}</button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  props: {
    // 表单数据
    form: Object,
    // 表单校验规则
    rules: Object,
    // 表单配置项（如label、placeholder等）
    formOptions: Array,
    // 提交按钮名称
    submitName: {
      type: String,
      default: '提交'
    }
  },
  created() {
    document.addEventListener('keydown', this.onEnter)
    // 在销毁前钩子清除document监听事件以防影响其他组件
    this.$once('hook:beforeDestroy', () => { document.removeEventListener('keydown', this.onEnter, false) })
  },
  methods: {
    checkForm() {
      this.$refs.form.validate((valid) => {
        if (valid) this.$emit('submit')
        else return false
      })
    },
    onEnter(e) {
      if (e.key === 'Enter') this.checkForm()
    }
  }
}
</script>

<style lang="scss">
.account-form {
  padding: 30px 280px;
  .el-form-item__label {
    font-size: 20px;
  }
  .el-input__inner {
    font-size: 16px;
  }
  .el-textarea__inner {
    font-size: 16px;
  }
  button {
    appearance: none;
    border-image: initial;
    cursor: pointer;
    padding: 12px;
    background: rgb(77, 155, 240);
    border: none;
    border-bottom: 4px solid rgb(30, 129, 236);
    color: white;
    width: 100%;
    border-radius: 4px;
    font-size: 16px;
    &:hover {
      background: rgb(30, 129, 236);
      border-bottom: 4px solid rgb(19, 106, 200);
    }
  }
}
@media screen and (max-width: 480px) {
  .account-form {
    padding: 30px 15px;
  }
}
</style>