import Head from 'next/head'
import Link from 'next/link'
import Layout from '/components/layout'
import aboutStyles from '/styles/about.module.css'
import utilStyles from '/styles/utils.module.css'

export default function About() {
  return (
    <Layout>
      <Head>
        <title>about</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <section className={utilStyles.headingSub}>
        <p>about</p>
      </section>

      <div className={aboutStyles.about}>
        <div className={aboutStyles.about_item}>
          <h3>what is vibes?</h3>
          <p>
            vibes is a collection of generative art pieces, randomly created and immutably stored on the ethereum blockchain.
          </p>
          <p>
            art, code, contract, and site by{" "}
            <a href="https://twitter.com/remnynt" target="_blank" rel="noopener noreferrer">remnynt</a>.
          </p>
          <table className={aboutStyles.about_table}>
            <tbody>
              <tr>
                <td>total supply:</td><td align="right" width="25%">7,777</td><td align="left">vibes</td>
              </tr>
              <tr>
                <td>reserved:</td><td align="right" width="25%">77</td><td align="left">vibes</td>
              </tr>
              <tr>
                <td>giveaway:</td><td align="right" width="25%">7</td><td align="left">vibes</td>
              </tr>
              <tr>
                <td>test mints:</td><td align="right" width="25%">7</td><td align="left">vibes</td>
              </tr>
              <tr>
                <td>max per mint:</td><td align="right" width="25%">7</td><td align="left">vibes</td>
              </tr>
              <tr>
                <td>price per mint:</td><td align="right" width="25%">0.07</td><td align="left">Ξ + gas</td>
              </tr>
              <tr>
                <td>royalties:</td><td align="right" width="25%">1 / 77</td><td align="left">(1.3%)</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className={aboutStyles.about_item}>
          <h3>why vibes?</h3>
          <p>
            vibes is an exploration of color theory and its ability to evoke unique and subjective emotions. put simply, beauty is in the eye of the beholder. to each their own vibe.
          </p>
          <p>
            vibes is pushing the generative art movement towards decentralization with no added dependencies outside of ethereum. vibes is implemented in{" "}
            <a href="https://etherscan.io/address/0x6c7c97caff156473f6c9836522ae6e1d6448abe7#code#L1356" target="_blank" rel="noopener noreferrer">
              solidity{" "}
            </a>
            and{" "}
            <a href="https://etherscan.io/address/0x6c7c97caff156473f6c9836522ae6e1d6448abe7#code#L2361" target="_blank" rel="noopener noreferrer">
              javascript
            </a>.
            the metadata and rendering script are both generated on chain. the script can be fetched directly from the contract and saved as an html file. the output file is capable of rendering your vibe at any size, between 16 and 9600 pixels, with optional downsampling (recommended). the default rendering used in marketplaces like opensea is 600px with downsampling enabled.
          </p>
        </div>

        <div className={aboutStyles.about_item}>
          <h3>when vibes?</h3>
          <p>
            vibes will be available to mint starting 10/15/21 at 5pm pdt.
          </p>
        </div>

        <div className={aboutStyles.about_item}>
          <h3>vibes is interoperable</h3>
          <p>
            each vibe exposes its{" "}
            <a href="https://etherscan.io/address/0x6c7c97caff156473f6c9836522ae6e1d6448abe7#code#L1405" target="_blank" rel="noopener noreferrer">
              color palette on chain
            </a>.
            feel free to carry your colors with you on your adventures. since the rest of the metadata is generated on chain, any of the attributes can be referenced as you see fit.
          </p>
          <p>
            vibes also implements voluntary royalties on chain, encouraging other artists to do the same. marketplaces should adopt{" "}
            <a href="https://eips.ethereum.org/EIPS/eip-2981" target="_blank" rel="noopener noreferrer">
              eip-2981{" "}
            </a>
            so that artists' royalties aren't tied to any one platform and its fate.
          </p>
        </div>

        <div className={aboutStyles.about_item}>
          <h3>vibes is art with no roadmap</h3>
          <p>
            vibes aims to bring generative art to a broarder nft collector audience by having a larger supply cap (7,777) and smaller mint price (0.07).
          </p>
          <p>
            there are possible futures in which subsequent projects feature vibes derivatives or collaborations, but the most likely outcome is a new project exploring on chain generative 3d art (webgl) or on chain games.
          </p>
        </div>

        <div className={aboutStyles.about_item}>
          <h3>vibes is open-source</h3>
          <p>
            the code for vibes rendering, the smart contract, and this website is open-source, and released under the mit license.
          </p>
          <p>
            vibes rendering + contract: <a href="https://github.com/remnynt/vibes" target="_blank" rel="noopener noreferrer">vibes</a>
          </p>
          <p>
            vibes.art (this site): <a href="https://github.com/remnynt/vibes-www" target="_blank" rel="noopener noreferrer">vibes-www</a>
          </p>
        </div>

        <div className={aboutStyles.about_item}>
          <h3>what's with all the sevens?</h3>
          <p>
            seven is a sideways v.
          </p>
        </div>

        <div className={aboutStyles.about_item}>
          <h3>the artist?</h3>
          <p>
            wow. i'm humbled you're still here.
          </p>
          <p>
            this is my first project in web3. i've been building games since i was twelve, and i can't wait to build more in this space. my first generative art project was a terrain generator for a game, and i've been infatuated with shaders, fractals and the like ever since. by minting vibes, you're supporting my family, and enabling me to focus on web3 generative art and games as a career. thank you so much for your support.
          </p>
          <p>
            feel free to email hello [at] vibes [dot] art or dm on{" "}
            <a href="https://twitter.com/remnynt" target="_blank" rel="noopener noreferrer">
              twitter
            </a>.
          </p>
        </div>
      </div>


    </Layout>
  )
}