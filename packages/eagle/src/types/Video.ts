export interface VideoItemProps {
  id?: number // video id
  aid?: number // video id
  author?: string // author name
  upper?: { name: string } // author name
  title: string
  intro?: string
  pic?: string // cover url
  cover?: string // cover url
  created?: number // create time
  ctime?: number // create time
  play?: number // play count
  cnt_info: { play: number } // play count
  duration?: number // duration
  length?: string // duration
  [x: string]: any
}
