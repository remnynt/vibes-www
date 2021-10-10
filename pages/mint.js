import Head from 'next/head';
import Layout from '/components/layout';
import mintStyles from '/styles/mint.module.css';
import utilStyles from '/styles/utils.module.css';
import React, { useState, useEffect } from 'react';

const Web3 = require('web3');
const CONTRACT_ADDRESS = "0x6c7C97CaFf156473F6C9836522AE6e1d6448Abe7";
const ABI = [
  {
    "inputs": [],
    "stateMutability": "nonpayable",
    "type": "constructor"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "owner",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "approved",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "uint256",
        "name": "tokenId",
        "type": "uint256"
      }
    ],
    "name": "Approval",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "owner",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "operator",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "bool",
        "name": "approved",
        "type": "bool"
      }
    ],
    "name": "ApprovalForAll",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "previousOwner",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "newOwner",
        "type": "address"
      }
    ],
    "name": "OwnershipTransferred",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "from",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "to",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "uint256",
        "name": "tokenId",
        "type": "uint256"
      }
    ],
    "name": "Transfer",
    "type": "event"
  },
  {
    "inputs": [],
    "name": "MINT_COST",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "to",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "tokenId",
        "type": "uint256"
      }
    ],
    "name": "approve",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "owner",
        "type": "address"
      }
    ],
    "name": "balanceOf",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "tokenId",
        "type": "uint256"
      }
    ],
    "name": "getApproved",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "tokenId",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "lookupIndex",
        "type": "uint256"
      }
    ],
    "name": "getColorByIndex",
    "outputs": [
      {
        "internalType": "string",
        "name": "",
        "type": "string"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "owner",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "operator",
        "type": "address"
      }
    ],
    "name": "isApprovedForAll",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "mintCount",
        "type": "uint256"
      }
    ],
    "name": "mintVibes",
    "outputs": [],
    "stateMutability": "payable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "mintingActive",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "name",
    "outputs": [
      {
        "internalType": "string",
        "name": "",
        "type": "string"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "owner",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "tokenId",
        "type": "uint256"
      }
    ],
    "name": "ownerOf",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "renounceOwnership",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "reserveCount",
        "type": "uint256"
      }
    ],
    "name": "reserveVibes",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "value",
        "type": "uint256"
      }
    ],
    "name": "royaltyInfo",
    "outputs": [
      {
        "internalType": "address",
        "name": "receiver",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "royaltyAmount",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "from",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "to",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "tokenId",
        "type": "uint256"
      }
    ],
    "name": "safeTransferFrom",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "from",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "to",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "tokenId",
        "type": "uint256"
      },
      {
        "internalType": "bytes",
        "name": "_data",
        "type": "bytes"
      }
    ],
    "name": "safeTransferFrom",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "operator",
        "type": "address"
      },
      {
        "internalType": "bool",
        "name": "approved",
        "type": "bool"
      }
    ],
    "name": "setApprovalForAll",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "string",
        "name": "uri",
        "type": "string"
      }
    ],
    "name": "setVibeURI",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "bytes4",
        "name": "interfaceId",
        "type": "bytes4"
      }
    ],
    "name": "supportsInterface",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "symbol",
    "outputs": [
      {
        "internalType": "string",
        "name": "",
        "type": "string"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "toggleAnimation",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "toggleOnChainAnimation",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "index",
        "type": "uint256"
      }
    ],
    "name": "tokenByIndex",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "owner",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "index",
        "type": "uint256"
      }
    ],
    "name": "tokenOfOwnerByIndex",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "tokenId",
        "type": "uint256"
      }
    ],
    "name": "tokenScript",
    "outputs": [
      {
        "internalType": "string",
        "name": "",
        "type": "string"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "tokenId",
        "type": "uint256"
      }
    ],
    "name": "tokenURI",
    "outputs": [
      {
        "internalType": "string",
        "name": "",
        "type": "string"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "totalSupply",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "from",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "to",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "tokenId",
        "type": "uint256"
      }
    ],
    "name": "transferFrom",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "newOwner",
        "type": "address"
      }
    ],
    "name": "transferOwnership",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "useAnimation",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "useOnChainAnimation",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "vibeCheck",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "withdraw",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  }
];

