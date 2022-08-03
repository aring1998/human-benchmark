import {
  Row,
  Col,
  Table,
  TableColumn,
  Form,
  FormItem,
  Button,
  Input,
  Progress,
  Dialog,
  Carousel,
  CarouselItem,
  Image,
  Badge,
  Loading,
  Message
} from 'element-ui'
const element = {
  install: function(Vue) {
    Vue.use(Row)
    Vue.use(Col)
    Vue.use(Table)
    Vue.use(TableColumn)
    Vue.use(Form)
    Vue.use(FormItem)
    Vue.use(Button)
    Vue.use(Input)
    Vue.use(Progress)
    Vue.use(Dialog)
    Vue.use(Carousel)
    Vue.use(CarouselItem)
    Vue.use(Image)
    Vue.use(Badge)
    Vue.use(Loading)
    Vue.prototype.$message = Message
  }
}
export default element
