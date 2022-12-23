export interface VideoItemProps {
  aid: number
  author: string
  title: string
  pic: string
  cover: string
  created?: number
  ctime?: number
  play?: number
  length?: number
  duration?: number
  stat?: {
    view: number
  }
  [x: string]: any
}
