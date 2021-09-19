<template>
  <account-card title="意见反馈" tips="为了更好的用户体验，请您提出宝贵意见">
    <account-form
      :formOptions="formOptions"
      :form="form"
      :rules="rules"
      @submit="submit"
      ref="form"
    />
  </account-card>
</template>

<script>
import { getFormKeys } from '@/utils/index'
import AccountCard from '../components/AccountCard.vue'
import AccountForm from '../components/AccountForm.vue'
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
    submit() {
      console.log(this.form);
    }
  }
}
</script>

<style>

</style>