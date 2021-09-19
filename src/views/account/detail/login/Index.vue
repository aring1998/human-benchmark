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
    login() {
      console.log(this.form);
    }
  }
}
</script>

<style>

</style>