import React, { useState } from 'react'
import BilibiliEmbedRenderer from 'react-bilibili-embed-renderer'
import type { SymbolProps } from '@site/data/symbol'
import styles from './styles.module.css'

export const YINGTUYU_MODE = 'yingyutu'
export const BBC_MODE = 'bbc'
export const BOTH_MODE = 'both'

type SymbolVideoProps = {
  data: SymbolProps[]
  mode: typeof YINGTUYU_MODE | typeof BBC_MODE | typeof BOTH_MODE
}

const SymbolVideo = ({ data, mode }: SymbolVideoProps): JSX.Element => {
  const [curSymbol, setSymbol] = useState(data[0])
  return (
    <div className={styles.symbolContainer}>
      <div className={styles.symbolContent}>
        {data.map((item) => {
          return (
            <div
              key={item.id}
              onClick={() => setSymbol(item)}
              className={`${styles.symbolItem} ${
                item.id === curSymbol.id && styles.isActive
              }`}
            >
              {item.name}
            </div>
          )
        })}
      </div>
      {mode !== BOTH_MODE && (
        <BilibiliEmbedRenderer
          aid={curSymbol[mode].aid}
          page={curSymbol[mode].page}
        />
      )}
      {mode === BOTH_MODE && (
        <div className={styles.symbolBothVideo}>
          <BilibiliEmbedRenderer
            aid={curSymbol.yingyutu.aid}
            page={curSymbol.yingyutu.page}
            width={400}
            height={240}
          />
          {curSymbol.bbc && (
            <BilibiliEmbedRenderer
              aid={curSymbol.bbc.aid}
              page={curSymbol.bbc.page}
              width={400}
              height={240}
            />
          )}
        </div>
      )}
    </div>
  )
}

export default SymbolVideo
