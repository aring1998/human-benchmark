import { gameList } from "@/views/index/config/data"

export const tableData = gameList.map(item => {
  return {
    id: item.id,
    title: item.title,
    path: item.path,
    score: '?',
    percentile: 0
  }
})