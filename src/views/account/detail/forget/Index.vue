<template>
  <account-card title="找回密码" tips="输入您的帐户电子邮件。我们将向您发送密码重置消息。">
    <account-form
      :formOptions="formOptions"
      :form="form"
      :rules="rules"
      submitName="发送重置密码请求"
      @submit="forget"
      ref="form"
    />
  </account-card>
</template>

<script>
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
    forget() {
      console.log(this.form);
    }
  }
}
</script>

<style>

</style>