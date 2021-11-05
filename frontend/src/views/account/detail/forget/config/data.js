export const formOptions = [
  {
    label: '邮箱',
    prop: 'email',
    placeholder: '请输入您想找回账号的邮箱'
  }
]

export const rules =  {
  email: [
    { required: true, message: '请输入邮箱', trigger: 'blur' },
    { pattern: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, message: '请输入正确的邮箱', trigger: 'blur' }
  ]
}