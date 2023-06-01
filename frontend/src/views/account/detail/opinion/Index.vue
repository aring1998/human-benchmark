<template>
  <account-card title="意见反馈" tips="若您遇到问题或是有一些建议，欢迎您在此提出" v-loading="loading">
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
import AccountCard from '../../components/AccountCard.vue'
import AccountForm from '../../components/AccountForm.vue'
import { formOptions, rules } from './config/data'
export default {
  data() {
    return {
      formOptions,
      rules,
      loading: false,
      form: getFormKeys(formOptions)
    }
  },
  components: {
    AccountCard,
    AccountForm
  },
  methods: {
    async submit() {
      this.loading = true
      const res = await this.$api.post('mailer/feedback', {
        ...this.form
      })
      this.loading = false
      if (res.code === 0) {
        for (let key in this.form) {
          this.form[key] = ''
        }
      }
    }
  }
}
</script>

<style>

</style>