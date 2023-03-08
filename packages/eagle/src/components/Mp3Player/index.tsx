import React, { useRef, useState } from 'react'
import PlayIcon from '@site/static/img/play.svg'
import PauseIcon from '@site/static/img/pause.svg'
import styles from './styles.module.css'

interface IAudioProps extends React.AudioHTMLAttributes<any> {
  src: string
}
const wrapEvent = (userEvent: any, proxyEvent?: any) => {
  return (event: any) => {
    try {
      proxyEvent && proxyEvent(event)
    } finally {
      userEvent && userEvent(event)
    }
  }
}

const useAudio = (props: IAudioProps) => {
  const ref = useRef<HTMLAudioElement | null>(null)
  const [paused, setPaused] = useState(true)

  const onPlay = () => {
    setPaused(false)
  }
  const onPause = () => {
    setPaused(true)
  }
  const element = React.createElement('audio', {
    ...props,
    ref,
    onPlay: wrapEvent(onPlay),
    onPause: wrapEvent(onPause),
    onEnded: wrapEvent(onPause),
  })

  let lockPlay: boolean = false

  const controls = {
    play: () => {
      const el = ref.current
      if (!el) {
        return undefined
      }

      if (!lockPlay) {
        const promise = el.play()
        const isPromise = typeof promise === 'object'

        if (isPromise) {
          lockPlay = true
          const resetLock = () => {
            lockPlay = false
          }
          promise.then(resetLock, resetLock)
        }
        return promise
      }
      return undefined
    },
    pause: () => {
      const el = ref.current
      if (el && !lockPlay) {
        setPaused(true)
        return el.pause()
      }
    },
  }

  return [
    <div className={styles.audio}>
      {element}
      {paused ? (
        <PlayIcon onClick={controls.play} />
      ) : (
        <PauseIcon onClick={controls.pause} />
      )}
    </div>,
    controls,
    ref,
  ] as const
}

export default useAudio
