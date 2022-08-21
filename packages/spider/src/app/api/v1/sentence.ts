import type { Context } from 'koa'
import { description, prefix, request, summary, tags } from 'koa-swagger-decorator'
import puppeteer from 'puppeteer'

const tag = tags(['sentence'])

@prefix('/sentence')
export default class SentenceController {
  @request('get', '/height')
  @summary('Get sentence height')
  @description('example: /sentence/height')
  @tag
  async getSentenceHeight(ctx: Context) {
    const browser = await puppeteer.launch({
      headless: false,
      defaultViewport: {
        width: 500,
        height: 2000
      }
    })
    const page = await browser.newPage()
    await page.goto('https://dict.eudic.net/home/dailysentence')
    let height = 0
    height = await page.evaluate(() => {
      height = document.getElementsByClassName('containter')[0].clientHeight
      return height
    })
    await browser.close()
    ctx.body = { height }
  }
}
