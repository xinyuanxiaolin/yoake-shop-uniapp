/* 搜素列表封装类型 */

/** 搜索时数据类型 */
export type SearchParams = {
  /** 当前页码 */
  pageNum: number
  /** 页尺寸 */
  pageSize: number
  /** 搜索框内容 */
  searchText: string
}

/**返回搜索列表的数据类型 */
export type SearchListResult = {
  /** 总记录数 */
  total: number
  /** 当前页码 */
  pageNum: number
  /** 总页数 */
  pages: number
  /** 页尺寸 */
  pageSize: number
  /**商品列表*/
  list: searchGoods[]
}

/** 搜索返回的单个商品详情 */
export type SearchGoods = {
  /** 商品id*/
  id: number
  /** 二级分类id*/
  parentId: number
  /** 图片*/
  picture: string
  /** 商品名字*/
  name: string
  /** 商品分类*/
  category: string
  /** 现价*/
  nowPrice: number
  /** 原价*/
  price: number
  /** 库存*/
  stock: number
  /** desc描述*/
  desc: string
}
