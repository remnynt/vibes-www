import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import Layout, { siteTitle } from '/components/layout'
import { getElementsList } from '/lib/elements'
import utilStyles from '/styles/utils.module.css'

export async function getStaticProps() {
  const elementsData = getElementsList()
  return {
    props: {
      elementsData
    }
  }
}

const localLoader = ({ src, width, quality }) => {
  return `./${src}?w=${width}&q=${quality || 75}`
}

export default function Home({ elementsData }) {
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
        <link rel="icon" href="/favicon.ico" />

        {elementsData.map(({ elementName, imagesList, featuredImageID }) => {
          return imagesList.map((imageID) => {
            return (
              <link rel="preload" href={`/images/elements/${elementName}/${imageID}.png`} as="image"></link>
            )
          })
        })}
      </Head>

      <section className={utilStyles.quickLinks}>
        <ul className={utilStyles.quickLinksList}>
          <li key="0" className={utilStyles.quickLinksListItem}>
            <a href="https://opensea.io/collection/vibesdotart" target="_blank" rel="noopener noreferrer">
              opensea
            </a>
          </li>
          <li key="1" className={utilStyles.quickLinksListItem}>
            <a href="https://twitter.com/vibesdotart" target="_blank" rel="noopener noreferrer">
              twitter
            </a>
          </li>
          <li key="2" className={utilStyles.quickLinksListItem}>
            <a href="https://etherscan.io/address/0x6c7c97caff156473f6c9836522ae6e1d6448abe7" target="_blank" rel="noopener noreferrer">
              contract
            </a>
          </li>
          <li key="3" className={utilStyles.quickLinksListItem}>
            <Link href="/mint">
              <a>mint</a>
            </Link>
          </li>
        </ul>
      </section>

      <section className={utilStyles.headingSub}>
        <p>generative art forged immutably on the ethereum blockchain</p>
      </section>

      <section className={utilStyles.headingSubsub}>
        <p>find your vibe: 10/15/21 5pm pdt</p>
      </section>

      <section className={utilStyles.list}>
        <div className="grid">
          {elementsData.map(({ elementName, imagesList, featuredImageID }) => (
            <div className="card" key={elementName}>
              <Image className={utilStyles.roundedImgTop} key={elementName + featuredImageID}
                priority
                loader={localLoader}
                loading="eager"
                src={`/images/elements/${elementName}/${featuredImageID}.png`}
                height={"400%"}
                width={"400%"}
                onClick={function (evt) {
                  const currentTarget = evt.currentTarget;
                  const currentImageID = featuredImageID;
                  let index = +featuredImageID + 1;
                  if (index >= imagesList.length) {
                    index = 1;
                  }

                  featuredImageID = '' + index;

                  const newSrcset = currentTarget.srcset.replace(currentImageID + '.png', featuredImageID + '.png');
                  currentTarget.srcset = newSrcset;
                }}
              />
              <h3>element: {elementName}</h3>
            </div>
          ))}
        </div>
      </section>
    </Layout>
  )
}
