<template>
  <div class="dashboard-nav-bar hide-on-mob">
    <div class="icon-wrap"
      v-for="(item, index) of gameList"
      :key="index"
      @click="$router.push({
        path: '/dashboard/game-record',
        query: {
          gameId: item.id
        }
      })"
      :class="{ 'active': $route.query.gameId == item.id }"
    >
      <i :class="item.icon"></i>
    </div>
  </div>
</template>

<script>
import { gameList } from '@/views/index/config/data'
export default {
  data() {
    return {
      gameList
    }
  }
}
</script>

<style lang="scss">
.dashboard-nav-bar {
  width: 110px;
  height: 100%;
  padding: 30px;
  box-sizing: border-box;
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
  // justify-content: space-between;
  background-color: #fff;
  border-radius: 5px;
  box-shadow: $shadow;
  flex-shrink: 0;
  margin-right: 20px;
  .icon-wrap {
    height: 60px;
    width: 60px;
    margin-bottom: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    &.active {
      i {
        color: $hover-color;
        cursor: initial;
        pointer-events: none;
      }
    }
    i {
      color: $light-main-color;
      font-size: 60px;
      cursor: pointer;
      &:hover {
        color: $hover-color;
      }
    }
    &:nth-last-child(1) {
      margin-bottom: 0;
    }
  }
}
</style>