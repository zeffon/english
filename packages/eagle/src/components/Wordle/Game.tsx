import React, { useEffect, useState } from 'react'
import Keyboard from './Keyboard'
import { LetterState } from './types'
import { allWords, getWordOfTheDay } from './words'
import styles from './game-styles.module.css'

const Game = (): JSX.Element => {
  // Get word of the day
  const answer = getWordOfTheDay()

  // Board state. Each tile is represented as { letter, state }
  const initBoard = Array.from({ length: 6 }, () =>
    Array.from({ length: 5 }, () => ({
      letter: '',
      state: LetterState.INITIAL
    }))
  )
  const [board, setBoard] = useState(initBoard)

  // Current active row.
  const [currentRowIndex, setCurrentRowIndex] = useState(0)
  const [currentRow, setCurrentRow] = useState(board[currentRowIndex])

  // Feedback state: message and shake
  const [message, setMessage] = useState('')
  const [grid, setGrid] = useState('')

  const [shakeRowIndex, setShakeRowIndex] = useState(-1)
  const [success, setSuccess] = useState(false)

  // Keep track of revealed letters for the virtual keyboard
  const [letterStates, setLetterStates] = useState<Record<string, LetterState>>({})

  // Handle keyboard input.
  const [allowInput, setAllowInput] = useState(true)

  useEffect(() => {
    window.addEventListener('keyup', onKeyup)
    return () => {
      window.removeEventListener('keyup', onKeyup)
    }
  })

  const onKeyup = (e: KeyboardEvent) => onKey(e.key)

  const onKey = (key: string) => {
    if (!allowInput) return
    if (/^[a-zA-Z]$/.test(key)) {
      fillTile(key.toLowerCase())
    } else if (key === 'Backspace') {
      clearTile()
    } else if (key === 'Enter') {
      completeRow()
    }
  }

  const fillTile = (letter: string) => {
    for (const tile of currentRow) {
      if (!tile.letter) {
        tile.letter = letter
        setCurrentRow([...currentRow])
        break
      }
    }
  }

  const clearTile = () => {
    for (const tile of [...currentRow].reverse()) {
      if (tile.letter) {
        tile.letter = ''
        setCurrentRow([...currentRow])
        break
      }
    }
  }

  const completeRow = () => {
    if (currentRow.every((tile) => tile.letter)) {
      const guess = currentRow.map((tile) => tile.letter).join('')
      if (!allWords.includes(guess) && guess !== answer) {
        shake()
        showMessage(`Not in word list`)
        return
      }

      const answerLetters: (string | null)[] = answer.split('')
      // first pass: mark correct ones
      currentRow.forEach((tile, i) => {
        if (answerLetters[i] === tile.letter) {
          tile.state = letterStates[tile.letter] = LetterState.CORRECT
          setLetterStates(letterStates)
          setCurrentRow([...currentRow])
          answerLetters[i] = null
        }
      })
      // second pass: mark the present
      currentRow.forEach((tile) => {
        if (!tile.state && answerLetters.includes(tile.letter)) {
          tile.state = LetterState.PRESENT
          answerLetters[answerLetters.indexOf(tile.letter)] = null
          if (!letterStates[tile.letter]) {
            letterStates[tile.letter] = LetterState.PRESENT
            setLetterStates(letterStates)
          }
        }
      })
      // 3rd pass: mark absent
      currentRow.forEach((tile) => {
        if (!tile.state) {
          tile.state = LetterState.ABSENT
          if (!letterStates[tile.letter]) {
            letterStates[tile.letter] = LetterState.ABSENT
            setLetterStates(letterStates)
          }
        }
      })

      setAllowInput(false)
      if (currentRow.every((tile) => tile.state === LetterState.CORRECT)) {
        // yay!
        setTimeout(() => {
          setGrid(genResultGrid())
          showMessage(
            ['Genius', 'Magnificent', 'Impressive', 'Splendid', 'Great', 'Phew'][currentRowIndex],
            -1
          )
          setSuccess(true)
        }, 1600)
      } else if (currentRowIndex < board.length - 1) {
        // go the next row
        const newRowIndex = currentRowIndex + 1
        setCurrentRowIndex(newRowIndex)
        setCurrentRow(board[newRowIndex])
        setTimeout(() => {
          setAllowInput(true)
        }, 800)
      } else {
        // game over :(
        setTimeout(() => {
          showMessage(answer.toUpperCase(), -1)
        }, 1600)
      }
    } else {
      shake()
      showMessage('Not enough letters')
    }
  }

  const showMessage = (msg: string, time = 1000) => {
    setMessage(msg)
    if (time > 0) {
      setTimeout(() => {
        setMessage('')
      }, time)
    }
  }

  const shake = () => {
    setShakeRowIndex(currentRowIndex)
    setTimeout(() => {
      setShakeRowIndex(-1)
    }, 1000)
  }

  const icons = {
    [LetterState.CORRECT]: '🟩',
    [LetterState.PRESENT]: '🟨',
    [LetterState.ABSENT]: '⬜',
    [LetterState.INITIAL]: null
  }

  const genResultGrid = () => {
    return board
      .slice(0, currentRowIndex + 1)
      .map((row) => {
        return row.map((tile) => icons[tile.state]).join('')
      })
      .join('\n')
  }

  const letterFrontStyle = (index: number) => {
    return { transitionDelay: `${index * 300}ms` }
  }

  const letterBackStyle = (index: number) => {
    return { transitionDelay: `${index * 300}ms`, animationDelay: `${index * 100}ms` }
  }

  const reset = () => {
    const board = initBoard.slice()
    setBoard(board)
    setShakeRowIndex(-1)
    setCurrentRowIndex(0)
    setCurrentRow(board[0])
    setLetterStates({})
    setSuccess(false)
    setAllowInput(true)
    setMessage('')
  }

  return (
    <div>
      {message && (
        <div className={styles.message}>
          {message}
          {grid && <pre>{grid}</pre>}
        </div>
      )}
      <div className={styles.board}>
        {board.map((row, rowIdx) => {
          return (
            <div
              key={rowIdx}
              className={`${styles.row} ${shakeRowIndex === rowIdx && styles.shake} ${
                success && currentRowIndex === rowIdx && styles.jump
              }`}
            >
              {row.map((tile, idx) => {
                return (
                  <div
                    key={idx}
                    className={`${styles.tile} ${tile.letter && styles.filled} ${
                      tile.state && styles.revealed
                    }`}
                  >
                    <div className={styles.front} style={letterFrontStyle(idx)}>
                      {tile.letter}
                    </div>
                    <div
                      className={`${styles.back} ${styles[tile.state]}`}
                      style={letterBackStyle(idx)}
                    >
                      {tile.letter}
                    </div>
                  </div>
                )
              })}
            </div>
          )
        })}
      </div>
      <Keyboard onKey={onKey} letterStates={letterStates}></Keyboard>
      <div onClick={reset} className={styles.reset}>
        重新开始
      </div>
    </div>
  )
}

export default Game
