import APIFunction from '../services/index'
import { deepClone } from '../utils/utils'

class QList {
  qlist = []
  info = {
    page: 1,
    hasMore: true,
    offset: undefined,
    count: 10,
    total: 0
  }

  constructor (apiKey) {
    this.apiKey = apiKey
  }

  /**
   * @description 获取list列表
   */
  async getList (params = {}) {
    const { info, apiKey } = this
    if (!info.hasMore || !apiKey) return
    const option = Object.assign(params, {
      page: params.page || info.page,
      offset: info.offset,
      count: info.count
    })
    const res = await APIFunction[apiKey](option)
    const { data } = res
    this.info.page = params.page || info.page
    this.info.hasMore = data.has_more
    this.info.offset = data.next_offset
    this.info.total = data.total
    this.qlist = data.objects

    return {
      info: deepClone(this.info),
      qlist: this.qlist.concat([])
    }
  }
}

export default QList

