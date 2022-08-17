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
    const { data } = await axios.get(
      `https://api.bilibili.com/x/space/arc/search?mid=${mid}&ps=${count}&tid=0&pn=${page}&keyword=&order=pubdate&jsonp=jsonp`
    )
    const list = data.data.list.vlist
    const paging = data.data.page
    ctx.body = { list: list, page: paging }
  }
}
