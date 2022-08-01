import React from 'react'
import useDocusaurusContext from '@docusaurus/useDocusaurusContext'
import Layout from '@theme/Layout'
import Homepage from '@site/src/features/Homepage'

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
