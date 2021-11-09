export const formOptions = [
  {
    label: '旧密码',
    prop: 'oldPassword',
    placeholder: '请输入您的旧密码',
    showPassword: true
  },
  {
    label: '新密码',
    prop: 'newPassword',
    placeholder: '请输入您的新密码',
    showPassword: true
  },
  {
    label: '确认密码',
    prop: 'checkPassword',
    placeholder: '请再次输入密码',
    showPassword: true
  }
]

export const rules =  {
  oldPassword: [
    { required: true, message: '请输入旧密码', trigger: 'blur' },
    { min: 6, max: 32, message: '长度在 6 到 32 个字符', trigger: 'blur' }
  ],
  newPassword: [
    { required: true, message: '请输入新密码', trigger: 'blur' },
    { min: 6, max: 32, message: '长度在 6 到 32 个字符', trigger: 'blur' }
  ],
  checkPassword: [{ required: true, message: '请再次输入密码', trigger: 'blur' }]
}