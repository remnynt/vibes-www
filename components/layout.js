import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from "next/router";

import styles from '/components/layout.module.css'
import utilStyles from '/styles/utils.module.css'

export const siteTitle = 'vibes'

const localLoader = ({ src, width, quality }) => {
  return `/${src}?w=${width}&q=${quality || 75}`
}

export default function Layout({ children, home }) {
  const router = useRouter();
  const path = router.pathname;
  const links = [
    { text: "home", link: "/" },
    { text: "about", link: "/about" },
    { text: "render", link: "/render" },
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

      <div className={styles.cc0}>
        <p>
          <a rel="license" href="http://creativecommons.org/publicdomain/zero/1.0/" target="_blank" rel="noopener noreferrer">
            <Image className={styles.cc0Image}
              priority
              loader={localLoader}
              loading="eager"
              src="images/cc0.png"
              width="88px"
              height="31px"
              alt="CC0"
            />
          </a>
        </p>
      </div>

      <div className={styles.footer}>
        <div className={styles.backToHome}>
          {!home && (
            <Link href="/" className={styles.backToHome}>
              <a>← home</a>
            </Link>
          )}
        </div>

        <div className={styles.openSource}>
          vibes.art is{" "}
          <a href="https://github.com/remnynt/vibes-www" target="_blank" rel="noopener noreferrer">
            open-source
          </a>.
        </div>
      </div>

    </div>
  )
}
