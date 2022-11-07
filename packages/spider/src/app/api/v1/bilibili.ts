import type { Context } from 'koa'
import axios from 'axios'
import { description, prefix, query, request, summary, tags } from 'koa-swagger-decorator'

const audioSchema = {
  page: { type: 'number', required: false, default: 1 },
  count: { type: 'number', required: false, default: 30 },
  mid: { type: 'string', required: false, default: '131058159' }
}

const tag = tags(['bilibili'])

@prefix('/bilibili')
export default class SentenceController {
  @request('get', '/audio')
  @summary('Get bilibili ')
  @description('example: /bilibili/audio')
  @tag
  @query(audioSchema)
  async bilibiliAudioList(ctx: Context) {
    const page = ctx.query.page
    const count = ctx.query.count
    const mid = ctx.query.mid
    const url = `https://api.bilibili.com/x/space/arc/search?mid=${mid}&ps=${count}&tid=0&pn=${page}&keyword=&order=pubdate&order_avoided=true&jsonp=jsonp`
    const { data } = await axios.get(url, {
      headers: {
        'User-Agent':
          'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.9; rv:32.0) Gecko/20100101 Firefox/32.0'
      }
    })
    const code = data.code
    const message = data.message
    let list = []
    let paging = { count: 0, pn: 1, ps: 30 }
    if (code === 0) {
      list = data.data.list.vlist
      paging = data.data.page
    }
    ctx.body = { code, message, list, paging }
  }
}
