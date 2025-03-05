<template>
  <div class="advert-wrap">
    <div class="advert">
      <div class="ads-ins-wrap">
        <ins
          v-if="loadAds"
          ref="ins"
          class="adsbygoogle"
          style="display: block; text-align: center"
          :style="insStyle"
          data-ad-client="ca-pub-8392242971317209"
          :data-ad-slot="$props.adsId"
          v-bind="$attrs"
        ></ins>
      </div>
    </div>
  </div>
</template>

<script>
import { isPc, renderGoogleAds } from '@/utils'

export default {
  data() {
    return {
      loadAds: false,
      insStyle: '',
    }
  },
  props: {
    adsId: {
      type: String,
      default: '2638130455',
    },
    commonInsStyle: String | Object,
    pcInsStyle: String | Object,
    mobInsStyle: String | Object,
    pcAttrs: Object,
    mobAttrs: Object,
  },
  mounted() {
    const intersectionObserver = new IntersectionObserver((entries) => {
      entries.forEach(async (entry) => {
        // 如果目标元素可见
        if (entry.isIntersecting) {
          this.loadAds = true
          await this.$nextTick()
          const { commonInsStyle, pcInsStyle, mobInsStyle, pcAttrs, mobAttrs } = this.$props
          if (isPc()) {
            this.insStyle = commonInsStyle || pcInsStyle
            for (const key in pcAttrs) {
              this.$refs.ins.setAttribute(key, pcAttrs[key])
            }
          } else {
            this.insStyle = commonInsStyle || mobInsStyle
            for (const key in mobAttrs) {
              this.$refs.ins.setAttribute(key, mobAttrs[key])
            }
          }
          intersectionObserver.disconnect()
          this.$emit('seen')
          await this.$nextTick()
          renderGoogleAds()
        }
      })
    })
    intersectionObserver.observe(this.$el)
  },
}
</script>

<style lang="scss" scoped>
.advert-wrap {
  margin: 20px auto;
}
</style>
