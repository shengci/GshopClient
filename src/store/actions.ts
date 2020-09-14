// 通过mutation间接更新state的多个方法的对象
import {
  RECEIVE_ADDRESS, RECEIVE_CATEGORYS, RECEIVE_SHOPS, RECEIVE_USER_INFO, RESET_USER_INFO, RECEIVE_INFO, RECEIVE_RATINGS, RECEIVE_GOODS, INCREMENT_FOOD_COUNT,
  DECREMENT_FOOD_COUNT,
  CLEAR_CART,
  RECEIVE_SEARCH_SHOPS
} from './mutation-types'
import { reqFoodCategorys, reqAddress, reqShops, reqUserInfo, reqLogout, reqShopRatings, reqShopGoods, reqShopInfo, reqSearchShop } from '../api'
export default {
  async getAddress({ commit, state }) {
    const geohash = state.latitude + ',' + state.longitude
    const result = await reqAddress(geohash)
    if (result.code === 0) {
      const address = result.data
      commit(RECEIVE_ADDRESS, { address })
    }
  },
  async getCategorys({ commit }) {
    const result = await reqFoodCategorys()
    if (result.code === 0) {
      const categorys = result.data
      commit(RECEIVE_CATEGORYS, { categorys })
    }
  },
  async getShops({ commit, state }) {
    const { longitude, latitude } = state
    const result = await reqShops(longitude, latitude)
    if (result.code === 0) {
      const shops = result.data
      commit(RECEIVE_SHOPS, { shops })
    }
  },

  recordUser({ commit }, userInfo) {
    commit(RECEIVE_USER_INFO, { userInfo })
  },

  async getUserInfo({ commit }) {
    const result = await reqUserInfo()
    if (result.code === 0) {
      const userInfo = result.data
      commit(RECEIVE_USER_INFO, { userInfo })
    }
  },

  async logout({ commit }) {
    const result = await reqLogout()
    if (result.code === 0) {
      commit(RESET_USER_INFO)
    }
  },

  //  异 步 获 取 商 家 信 息
  async getShopInfo({ commit }, cb) {
    const result = await reqShopInfo()
    if (result.code === 0) {
      const info = result.data
      info.score = 3.5
      commit(RECEIVE_INFO, { info })
      cb && cb()
    }
  },

  //  异 步 获 取 商 家 评 价 列 表
  async getShopRatings({ commit }, cb) {
    const result = await reqShopRatings()
    if (result.code === 0) {
      const ratings = result.data
      commit(RECEIVE_RATINGS, { ratings })
      cb && cb()
    }
  },

  //  异 步 获 取 商 家 商 品 列 表
  async getShopGoods({ commit }, callback) {
    const result = await reqShopGoods()
    if (result.code === 0) {
      const goods = result.data
      commit(RECEIVE_GOODS, { goods })
      callback && callback()
    }
  },

  // 同步更新food中的count值
  updateFoodCount({ commit }, { isAdd, food }) {
    if (isAdd) {
      commit(INCREMENT_FOOD_COUNT, { food })
    } else {
      commit(DECREMENT_FOOD_COUNT, { food })
    }
  },

  // 同步清空购物车
  clearCart({ commit }) {
    commit(CLEAR_CART)
  },

  // 异步获取商家商品列表
  async searchShops({ commit, state }, keyword) {
    const geohash = state.latitude + ',' + state.longitude
    const result = await reqSearchShop(geohash, keyword)
    if (result.code === 0) {
      const searchShops = result.data
      commit(RECEIVE_SEARCH_SHOPS, { searchShops })
    }
  }
}
