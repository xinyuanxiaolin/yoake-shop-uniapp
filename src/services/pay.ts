/* 支付相关接口 */

import { http } from "@/utils/http"

/**
 * 获取微信支付参数,返回看微信官方的APi接口返回参数
 * @param data orderId 订单Id
 * @returns 
 */
export const getPayWxPayMiniPayApi =(data:{orderId:string}) =>{
    return http<WechatMiniprogram.RequestPaymentOption>({
        method:'GET',
        url:'/pay/wxPay/miniPay',
        data,
    })
}

/**
 * 模拟支付-开发环境使用
 * @param data orderId 订单Id
 * @returns 
 */
export const getPayMockApi =(data:{orderId:string})=>{
    return http({
        method:'GET',
        url:'/pay/mock',
        data,
    })
}