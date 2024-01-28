import type { PageParams } from "@/types/global"
import type { HotResult } from "@/types/hot"
import { http } from "@/utils/http"

/** 通用热门推荐
 * 
 */
type HotPageParams = PageParams &{subType?:string}
export const getHotRecommendApi = (url:string,data?:HotPageParams)=>{
    return http<HotResult>({
        method:'GET',
        url,
        data,

    })
}