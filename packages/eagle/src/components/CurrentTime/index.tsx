import React, { useEffect, useRef, useState } from 'react'
import styles from './styles.module.css'
import dayjs from 'dayjs'

const CurrentTime = () => {
  const weeks = ['日', '一', '二', '三', '四', '五', '六']

  const timer = useRef()
  const [year, setYear] = useState('')
  const [month, setMonth] = useState('')
  const [week, setWeek] = useState('')
  const [date, setDate] = useState('')
  const [hour, setHour] = useState('')
  const [minute, setMinute] = useState('')
  const [second, setSecond] = useState('')

  const calcTime = () => {
    const time = dayjs()
    const year = time.year()
    const month = time.month()
    const week = time.day()
    const date = time.date()
    const hour = time.hour()
    const minute = time.minute()
    const second = time.second()
    setYear(year)
    setMonth(month + 1)
    setWeek(weeks[week])
    setDate(date)
    setHour(hour > 9 ? hour : `0${hour}`)
    setMinute(minute > 9 ? minute : `0${minute}`)
    setSecond(second > 9 ? second : `0${second}`)
  }

  useEffect(() => {
    timer.current = setInterval(calcTime, 1000)
    return () => {
      clearTimeout(timer.current)
    }
  }, [])

  return (
    <div className={styles.currentTime}>
      <div className={styles.timeArea}>
        {hour}
        <span className={styles.timeAreaSplit}>:</span>
        {minute}
        <span className={styles.timeSecond}>{second}</span>
      </div>
      <div className={styles.dateArea}>
        <div className={styles.dateAreaWeek}>星期{week}</div>
        <div>
          {year}年{month}月{date}日
        </div>
      </div>
    </div>
  )
}

export default CurrentTime
