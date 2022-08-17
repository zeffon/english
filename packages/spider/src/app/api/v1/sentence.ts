import type { Context } from 'koa'
import axios from 'axios'
import * as cheerio from 'cheerio'
import { description, prefix, request, summary, tags } from 'koa-swagger-decorator'

const tag = tags(['sentence'])

@prefix('/sentence')
export default class SentenceController {
  @request('get', '/height')
  @summary('Get sentence height')
  @description('example: /sentence/height')
  @tag
  async getSentenceHeight(ctx: Context) {
    const { data } = await axios.get('https://dict.eudic.net/home/dailysentence')
    const $ = cheerio.load(data)
    const container = $('div .containter').html()
    // TODO calc container height when window device width is 450px
    ctx.body = 'ok'
  }
}
