export interface VideoItemProps {
  aid: number // video id
  page?: number
  author: string // author name
  title: string
  intro?: string
  pic: string // cover url
  created?: number // create time
  play?: number // play count
  duration?: number // duration
  length?: string // duration
}
