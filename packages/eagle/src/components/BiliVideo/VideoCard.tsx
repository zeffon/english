import React from 'react'
import BiliVideoCardStatsIcon from '@site/static/img/bili-video-card-stats-icon.svg'
import {
  calcBiliPlayCount,
  calcBiliPlayDuration,
  calcBiliVideoDate,
  scrollToTop,
} from '@site/src/utils/helper'
import type { VideoItemProps } from '@site/src/types/Video'
import styles from './styles.module.css'

interface VideoCardProps {
  curIndex: number
  index: number
  item: VideoItemProps
  selectItem: (index: number) => void
}

interface VideoCardListProps {
  curIndex: number
  list: VideoItemProps[]
  setIndex: (index: number) => void
}

interface VideoCardPageProps {
  list: VideoItemProps[]
  curIndex: number
  setIndex: (index: number) => void
  paging: any
  setPaging: ({ pn }: { pn: number }) => void
}

const VideoCard = ({ curIndex, index, item, selectItem }: VideoCardProps) => {
  return (
    <div
      onClick={() => selectItem(index)}
      className={`${styles.BiliVideoCard} ${
        index === curIndex && styles.BiliVideoCardSelected
      }`}
    >
      <div className={styles.BiliVideoCardImgWarp}>
        <img
          className={styles.BiliVideoCardImg}
          src={item.pic}
          title={item.intro || item.title}
        />
        <div className={styles.BiliVideoCardStats}></div>
        <BiliVideoCardStatsIcon className={styles.BiliVideoCardStatsIcon} />
        <span className={styles.BiliVideoCardStatsCount}>
          {calcBiliPlayCount(item.play)}
        </span>
        <span className={styles.BiliVideoCardStatsDuration}>
          {item.length || calcBiliPlayDuration(item.duration)}
        </span>
      </div>
      <div className={styles.BiliVideoCardInfo}>
        <div title={item.intro || item.title}>{item.title}</div>
        <div className={styles.BiliVideoCardInfoAuthor}>
          {item.author}&nbsp;&nbsp;
          {item.created && calcBiliVideoDate(item.created)}
        </div>
      </div>
    </div>
  )
}

const VideoCardList = ({ list, curIndex, setIndex }: VideoCardListProps) => {
  const selectItem = (index: number) => {
    setIndex(index)
    scrollToTop()
  }
  return (
    <div className={styles.BiliVideoCardWrapper}>
      {list.map((item, index) => {
        return (
          <VideoCard
            key={item.aid}
            curIndex={curIndex}
            index={index}
            item={item}
            selectItem={selectItem}
          />
        )
      })}
    </div>
  )
}

const VideoCardPagination = ({
  paging,
  setPaging,
}: Partial<VideoCardPageProps>) => {
  const changePage = (pn: number) => {
    setPaging({ pn })
    scrollToTop()
  }
  return (
    <div
      className={`${styles.BiliVideoPagination} ${
        paging.count <= paging.ps && styles.BiliVideoPaginationDisabled
      }`}
    >
      <div
        className={`${paging.pn === 1 && styles.BiliVideoPaginationHidden}`}
        onClick={() => changePage(paging.pn - 1)}
      >
        上一页
      </div>
      <div
        className={`${
          paging.count <= paging.pn * paging.ps &&
          styles.BiliVideoPaginationHidden
        }`}
        onClick={() => changePage(paging.pn + 1)}
      >
        下一页
      </div>
    </div>
  )
}

const VideoCardPage = ({
  list,
  curIndex,
  setIndex,
  paging,
  setPaging,
}: VideoCardPageProps) => {
  return (
    <>
      <VideoCardList list={list} curIndex={curIndex} setIndex={setIndex} />
      <VideoCardPagination paging={paging} setPaging={setPaging} />
    </>
  )
}

export { VideoCard, VideoCardList, VideoCardPage }
