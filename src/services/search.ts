//搜索列表接口

import { http } from '@/utils/http'
import type { SearchListResult, SearchParams } from '@/types/search'

/** 获取搜索列表数据 */
export const getSearchListApi = (data: SearchParams) => {
  return http<SearchListResult>({
    method: 'GET',
    url: '/goods/list',
    data,
  })
}
