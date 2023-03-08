import React, { useRef } from 'react'
import { useSize } from 'ahooks'
import BilibiliEmbedRenderer from 'react-bilibili-embed-renderer'
import styles from './styles.module.css'

const VideoPlayer = ({ item }) => {
  const ref = useRef(null)
  const size = useSize(ref)
  return (
    <>
      {item && (
        <div ref={ref} className={styles.BiliVideoPlayer} id="bili-player">
          <BilibiliEmbedRenderer
            aid={item.aid}
            width={size && size.width}
            page={item?.page}
          />
        </div>
      )}
    </>
  )
}

export default VideoPlayer
