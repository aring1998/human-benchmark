import { gameList } from "@/views/index/config/data"
import { deepCloneObjArr } from "@/utils/index"

const tableData = deepCloneObjArr(gameList)
for (let i of tableData) {
  i.score = '?'
  i.percentile = 0
}
export { tableData }