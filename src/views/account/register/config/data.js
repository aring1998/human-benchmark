export const formOptions = [
  {
    label: '邮箱',
    prop: 'email',
    placeholder: '仅用于找回密码'
  },
  {
    label: '用户名',
    prop: 'username',
    placeholder: '请输入用户名，4~32位'
  },
  {
    label: '密码',
    prop: 'password',
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

export const rules = {
  email: [
    { required: true, message: '请输入邮箱', trigger: 'blur' },
    { pattern: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, message: '请输入正确的邮箱', trigger: 'blur' }
  ],
  username: [
    { required: true, message: '请输入用户名', trigger: 'blur' },
    { min: 4, max: 32, message: '长度在 4 到 16 个字符', trigger: 'blur' }
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    { min: 6, max: 32, message: '长度在 6 到 32 个字符', trigger: 'blur' }
  ],
  checkPassword: [{ required: true, message: '请再次输入密码', trigger: 'blur' }]
}
