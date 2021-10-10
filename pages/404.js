import Head from 'next/head'
import Layout from '/components/layout'
import utilStyles from '/styles/utils.module.css'

export default function Custom404() {
  return (
    <Layout bad>
      <Head>
        <title>bad vibes</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <section className={utilStyles.headingSub}>
        <p>four-oh-four</p>
      </section>
    </Layout>
  )
}
