/**
 * 组合式函数存放地址,(类似vue2中minxins的用法)
 */

import type { CxGuessInstance } from "@/components/components"
import { ref } from "vue"


/**
 * 猜你喜欢的组合式函数
 * @returns   guessRef,onScrolltolower
 */
export const useGuessList = () => {
    //获取猜你喜欢实例
    const guessRef = ref<CxGuessInstance>()

    //滚动触底事件
    const onScrolltolower = () => {
        // console.log('xx');
        guessRef.value?.getMore()

    }
    //返回ref和事件处理函数
    return{
        guessRef,
        onScrolltolower
    }
}