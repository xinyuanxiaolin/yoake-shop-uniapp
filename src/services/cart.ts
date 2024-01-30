/* 购物车相关接口 */
import { http } from '@/utils/http'
import type {CartItem} from '@/types/cart'
/**
 * 加入购物车
 * @param data 请求体参数
 */
export const postMemberCartAPI = (data: { skuId: string; count: number }) => {
  return http({
    method: 'POST',
    url: '/member/cart',
    data,
  })
}

/**
 * 获取购物车列表
 * 
 */
export const getMemberCartAPI = () => {
    return http<CartItem[]>({
      method: 'GET',
      url: '/member/cart',
      
    })
  }

/**
 * 删除购物车单品/清空购物车
 * @param data 
 * @returns 
 */
export const deleteMemberCartApi = (data:{ids:string[]}) =>{
    return http({
      method:'DELETE',
      url:'/member/cart',
      data,
    })
}

/**
 * 修改购物单品
 * @param skuId 
 * @param data selected 选中状态 count 商品数量
 * @returns 
 */
export const putMemberCartBySkuIdApi = (skuId:string,data:{selected?:boolean,count?:number})=>{
  return http({
    method:'PUT',
    url:`/member/cart/${skuId}`,
    data,
  })
}
  

/**
 * 购物车全选/取消全选
 * @param data selected 是否选择
 * @returns 
 */
export const putMemberCartSelectApi = (data:{selected:boolean})=>{
  return http({
    method:'PUT',
    url:'/member/cart/selected',
    data,
  })
}