export default function Mint() {
  const [web3, setWeb3] = useState(null);
  const [address, setAddress] = useState(null);
  const [contract, setContract] = useState(null);
  let [totalSupply, setTotalSupply] = useState(0);

  totalSupply = totalSupply || 77;

  useEffect(() => {
    if (window.ethereum) {
      let w3 = new Web3(ethereum);
      connect(w3);

      ethereum.request({ method: "eth_requestAccounts" })
        .then((accounts) => {
          setAddress(accounts[0]);
        })
        .catch((err) => console.log(err));
    } else {
      let w3 = new Web3(new Web3.providers.WebsocketProvider("wss://mainnet.infura.io/ws/v3/242a1298e03444be849f048318ba3a9a"));
      connect(w3);

      alert("\n~ minting @ vibes.art ~\n\nno web3 wallet detected.\nplease install metamask.");
    }

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

  function connect(w3) {
    setWeb3(w3);

    let c = new w3.eth.Contract(ABI, CONTRACT_ADDRESS);
    setContract(c);

    c.methods.totalSupply().call()
      .then((_supply) => {
        setTotalSupply(_supply);
      })
      .catch((err) => console.log(err));
  };

  function render(event) {
    event.preventDefault();

    let tokenId = event.target.tokenId.value;
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

  function mint(event) {
    event.preventDefault();

    let count = event.target.count.value;
    let ethTotal = count * 0.07;
    let price = web3.utils.toWei("" + ethTotal);
    let encoded = contract.methods.mintVibes(count).encodeABI();

    let tx = {
      from: address,
      to: CONTRACT_ADDRESS,
      data: encoded,
      nonce: 0,
      value: web3.utils.numberToHex(price)
    };

    let txHash = ethereum.request({ method: 'eth_sendTransaction', params: [tx] })
      .then((hash) => {
        setTimeout(() => {
          alert("success! tx hash: " + hash);
        }, 500);
      })
      .catch((err) => {
        alert("\n~ minting @ vibes.art ~\n\nerror:\n" + err.message);
      });

    return txHash
  }

  return (
    <Layout>
      <Head>
        <title>mint</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <section className={utilStyles.headingSub}>
        <p>mint</p>
      </section>

      <section className={utilStyles.headingSubsub}>
        <p>opens 10/15 5pm PDT</p>
      </section>

      <div className={mintStyles.mint}>
        <div className={mintStyles.mint_item}>
          <h3>remaining vibes</h3>
          <p>{7777 - totalSupply} / 7777</p>
          <h3>mint vibes</h3>
          <form onSubmit={mint} className={mintStyles.mint_form}>
            <p>
              <label htmlFor="count">mint count (1 - 7):</label>
            </p>
            <p>
              <input id="count" name="count" type="number" min="1" max="7" defaultValue="1" required />
            </p>
            <p>
              <button type="submit">mint</button>
            </p>
          </form>
          <h3>notes</h3>
          <p>
            mint price is 0.07Ξ + gas
          </p>
          <p>
            if there is an error with the mint transaction, like if you mint before the launch date, or after vibes has sold out, metamask may display max gas fees by default. this is an indicator that your transaction will fail.
          </p>
          <p>
            this page was tested with the metamask chrome plugin and the metamask mobile app browser. minting works from within the app's browser, but the token rendering below does not.
          </p>
          <p>
            you can also mint directly from the contract on{" "}
            <a href="https://etherscan.io/address/0x6c7c97caff156473f6c9836522ae6e1d6448abe7#writeContract" target="_blank" rel="noopener noreferrer">
              etherscan
            </a>.
          </p>
          <h3>render vibes</h3>
          <p>
            you can use this section to render any token that's been minted. after minting, it may take time before your vibe is rendered on marketplaces. this script is pulled directly from the blockchain, so it's the quickest way to reveal your mints and get any image size and quality you want. if your token is not in the valid range, try refreshing the page.
          </p>
          <p>
            the initial image that appears will be slightly jagged. to see the full high quality image, click the render button with downsampling enabled. this may take a few minutes - look for the green loading bar. once the render is complete, feel free to right-click + save.
          </p>
          <p>
            using a desktop computer is recommended. loading a new token to render does not work inside the metamask mobile app browser, but is confirmed working in others.
          </p>
          <form onSubmit={render} className={mintStyles.render_form}>
            <p>
              <label htmlFor="tokenId">tokenId (1 - {totalSupply}):</label>
            </p>
            <p>
              <input id="tokenId" name="tokenId" type="number" min="1" max={totalSupply} defaultValue="1" required />
            </p>
            <p>
              <button type="submit">load token</button>
            </p>
          </form>

          <div>
            <iframe className={mintStyles.iframe}></iframe>
          </div>
        </div>
      </div>
    </Layout>
  )
}
