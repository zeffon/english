import React, { useState } from 'react'
import { Document, Page, pdfjs } from 'react-pdf'
import styles from './styles.module.css'
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`

const usePDF = (file: File) => {
  const [numPages, setNumPages] = useState(0)
  const [pageNumber, setPageNumber] = useState(1)
  const [value, setValue] = useState(1)

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

  const pdfRef = (
    <>
      <div className={styles.pdfContainer}>
        <Document file={file} onLoadSuccess={onDocumentLoadSuccess}>
          <Page pageNumber={pageNumber} className={styles.ReactPdfPage} />
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
