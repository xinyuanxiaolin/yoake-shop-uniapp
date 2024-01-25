/* 
    添加拦截器:
        拦截request请求
        拦截uploadFile文件上传


*/

import { useMemberStore } from "@/stores"

//基本请求地址
const baseURL = 'https://pcapi-xiaotuxian-front-devtest.itheima.net'
//添加拦截器
const httpInterceptor ={
    //拦截前触发 
    invoke(options:UniApp.RequestOptions){
        //1.非http开头需拼接地址
        if(!options.url.startsWith('http')){
            options.url = baseURL + options.url
        }
        //2. 请求超时,默认是60s
        options.timeout = 10000
        //3.添加小程序端请求头标识
        options.header = {
            ...options.header,
            'source-client':'miniapp',

        }
        //4.添加token标识符
        const memberStore = useMemberStore()
        const token = memberStore.profile?.token  //在这个代码中，问号 ? 是可选链操作符
        /* 
        这意味着，如果 memberStore.profile 存在且不为 undefined 或 null，那么 token 将
        被赋值为 memberStore.profile.token 的值；如果 memberStore.profile 为 undefined 或 null，
        那么 token 将为 undefined。这样可以避免在访问不存在的属性时引发错误。
        */
       if(token){
        options.header.Authorization = token
       }
       console.log(options);
       
        
    }
}

//给请求添加上拦截器
uni.addInterceptor('request',httpInterceptor)
uni.addInterceptor('uploadFile',httpInterceptor)
