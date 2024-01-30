/* 我的收货地址接口 */

import type { AddressParams } from "@/types/address"
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