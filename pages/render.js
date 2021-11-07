import Head from 'next/head';
import Layout from '/components/layout';
import renderStyles from '/styles/render.module.css';
import utilStyles from '/styles/utils.module.css';
import React, { useState, useEffect } from 'react';

import {
  WEB3_PROVIDER,
  CONTRACT_ADDRESS_VIBES,
  CONTRACT_ADDRESS_OPEN_VIBES,
  ABI_VIBES,
  ABI_OPEN_VIBES
} from '/lib/contracts';

const Web3 = require('web3');

export default function Render() {
  let [web3, setWeb3] = useState(null);
  let [contractVibes, setContractVibes] = useState(null);
  let [contractOpenVibes, setContractOpenVibes] = useState(null);
  let [totalSupplyVibes, setTotalSupplyVibes] = useState(0);
  let [totalSupplyOpenVibes, setTotalSupplyOpenVibes] = useState(0);

  totalSupplyVibes = totalSupplyVibes || 77;
  totalSupplyOpenVibes = totalSupplyOpenVibes || 1;

  useEffect(() => {
    if (window.ethereum) {
      web3 = new Web3(ethereum);
    } else {
      web3 = new Web3(new Web3.providers.WebsocketProvider(WEB3_PROVIDER));
    }

    setWeb3(web3);
    loadContract(ABI_VIBES, CONTRACT_ADDRESS_VIBES, setContractVibes, setTotalSupplyVibes);
    loadContract(ABI_OPEN_VIBES, CONTRACT_ADDRESS_OPEN_VIBES, setContractOpenVibes, setTotalSupplyOpenVibes);

    Array.from(document.getElementsByTagName("iframe"))
      .forEach((iframe) => {
        iframe.width = 604;
        iframe.height = 850;
        render({
          preventDefault: function () {},
          target: { tokenId: { value: 1 } }
        })
      });
  }, []);

  function loadContract (abi, address, setContract, setTotalSupply) {
    const contract = new web3.eth.Contract(abi, address);
    setContract(contract);
    contract.methods.totalSupply().call()
      .then(supply => setTotalSupply(supply))
      .catch(err => console.log(err));
  };

  function render(event) {
    event.preventDefault();

    let tokenId = event.target.tokenId.value;
    if (tokenId <= 7777) {
      doRender(tokenId, contractVibes);
    } else {
      doRender(tokenId, contractOpenVibes);
    }
  };

  function doRender (tokenId, contract) {
    if (contract) {
      contract.methods.tokenScript(tokenId).call()
        .then((tokenScript) => {
          Array.from(document.getElementsByTagName("iframe"))
            .forEach((iframe) => {
              iframe.src = `https://vibesdotart.mypinata.cloud/ipfs/QmNzoYqL1i2JVe5XKMmn3A2V2WgH2fVWvcAWQaidbZ6p1U/${tokenId}.html`;
              iframe.srcdoc = tokenScript;
            });
        })
        .catch((err) => console.log(err));
    } else {
      Array.from(document.getElementsByTagName("iframe"))
        .forEach((iframe) => {
          iframe.src = `https://vibesdotart.mypinata.cloud/ipfs/QmNzoYqL1i2JVe5XKMmn3A2V2WgH2fVWvcAWQaidbZ6p1U/${tokenId}.html`;
        });
    }
  };

  return (
    <Layout>
      <Head>
        <title>render</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <section className={utilStyles.headingSub}>
        <p>render</p>
      </section>

      <div className={renderStyles.render}>
        <div className={renderStyles.render_item}>
          <h3>render vibes at any size</h3>
          <p>
            you can use this page to render any token that's been minted. it may take time before your vibe is rendered on marketplaces. this script is pulled directly from the blockchain, so it's the quickest way to reveal your mints and get any image size and quality you want. if your token is not in the valid range, try refreshing the page.
          </p>
          <p>
            the initial image that appears will be slightly jagged. to see the full high quality image, click the render button with downsample enabled. this may take a few minutes - look for the green loading bar. once the render is complete, feel free to right-click-save.
          </p>
          <p>
            using a desktop computer is recommended. loading a new token to render does not work inside the metamask mobile app browser.
          </p>
          <p>
            vibes tokenIds range from 1 to 7777.
          </p>
          <p>
            open vibes tokenIds range from 7778 to 9999.
          </p>
          <form onSubmit={render} className={renderStyles.render_form}>
            <p>
              <label htmlFor="tokenId">tokenId (1 - {totalSupplyVibes}) or (7778 - {7777 + +totalSupplyOpenVibes}):</label>
            </p>
            <p>
              <input id="tokenId" name="tokenId" type="number" min="1" max="9999" defaultValue="1" required />
            </p>
            <p>
              <button type="submit">load token</button>
            </p>
          </form>

          <div>
            <iframe className={renderStyles.iframe}></iframe>
          </div>
        </div>
      </div>
    </Layout>
  )
}
