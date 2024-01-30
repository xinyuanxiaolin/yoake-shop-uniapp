/* 我的收货地址接口 */

import type { AddressItem, AddressParams } from "@/types/address"
import { http } from "@/utils/http"

/**
 * 添加收货地址
 * @param data 
 * @returns 
 */
export const addAddressApi = (data:AddressParams) =>{
    return http({
        method:'POST',
        url:'/member/address',
        data,
    })
}

/**
 * 获取收货地址列表
 * @returns 
 */
export const addressListApi = () =>{
    return http<AddressItem[]>({
        method:'GET',
        url:'/member/address'
    })
}

/**
 * 获取收货地址详情
 * @param id 收货地址id 路径拼接
 * @returns 
 */
export const addressListDetailApi = (id:string)=>{
    return http<AddressItem>({
        method:'GET',
        url:`/member/address/${id}`,
    })
}

/**
 * 更新收货地址
 * @param id 需要更新地址的 id 路径拼接
 * @returns 
 */
export const putAddressByIdApi = (id:string,data:AddressParams)=>{
    return http({
        method:'PUT',
        url:`/member/address/${id}`,
        data,
    })
}