import type { LoginResult } from "@/types/member"
import { http } from "@/utils/http"

type LoginParams ={
    code:string,
    encryptedData:string,
    iv:string
}
/**
 * 小程序登录 企业认证才能用,个人开发者无法使用
 * @param data 请求参数
 * 
 * @returns 
 */
export const postLoginWxMinApi =(data:LoginParams)=>{
    return http<LoginResult>({
        method:'POST',
        url:'/login/wxMin',
        data,
    })
}

/**
 * 小程序登录_内测版 模拟登录
 * 
 */
export const postLoginWxMinSimpleApi = (phoneNumber:string)=>{
    return http<LoginResult>({
        method:'POST',
        url:'/login/wxMin/simple',
        data:{
            phoneNumber,
        }
    })
}