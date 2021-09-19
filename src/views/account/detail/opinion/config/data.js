export const formOptions = [
  {
    label: 'QQ号',
    prop: 'qq',
    placeholder: '请输入您的QQ号以方便我联系到您'
  },
  {
    label: '意见反馈',
    type: 'textarea',
    prop: 'opinion',
    placeholder: '在此输入您对该站点的意见或建议'
  }
]

export const rules =  {
  qq: [
    { pattern: /^[1-9][0-9]{4,9}$/gim, message: '请输入正确的QQ', trigger: 'blur' }
  ],
  opinion: [
    { required: true, message: '请输入QQ', trigger: 'blur' },
    { min: 15, message: '请至少输入15字', trigger: 'blur' },
    { max: 500, message: '输入文本已达上限', trigger: 'blur' }
  ]
}