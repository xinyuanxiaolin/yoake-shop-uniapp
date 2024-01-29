//个人信息接口

import type { ProfileDetail } from "@/types/member"
import { http } from "@/utils/http"

/**
 * 获取个人信息
 * token值中封装了个人id通过此来获取个人信息
 */
export const getMemberProfileApi = ()=>{
    return http<ProfileDetail>({
        method:'GET',
        url:'/member/profile'
    })
}