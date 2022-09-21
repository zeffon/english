import React from 'react'
import BackspaceIcon from '@site/static/img/backspace.svg'
import type { LetterState } from './types'
import styles from './keyboard-styles.module.css'

interface KeyboardProps {
  onKey: (key: string) => void
  letterStates: Record<string, LetterState>
}

const Keyboard = ({ onKey, letterStates }: KeyboardProps): JSX.Element => {
  const rows = [
    'qwertyuiop'.split(''),
    'asdfghjkl'.split(''),
    ['Enter', ...'zxcvbnm'.split(''), 'Backspace']
  ]
  return (
    <>
      {rows.map((row, idx) => {
        return (
          <div className={styles.row} key={idx}>
            {idx === 1 && <div className={styles.spacer}></div>}
            {row.map((key) => {
              return (
                <div
                  key={key}
                  onClick={() => onKey(key)}
                  className={`${styles.keyboard} ${key.length > 1 && styles.big} ${
                    styles[letterStates[key]]
                  }`}
                >
                  {key !== 'Backspace' && <span>{key}</span>}
                  {key === 'Backspace' && <BackspaceIcon />}
                </div>
              )
            })}
            {idx === 1 && <div className={styles.spacer}></div>}
          </div>
        )
      })}
    </>
  )
}

export default Keyboard
