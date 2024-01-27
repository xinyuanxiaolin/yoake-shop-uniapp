/* 
    添加拦截器:
        拦截request请求
        拦截uploadFile文件上传


*/

import { useMemberStore } from "@/stores"

//基本请求地址
const baseURL = 'https://pcapi-xiaotuxian-front-devtest.itheima.net'
//添加拦截器
const httpInterceptor = {
    //拦截前触发 
    invoke(options: UniApp.RequestOptions) {
        //1.非http开头需拼接地址
        if (!options.url.startsWith('http')) {
            options.url = baseURL + options.url
        }
        //2. 请求超时,默认是60s
        options.timeout = 10000
        //3.添加小程序端请求头标识
        options.header = {
            ...options.header,
            'source-client': 'miniapp',

        }
        //4.添加token标识符
        const memberStore = useMemberStore()
        const token = memberStore.profile?.token  //在这个代码中，问号 ? 是可选链操作符
        /* 
        这意味着，如果 memberStore.profile 存在且不为 undefined 或 null，那么 token 将
        被赋值为 memberStore.profile.token 的值；如果 memberStore.profile 为 undefined 或 null，
        那么 token 将为 undefined。这样可以避免在访问不存在的属性时引发错误。
        */
        if (token) {
            options.header.Authorization = token
        }
        // console.log(options)


    }
}

//给请求添加上拦截器
uni.addInterceptor('request', httpInterceptor)
uni.addInterceptor('uploadFile', httpInterceptor)


/* 
    Promise封装类型封装,返回值会根据要求的类型返回相对的类型,通过泛型去实现
*/
//自己封装一个返回结果类型
interface Data<T> {
    code: string,
    msg: string,
    result: T
}
//2.2按严格开发规范,返回类型也要统一,这边来指定泛型
export const http = <T>(options: UniApp.RequestOptions) => {
    //1.返回Promise对象
    return new Promise<Data<T>>((resolve, reject) => {
        uni.request({
            ...options,
            //2.请求成功
            success(res) {
                //成功响应2xx类型返回有效数据
                if (res.statusCode >= 200 && res.statusCode < 300) {
                    //2.1提取核心数据 res.data
                    //ts类型断言as 转化下类型
                    resolve(res.data as Data<T>)
                }
                else if (res.statusCode === 401) {
                    //401错误  清理用户信息,跳转到登录页
                    const memberStore = useMemberStore()
                    memberStore.clearProfile()
                    //小程序跳转页面使用
                    uni.navigateTo({ url: '/pages/login/login' })
                    reject(res)
                }
                else {
                    //这边就是其他错误报错,根据后端返回信息进行提示
                    uni.showToast({
                        icon: 'none',
                        title: (res.data as Data<T>).msg || "请求错误"
                    })
                    reject(res)
                }


            },
            //响应失败  大多网络问题
            fail(err) {
                uni.showToast({
                    title: '网络错误,请查看本地网络是否已连接!',
                    icon: 'none',
                });
                reject(err)
            }
        })
    })
}