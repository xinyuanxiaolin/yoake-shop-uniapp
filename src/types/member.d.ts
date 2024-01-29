/** 小程序登录 登录用户信息 */
export type LoginResult = {
    /** 用户ID */
    id: number
    /** 头像  */
    avatar: string
    /** 账户名  */
    account: string
    /** 昵称 */
    nickname?: string
    /** 手机号 */
    mobile: string
    /** 登录凭证 */
    token: string
  }

  /** 个人信息 用户详情信息 */
export type ProfileDetail = {
  /** 用户ID */
  id: number
  /** 头像  */
  avatar: string
  /** 账户名  */
  account: string
  /** 昵称 */
  nickname?: string
  /** 性别 */
  gender?: Gender
  /** 生日 */
  birthday?: string
  /** 省市区 */
  fullLocation?: string
  /** 职业 */
  profession?: string
}
/** 性别 */
export type Gender = '女' | '男'

/**
 * 个人信息 修改信息
 */
//Pick 是一个内置的工具类型（Utility Type），用于从给定的类型中选取部分属性，然后生成一个新的类型。
export type ProfileParams =Pick<ProfileDetail,'nickname'|'gender'|'birthday'|'profession'>&{
  /** 省份编码 */
  provinceCode?: string
  /** 城市编码 */
  cityCode?: string
  /** 区/县编码 */
  countyCode?: string
}