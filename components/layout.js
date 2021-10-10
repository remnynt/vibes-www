import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from "next/router";

import styles from '/components/layout.module.css'
import utilStyles from '/styles/utils.module.css'

export const siteTitle = 'vibes'

export default function Layout({ children, home }) {
  const router = useRouter();
  const path = router.pathname;
  const links = [
    { text: "home", link: "/" },
    { text: "about", link: "/about" },
    { text: "mint", link: "/mint" }
  ];

  return (
    <div className={styles.container}>
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <meta name="og:title" property="og:title" content={siteTitle} />
        <meta name="og:type" property="og:type" content="website" />
        <meta name="og:image" property="og:image" content="https://vibes.art/images/elements/shadow/1.png" />
        <meta name="og:image:alt" property="og:image:alt" content="a shadowy digital vibe descends into darkness" />
        <meta name="og:description" property="og:description" content="generative art forged immutably on ethereum" />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content={siteTitle} />
        <meta name="twitter:image" content="https://vibes.art/images/elements/shadow/1.png" />
        <meta name="twitter:site" content="@vibesdotart" />
        <meta name="twitter:creator" content="@remnynt" />
      </Head>

      <div className={styles.header_links}>
        <ul>

        {links.map(({ text, link }, index) => {
            return (
              <li key={index}>
                <Link href={link}>
                  <a className={link === path ? styles.header_links_active : undefined}>
                    {text}
                  </a>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>

      <header className={styles.header}>
        <h1 className={utilStyles.heading2Xl}>{siteTitle}</h1>
      </header>
      <main>{children}</main>
      {!home && (
        <div className={styles.backToHome}>
          <Link href="/">
            <a>← home</a>
          </Link>
        </div>
      )}
    </div>
  )
}
