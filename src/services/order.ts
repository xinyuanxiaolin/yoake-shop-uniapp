/* 订单相关接口 */

import type { OrderPreResult } from "@/types/order"
import { http } from "@/utils/http"

/**
 * 填写订单-获取预付订单
 * @returns 
 */
export const getMemberOrderPreApi = ()=>{
    return http<OrderPreResult>({
        method:'GET',
        url:'/member/order/pre'
    })
}

/**
 * 填写订单-获取直接购买订单
 * @param data skuId  count 数量 addressId 下单时确认好的地址Id(非必填)
 * @returns 
 */
export const getMemberOrderPreNowApi =(data:{
    skuId:string,
    count:string,
    addressId?:string
})=>{
    return http<OrderPreResult>({
        method:'GET',
        url:'/member/order/pre/now',
        data,
    })
}

