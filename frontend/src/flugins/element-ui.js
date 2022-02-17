import { Row, Col, Table, TableColumn, Form, FormItem, Button, Input, Progress, Loading, Message   } from 'element-ui'
const element = {
  install: function (Vue) {
    Vue.use(Row)
    Vue.use(Col)
    Vue.use(Table)
    Vue.use(TableColumn)
    Vue.use(Form)
    Vue.use(FormItem)
    Vue.use(Button)
    Vue.use(Input)
    Vue.use(Progress)
    Vue.use(Loading)
    Vue.prototype.$message = Message
  }
}
export default element
