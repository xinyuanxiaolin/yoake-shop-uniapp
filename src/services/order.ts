/* 订单相关接口 */

import type { OrderPreResult } from "@/types/order"
import { http } from "@/utils/http"

export const getMemberOrderPreApi = ()=>{
    return http<OrderPreResult>({
        method:'GET',
        url:'/member/order/pre'
    })
}