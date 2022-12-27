export interface VideoInfo {
  cid: number
  page: number
  from: string
  part: string
  duration: number
  vid: string
  weblink: string
  dimension: {
    width: number
    height: number
    rotate: number
  }
  first_frame: string
}

export interface CollectVideoInfo {
  id: number
  type: number
  title: string
  cover: string
  intro: string
  page: number
  duration: number
  upper: {
    mid: number
    name: string
    face: string
  }
  attr: number
  cnt_info: {
    collect: number
    play: number
    danmaku: number
  }
  link: string
  ctime: number
  pubtime: number
  fav_time: number
  bv_id: string
  bvid: string
  season: null
  ogv: null
  ugc: {
    first_cid: number
  }
}

export interface CollectVideoInfo2 {
  aid: number
  title: string
  pubdate: number
  ctime: number
  state: number
  pic: string
  duration: number
  stat: {
    view: number
  }
  bvid: string
  ugc_pay: number
  interactive_video: boolean
}
