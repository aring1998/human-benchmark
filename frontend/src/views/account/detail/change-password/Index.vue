<template>
  <account-card title="修改密码" tips="通过您的旧密码验证并修改您的密码">
    <account-form
      :formOptions="formOptions"
      :form="form"
      :rules="rules"
      @submit="changePassword"
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
    if (this.rules.checkPassword.length === 2) this.rules.checkPassword.pop()
    this.rules.checkPassword.push({
      validator: (rule, value, callback) => {
        if (value != this.form.newPassword) { callback(new Error('与密码不一致')) }
        callback()
      }, trigger: 'change'
    })
  },
  methods: {
    async changePassword() {
      const res = await this.$api.post('users/changePassword', {
        ...this.form,
        oldPassword: md5(this.form.oldPassword),
        newPassword: md5(this.form.newPassword)
      })
      if (res.code === 0) {
        for (let key in this.$store.state.userInfo) {
          this.$store.state.userInfo[key] = ''
        }
        this.$router.push('/account/login')
      }
    }
  }
}
</script>

<style>

</style>