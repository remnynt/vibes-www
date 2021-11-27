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
          <h3>render any vibe at any size</h3>
          <p>
            this page renders any vibe from on-chain data, using the <a href="https://etherscan.io/address/0x6c7c97caff156473f6c9836522ae6e1d6448abe7#code#L1579" target="_blank" rel="noopener noreferrer">tokenScript</a> method of the vibes contracts.
          </p>
          <p>
            the initial image is a quick preview. for a high quality render, use the built-in controls below the art. this may take a few minutes. once complete, right-click-save.
          </p>
          <p>
            use a desktop computer for best results. drag your browser tab to the side to avoid pausing the render.
          </p>
        </div>

        <div className={renderStyles.render_item}>
          <h3>enter your vibe number</h3>
          <ul>
            <li key="1">[genesis] vibes #1 - #{totalSupplyVibes}</li>
            <li key="2">[open] vibes #7778 - #{7777 + +totalSupplyOpenVibes}</li>
          </ul>

          <form onSubmit={render} className={renderStyles.render_form}>
            <p>
              <label htmlFor="tokenId">vibe #:</label>
            </p>
            <p>
              <input id="tokenId" name="tokenId" type="number" min="1" max="9999" defaultValue="1" required />
            </p>
            <p>
              <button type="submit">load token</button>
            </p>
          </form>
        </div>

        <div>
          <iframe className={renderStyles.iframe}></iframe>
        </div>

        <div className={renderStyles.render_item}>
          <h3>recommended sizes</h3>
          <p>
            use the largest dimension when trying to fit a rectangle.
          </p>
          <ul>
            <li key="1">default: 600px</li>
            <li key="2">twitter banner: 1500px</li>
            <li key="3">opensea banner: 3600px</li>
            <li key="4">desktop / phone bg: match screen resolution</li>
            <li key="5">physical print: 3000px & add 300px border (12" @ 300 dpi)</li>
          </ul>
        </div>
      </div>
    </Layout>
  )
}
