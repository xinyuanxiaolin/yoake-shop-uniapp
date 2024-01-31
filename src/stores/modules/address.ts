import type { AddressItem } from '@/types/address'
import { defineStore } from 'pinia'
import { ref } from 'vue'

// 定义 Store 为存储之后填写订单要进行地址选择和跳转
export const useAddressStore = defineStore(
  'address',
  () => {
    const selectedAddress =ref<AddressItem>()

    const changeSelectedAddress = (val:AddressItem) =>{
        selectedAddress.value =val
    }

    return {
        selectedAddress,
        changeSelectedAddress
    }
  },
  // TODO: 持久化
//   {
//     //这个为网页端配置
//     // persist: true,
//     persist:{
//       storage:{
//         getItem(key){
//           return uni.getStorageSync(key)

//         },
//         setItem(key,value){
//           uni.setStorageSync(key, value)
//         }
//       }
//     }
//   },
)
