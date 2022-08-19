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

export const scrollToTop = () => {
  const scrollTop = document.documentElement.scrollTop || document.body.scrollTop
  if (scrollTop > 0) {
    window.requestAnimationFrame(scrollToTop)
    window.scrollTo(0, scrollTop - scrollTop / 8)
  }
}
