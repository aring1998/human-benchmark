export const mailFormOptions = [
  {
    label: '邮箱',
    prop: 'email',
    placeholder: '请输入您想找回账号的邮箱'
  }
]

export const mailRules =  {
  email: [
    { required: true, message: '请输入邮箱', trigger: 'blur' },
    { pattern: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, message: '请输入正确的邮箱', trigger: 'blur' }
  ]
}

export const resetFormOptions = [
  {
    label: '验证码',
    prop: 'vCode',
    placeholder: '请输入您刚刚收到的验证码'
  },
  {
    label: '新密码',
    prop: 'newPassword',
    placeholder: '请输入密码，6~32位',
    showPassword: true
  },
  {
    label: '确认密码',
    prop: 'checkPassword',
    placeholder: '请再次输入密码',
    showPassword: true
  }
]

export const resetRules = {
  vCode: [
    { required: true, message: '请输入验证码', trigger: 'blur' },
    { min: 6, max: 6, message: '请输入正确的验证码', trigger: 'blur' }
  ],
  newPassword: [
    { required: true, message: '请输入新密码', trigger: 'blur' },
    { min: 6, max: 32, message: '长度在 6 到 32 个字符', trigger: 'blur' }
  ],
  checkPassword: [{ required: true, message: '请再次输入密码', trigger: 'blur' }]
}