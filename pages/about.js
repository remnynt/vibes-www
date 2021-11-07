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
            vibes is a collection of generative art pieces, randomly created at the moment of mint, seeded by blockhash, and immutably stored on ethereum as 100% on-chain html5.
          </p>
          <p>
            art, code, contract, and site by{" "}
            <a href="https://twitter.com/remnynt" target="_blank" rel="noopener noreferrer">remnynt</a>.
          </p>
          <h3>genesis collection</h3>
          <h4><a href="https://opensea.io/collection/vibesdotart" target="_blank" rel="noopener noreferrer">vibesdotart [genesis]</a></h4>
          <table className={aboutStyles.about_table}>
            <tbody>
              <tr>
                <td>max supply:</td><td align="right" width="25%">7,777</td><td align="left">vibes</td>
              </tr>
              <tr>
                <td>price per mint:</td><td align="right" width="25%">0.07</td><td align="left">Ξ + gas</td>
              </tr>
              <tr>
                <td>royalties:</td><td align="right" width="25%">1 / 77</td><td align="left">(1.3%)</td>
              </tr>
            </tbody>
          </table>
          <h3>open collection</h3>
          <h4><a href="https://opensea.io/collection/vibesdotartopen" target="_blank" rel="noopener noreferrer">vibesdotart [open]</a></h4>
          <table className={aboutStyles.about_table}>
            <tbody>
              <tr>
                <td>max supply:</td><td align="right" width="25%">2,222</td><td align="left">vibes</td>
              </tr>
              <tr>
                <td>price per mint:</td><td align="right" width="25%">free</td><td align="left"> + gas</td>
              </tr>
              <tr>
                <td>royalties:</td><td align="right" width="25%">1 / 10</td><td align="left">(10%)</td>
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
            the metadata and rendering script are both generated on chain. the script can be fetched directly from the contract and is recognized by browsers as valid html. it is web3 in the most literal sense.
          </p>
          <p>
            the output file is capable of rendering your vibe at any size, between 16 and 9600 pixels, with optional downsampling (recommended). the default rendering used in marketplaces like opensea is 600px with downsampling enabled.
          </p>
        </div>

        <div className={aboutStyles.about_item}>
          <h3>vibes is free and open</h3>
          <p>
            vibes is dedicated to the public domain. to the extent possible under law, remnynt has waived all copyright and related or neighboring rights to this collection of art.
          </p>
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
          <h3>vibes is for everyone</h3>
          <p>
            vibes aims to bring generative art to a broarder nft audience by having a larger supply cap of 7,777 and a smaller mint price of 0.07Ξ + gas.
          </p>
          <p>
            the open vibes collection takes this movement a step further, by releasing an additional 2,222 vibes for free (+ gas).
          </p>
          <p>
            the collection was designed to support a broad range of outcomes, including some especially rare traits with a{" "}
            <a href="https://twitter.com/vibesdotart/status/1449515033629704199" target="_blank" rel="noopener noreferrer">1 / 1000 chance</a>.
          </p>
        </div>

        <div className={aboutStyles.about_item}>
          <h3>vibes is interoperable</h3>
          <p>
            inspired by projects like loot and art blocks, vibes aims to combine the collectability of generative art with the freedom and uncapped potential of web3 primitives.
          </p>
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
          <h3>vibes is randomly generated on chain</h3>
          <p>
            at the time of mint, each vibe is assigned a blockhash from within the most recent 256 ethereum blocks, offset by token id. the entropy from that hash is combined with the token id and attribute names to evenly distribute randomness on each trait and to maximize the possibility space of outcomes.
          </p>
          <p>
            the vibes contract discourages miners and sophisticated attackers from gaming the random number generation by making it unviable economically. the block rewards miners would have to forgo to guarantee a very rare outcome far exceeds any guaranteed returns. in addition, the mint function checks that the minting wallet address is not a smart contract, which forces attackers to redeploy any attacking contract with every mint attempt, incurring a higher cost of attack, with no guarantee of returns.
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
