/*  主页接口封装 */
import type { BannerItem, CategoryItem, HotItem } from '@/types/home';
import { http } from '@/utils/http';

/** 首页-广告区域-小程序
    distributionSite 1为首页 2为分类商品页
*/
export const getHomeBannerApi = (distributionSite = 1) => {
    return http<BannerItem[]>({
        method: 'GET',
        url: '/home/banner',
        data: {
            distributionSite,
        }
    })
}


/** 首页-前台分类-小程序

*/
export const getHomeCategoryApi = () => {
    return http<CategoryItem[]>({
        method: 'GET',
        url: '/home/category/mutli'
    })
}

/** 首页-热门推荐-小程序

*/
export const getHomeHotApi = () => {
    return http<HotItem[]>({
        method: 'GET',
        url: '/home/hot/mutli'
    })
}


