<template>
  <account-card title="找回密码" :tips="tips" v-loading="loading">
    <account-form
      :formOptions="mailFormOptions"
      :form="mailForm"
      :rules="mailRules"
      submitName="发送重置密码请求"
      @submit="sendMail"
      v-if="!sendMailSuc"
    />
    <account-form
      :formOptions="resetFormOptions"
      :form="resetForm"
      :rules="resetRules"
      @submit="reset"
      v-else
    />
  </account-card>
</template>

<script>
import { getFormKeys } from '@/utils/index'
import AccountCard from '../../components/AccountCard.vue'
import AccountForm from '../../components/AccountForm.vue'
import { mailFormOptions, mailRules, resetFormOptions, resetRules } from './config/data'
export default {
  data() {
    return {
      loading: false,
      tips: '输入您的帐户电子邮件。我们将向您发送密码重置消息。',

      mailFormOptions,
      mailRules,
      mailForm: getFormKeys(mailFormOptions),

      resetFormOptions,
      resetRules,
      resetForm: getFormKeys(resetFormOptions),
      sendMailSuc: false
    }
  },
  components: {
    AccountCard,
    AccountForm
  },
  mounted() {
    // 补充确认密码校验规则
    if (this.resetRules.checkPassword.length === 2) this.rules.checkPassword.pop()
    this.resetRules.checkPassword.push({
      validator: (rule, value, callback) => {
        if (value != this.resetForm.newPassword) { callback(new Error('与密码不一致')) }
        callback()
      }, trigger: 'change'
    })
  },
  methods: {
    async sendMail() {
      this.loading = true
      const res = await this.$api.post('mailer/resetMail', {
        ...this.mailForm
      })
      this.loading = false
      if (res.code === 0) this.sendMailSuc = true
    },
    async reset() {
      this.tips = '重置您的密码'
      const res = await this.$api.post('users/resetPassword', {
        ...this.mailForm,
        ...this.resetForm,
        newPassword: md5(this.resetForm.newPassword)
      })
      if (res.code === 0) this.$router.push('/login')
    }
  }
}
</script>

<style>

</style>