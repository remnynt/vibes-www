import Head from 'next/head';
import Layout from '/components/layout';
import mintStyles from '/styles/mint.module.css';
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

export default function Mint() {
  let [web3, setWeb3] = useState(null);
  let [address, setAddress] = useState(null);
  let [contractVibes, setContractVibes] = useState(null);
  let [contractOpenVibes, setContractOpenVibes] = useState(null);
  let [totalSupplyVibes, setTotalSupplyVibes] = useState(0);
  let [totalSupplyOpenVibes, setTotalSupplyOpenVibes] = useState(0);
  let [mintingActiveVibes, setMintingActiveVibes] = useState(false);
  let [mintingActiveOpenVibes, setMintingActiveOpenVibes] = useState(false);

  totalSupplyVibes = totalSupplyVibes || 77;
  totalSupplyOpenVibes = totalSupplyOpenVibes || 1;

  useEffect(() => {
    if (window.ethereum) {
      web3 = new Web3(ethereum);
    } else {
      web3 = new Web3(new Web3.providers.WebsocketProvider(WEB3_PROVIDER));
    }

    setWeb3(web3);
    loadContract(ABI_VIBES, CONTRACT_ADDRESS_VIBES, setContractVibes, setTotalSupplyVibes, setMintingActiveVibes);
    loadContract(ABI_OPEN_VIBES, CONTRACT_ADDRESS_OPEN_VIBES, setContractOpenVibes, setTotalSupplyOpenVibes, setMintingActiveOpenVibes);
  }, []);

  function loadContract (abi, address, setContract, setTotalSupply, setMintingActive) {
    const contract = new web3.eth.Contract(abi, address);
    setContract(contract);

    contract.methods.totalSupply().call()
      .then(supply => setTotalSupply(supply))
      .catch(err => console.log(err));

    contract.methods.mintingActive().call()
      .then(mintingActive => setMintingActive(mintingActive))
      .catch(err => console.log(err));
  };

  function mint (count, eth, contract, contractAddress) {
    let ethTotal = count * eth;
    let price = web3.utils.toWei("" + ethTotal);
    let encoded;

    if (count) {
      encoded = contract.methods.mintVibes(count).encodeABI();
    } else {
      encoded = contract.methods.mintVibes().encodeABI();
    }

    let tx = {
      from: address,
      to: contractAddress,
      data: encoded,
      nonce: 0,
      value: web3.utils.numberToHex(price)
    };

    ethereum.request({ method: 'eth_sendTransaction', params: [tx] })
      .then((hash) => {
        setTimeout(() => { alert("success! tx hash: " + hash); }, 500);
      })
      .catch((err) => { alert("\n~ minting @ vibes.art ~\n\nerror:\n" + err.message); });
  };

  function mintVibes (event) {
    event.preventDefault();
    var count = event.target.count.value || 1;
    prepareMint(() => mint(count, 0.07, contractVibes, CONTRACT_ADDRESS_VIBES));
  };

  function mintOpenVibes (event) {
    event.preventDefault();
    prepareMint(() => mint(0, 0, contractOpenVibes, CONTRACT_ADDRESS_OPEN_VIBES));
  };

  function prepareMint (doMint) {
    if (address) {
      doMint();
    } else if (window.ethereum) {
      ethereum.request({ method: "eth_requestAccounts" })
        .then((accounts) => {
          address = accounts[0];
          setAddress(address);
          doMint();
        })
        .catch((err) => console.log(err));
    } else {
      alert("\n~ minting @ vibes.art ~\n\nno web3 wallet detected.\nplease install metamask.");
    }
  };

  return (
    <Layout>
      <Head>
        <title>mint</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <section className={utilStyles.headingSub}>
        <p>mint</p>
      </section>

      <div className={mintStyles.mint}>
        <div className={mintStyles.mint_item}>
          <h3>vibes</h3>
          {
            mintingActiveVibes
              ? <h4enabled>[minting open]</h4enabled>
              : <h4disabled>[minting soon]</h4disabled>
          }
          <ul>
            <li key="1">remaining: {7777 - totalSupplyVibes} / 7777</li>
            <li key="2">bonus: 1 signed physical print</li>
            <li key="3">price: 0.07Ξ + gas</li>
          </ul>
          <form onSubmit={mintVibes} className={mintStyles.mint_form}>
            <p>
              <label htmlFor="count">mint count: (1 - 7)</label>
            </p>
            <p>
              <input id="count" name="count" type="number" min="1" max="7" defaultValue="1" required />
            </p>
            <p>
              <button type="submit">mint</button>
            </p>
          </form>
        </div>

        <div className={mintStyles.mint_item}>
          <h3>open vibes</h3>
          {
            mintingActiveOpenVibes
              ? <h4enabled>[minting open]</h4enabled>
              : <h4disabled>[minting soon]</h4disabled>
          }
          <ul>
            <li key="1">remaining: {2222 - totalSupplyOpenVibes} / 2222</li>
            <li key="2">limit: 1 per wallet</li>
            <li key="3">price: free + gas</li>
          </ul>
          <form onSubmit={mintOpenVibes} className={mintStyles.mint_form}>
            <p>
              <label>mint count: 1</label>
            </p>
            <p>
              <button type="submit">mint</button>
            </p>
          </form>
        </div>

        <div className={mintStyles.mint_item}>
          <h3>notes</h3>
          <p>
            if there is an error with the mint transaction, metamask may display max gas fees. this is an indicator that your transaction will fail, and you may need more funds in your wallet. this page was tested with the metamask chrome plugin and the metamask mobile app browser.
          </p>
        </div>

      </div>
    </Layout>
  )
}
