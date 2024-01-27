/*  主页接口封装 */
import type { BannerItem } from '@/types/home';
import {http} from '@/utils/http';

/* 首页-广告区域-小程序
    distributionSite 1为首页 2为分类商品页
*/
export const getHomeBannerApi = (distributionSite = 1) => {
    return http<BannerItem[]>({
        method:'GET',
        url:'/home/banner',
        data:{
            distributionSite,
        }
    })
}


