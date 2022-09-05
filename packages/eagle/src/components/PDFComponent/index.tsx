import React, { useRef, useState } from 'react'
import { useSize } from 'ahooks'
import { Document, Page, pdfjs } from 'react-pdf/dist/esm/entry.webpack5'
import styles from './styles.module.css'
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`

const usePDF = (file: File) => {
  const [numPages, setNumPages] = useState(0)
  const [pageNumber, setPageNumber] = useState(1)
  const [value, setValue] = useState(1)

  const ref = useRef(null)
  const size = useSize(ref)

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages)
  }

  const onSubmitHandle = (val: string) => {
    if (val === '') {
      setValue(pageNumber)
      return
    }
    let valNum = parseInt(val)
    if (valNum >= numPages) {
      valNum = numPages
    }
    if (valNum === 0) {
      valNum = 1
    }
    setValue(valNum)
    setPageNumber(valNum)
  }
  const onPrevHandle = () => {
    if (pageNumber <= 1) {
      return
    }
    setValue(pageNumber - 1)
    setPageNumber(pageNumber - 1)
  }
  const onNextHandle = () => {
    if (pageNumber >= numPages) {
      return
    }
    setValue(pageNumber + 1)
    setPageNumber(pageNumber + 1)
  }

  const options = {
    cMapUrl: `https://unpkg.com/pdfjs-dist@${pdfjs.version}/cmaps/`,
    cMapPacked: true,
    standardFontDataUrl: 'standard_fonts/'
  }

  const pdfRef = (
    <>
      <div ref={ref} className={styles.pdfContainer}>
        <Document file={file} onLoadSuccess={onDocumentLoadSuccess} options={options}>
          <Page pageNumber={pageNumber} width={size && size.width} />
        </Document>
      </div>

      <div className={styles.pagination}>
        <div
          className={`${styles.paginationItem} ${pageNumber <= 1 && styles.paginationItemDisabled}`}
          onClick={onPrevHandle}
        >
          上一页
        </div>
        <div
          className={`${styles.paginationItem} ${
            pageNumber >= numPages && styles.paginationItemDisabled
          }`}
          onClick={onNextHandle}
        >
          下一页
        </div>
        <div className={styles.paginationNum}>
          <input
            type="number"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onKeyDown={(e) => onSubmitHandle(e.target.value)}
            onBlur={(e) => onSubmitHandle(e.target.value)}
          />{' '}
          / {numPages}
        </div>
      </div>
    </>
  )

  return [pdfRef] as const
}

export default usePDF
