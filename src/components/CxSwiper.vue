<script setup lang="ts">
import type { BannerItem } from '@/types/home';
import {ref} from 'vue'
/* data */
const activeIndex = ref(0)
/* method */
// 这里利用到了UniHelper这个插件,他帮助我们快速确定uni相关类型,防止any报错
const onChange:UniHelper.SwiperOnChange = (e) =>{
  //根据滑动变换下标
  //!为非空断言,给主观上知道这是一定非空的(可能大型项目怕出问题看不到,上面都写了有值了就是了)
  activeIndex.value = e.detail!.current;
}

//定于props接收父节点传值
defineProps<{
  list: BannerItem[]
}>()

</script>

<template>
  <view class="carousel">
    <swiper :circular="true" :autoplay="false" :interval="3000" @change="onChange">
      <swiper-item v-for="item in list" :key="item.id">
        <navigator url="/pages/index/index" hover-class="none" class="navigator">
          <image
            mode="aspectFill"
            class="image"
            :src="item.imgUrl"
          ></image>
        </navigator>
      </swiper-item>
    </swiper>
    <!-- 指示点 -->
    <view class="indicator">
      <text
        v-for="(item, index) in list"
        :key="item.id"
        class="dot"
        :class="{ active: index === activeIndex }"
      ></text>
    </view>
  </view>
</template>

<style lang="scss">
@import '@/components/styles/CxSwiper.scss';
</style>