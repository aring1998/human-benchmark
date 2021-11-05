<template>
  <account-card title="注册" tips="已有账号？" path="/account/login" linkName="登录">
    <account-form
      :formOptions="formOptions"
      :form="form"
      :rules="rules"
      submitName="注册"
      @submit="register"
      ref="form"
    />
  </account-card>
</template>

<script>
import md5 from 'js-md5'
import { getFormKeys } from '@/utils/index'
import AccountCard from '../../components/AccountCard.vue'
import AccountForm from '../../components/AccountForm.vue'
import { formOptions, rules } from './config/data'
export default {
  data() {
    return {
      formOptions,
      rules,
      form: getFormKeys(formOptions)
    }
  },
  components: {
    AccountCard,
    AccountForm
  },
  mounted() {
    // 补充确认密码校验规则
    this.rules.checkPassword.push({
      validator: (rule, value, callback) => {
        console.log(value, this.form.password);
        if (value != this.form.password) { callback(new Error('与密码不一致')) }
        callback()
      }, trigger: 'change'
    })
  },
  methods: {
    async register() {
      console.log(this.form)
      const res = await this.$api.post('users/register', {
        ...this.form,
        password: md5(this.form.password)
      })
    }
  }
}
</script>

<style>

</style>