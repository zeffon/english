import React from 'react'
import clsx from 'clsx'
import Link from '@docusaurus/Link'
import useDocusaurusContext from '@docusaurus/useDocusaurusContext'
import Layout from '@theme/Layout'
import Homepage from '@site/src/features/Homepage'

import styles from './index.module.css'

export default function Home(): JSX.Element {
  const { siteConfig } = useDocusaurusContext()
  return (
    <Layout title={`${siteConfig.title}`}>
      <main>
        <Homepage />
      </main>
    </Layout>
  )
}
