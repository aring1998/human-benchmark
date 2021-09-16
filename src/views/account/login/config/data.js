export const formOptions = [
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
  }
]

export const rules = {
  username: [
    { required: true, message: '请输入用户名', trigger: 'blur' },
    { min: 4, max: 32, message: '长度在 4 到 32 个字符', trigger: 'blur' }
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    { min: 6, max: 32, message: '长度在 6 到 32 个字符', trigger: 'blur' }
  ]
}