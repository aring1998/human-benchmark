import { gameList } from "@/views/index/config/data"

export const tableData = gameList.map(item => {
  return {
    title: item.title,
    path: item.path,
    score: '?',
    percentile: 0
  }
})