import dayjs from 'dayjs'

export const calcBiliPlayCount = (count: number) => {
  if (count > 10000) {
    return (count / 10000).toFixed(1) + '万'
  }
  return count
}

export const calcBiliVideoDate = (timestamp: number) => {
  const curTimestamp = dayjs().unix()
  const diff = curTimestamp - timestamp
  if (diff < 3600) {
    return Math.ceil(diff / 60) + '分钟前'
  } else if (diff < 86400) {
    return Math.ceil(diff / 3600) + '小时前'
  } else if (diff > 86400 && diff < 86400 * 365) {
    return dayjs(timestamp * 1000).format('MM-DD')
  }
  return dayjs(timestamp * 1000).format('YYYY-MM-DD')
}

export const calcBiliPlayDuration = (duration: number) => {
  if (duration < 60) {
    return `00:${duration < 10 ? `0${duration}` : duration}`
  } else if (duration >= 60 && duration < 3600) {
    const minute = Math.floor(duration / 60)
    const second = duration % 60
    return `${minute < 10 ? `0${minute}` : minute}:${second < 10 ? `0${second}` : second}`
  }
  const hour = Math.floor(duration / 3600)
  const minute = Math.floor((duration - hour * 3600) / 60)
  const second = duration % 60
  return `${hour < 10 ? `0${hour}` : hour}:${minute < 10 ? `0${minute}` : minute}:${
    second < 10 ? `0${second}` : second
  }`
}

export const scrollToTop = () => {
  const scrollTop = document.documentElement.scrollTop || document.body.scrollTop
  if (scrollTop > 0) {
    window.requestAnimationFrame(scrollToTop)
    window.scrollTo(0, scrollTop - scrollTop / 8)
  }
}
