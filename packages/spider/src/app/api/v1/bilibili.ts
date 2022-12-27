import type { Context } from 'koa'
import axios from 'axios'
import { description, prefix, query, request, summary, tags } from 'koa-swagger-decorator'
import type { CollectVideoInfo, CollectVideoInfo2, VideoInfo } from '~/typings/bilibili'

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

  @request('get', '/collect/video')
  @summary('Get bilibili ')
  @description('example: /bilibili/collect/video')
  @tag
  @query(audioSchema)
  async getCollectData(ctx: Context) {
    const page = ctx.query.page || 1
    const count = ctx.query.count || 20
    const mid = ctx.query.mid
    const url = `https://api.bilibili.com/x/v3/fav/resource/list?media_id=${mid}&ps=${count}&pn=${page}&keyword=&order=mtime&type=0&tid=0&platform=web&jsonp=jsonp`
    const { data } = await axios.get(url, {
      headers: {
        'User-Agent':
          'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.9; rv:32.0) Gecko/20100101 Firefox/32.0'
      }
    })
    const list = this.makeCollectList(data.data.medias)
    ctx.body = { list }
  }

  @request('get', '/video/info')
  @summary('Get bilibili video info')
  @description('example: /bilibili/video/info')
  @tag
  @query({
    aid: { type: 'number', required: false, default: 255311341 },
    mid: { type: 'number', required: false, default: 483162496 },
    seriesId: { type: 'number', required: false, default: 292491 }
  })
  async getVideoInfo(ctx: Context) {
    const aid = ctx.query.aid
    const mid = Number(ctx.query.mid)
    const seriesId = Number(ctx.query.seriesId)
    const url = `https://api.bilibili.com/x/web-interface/view?aid=${aid}`
    const { data } = await axios.get(url, {
      headers: {
        'User-Agent':
          'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.9; rv:32.0) Gecko/20100101 Firefox/32.0'
      }
    })
    const otherData = await this.fetchSeries(mid, seriesId)
    const list = this.makeVideoInfo(data.data.aid, data.data.owner.name, data.data.pages, otherData)
    ctx.body = { list }
  }

  makeCollectList(list: CollectVideoInfo[]) {
    return list.map((item) => ({
      aid: item.id,
      title: item.title,
      pic: item.cover,
      duration: item.duration,
      author: item.upper.name,
      created: item.ctime,
      play: item.cnt_info.play,
      intro: item.intro
    }))
  }

  async fetchSeries(mid: number, seriesId: number) {
    const collectUrl = `https://api.bilibili.com/x/series/archives?mid=${mid}&series_id=${seriesId}&only_normal=true&sort=desc&pn=1&ps=30`
    const { data } = await axios.get(collectUrl, {
      headers: {
        'User-Agent':
          'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.9; rv:32.0) Gecko/20100101 Firefox/32.0'
      }
    })
    return data.data.archives
  }
  makeVideoInfo(aid: number, author: string, list: VideoInfo[], otherList: CollectVideoInfo2[]) {
    return list.map((item, index) => ({
      aid: aid,
      page: item.page,
      title: item.part,
      duration: item.duration,
      author: author,
      pic: otherList[index].pic,
      intro: otherList[index].title,
      created: otherList[index].ctime,
      play: otherList[index].stat.view
    }))
  }
}
