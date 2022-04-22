<template>
  <account-card title="登录" tips="还未注册？" path="/account/register" linkName="注册">
    <account-form
      :formOptions="formOptions"
      :form="form"
      :rules="rules"
      submitName="登录"
      @submit="login"
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
  methods: {
    async login() {
      const res = await this.$api.post('users/login', {
        ...this.form,
        password: md5(this.form.password)
      })
      if (res.code === 0) {
        window.localStorage.setItem('human-benchmark-token', res.data.token)
        this.$store.state.userInfo = res.data
        this.$router.push('/dashboard')
      }
    }
  }
}
</script>

<style>

</style>