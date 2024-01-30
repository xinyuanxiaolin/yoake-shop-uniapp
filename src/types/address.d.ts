/* 收货地址类型声明 */

/**添加收货地址 */
export type AddressParams = {
    /**收货人姓名 */
    receiver:string
    /**联系方式 */
    contact:string
    /**所在省份编码 */
    provinceCode:string
    /**市对应编码 */
    cityCode:string
    /**区/县对应编码 */
    countyCode:string
    /** 收货人详细地址*/
    address:string
    /**是否设置为默认地址（数值类型） 1是 0否 */
    isDefault:number
}

/** 收货地址项 */
export type AddressItem =AddressParams &{

    /** 收货地址 id */
    id: string
    /** 省市区 */
    fullLocation: string
  }