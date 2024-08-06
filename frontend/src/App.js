import React, { useEffect, useState } from 'react';
import { ethers } from "ethers";

function App() {
  const [provider, setProvider] = useState(null);
  const [signer, setSigner] = useState(null);
  const [address, setAddress] = useState('');
  const [balance, setBalance] = useState('');

  useEffect(() => {
    const initProvider = async () => {
      let signer = null;
      let provider;

      if (window.ethereum) {
        // A Web3Provider wraps a standard Web3 provider, which is
        // what MetaMask injects as window.ethereum into each page
        provider = new ethers.BrowserProvider(window.ethereum);
        setProvider(provider);

        try {
          // await window.ethereum.request({ method: 'eth_requestAccounts' });
          signer = await provider.getSigner();
          setSigner(signer);

          const address = await signer.getAddress();
          setAddress(address);

          const balance = await provider.getBalance(address);
          setBalance(ethers.formatEther(balance));
        } catch (err) {
          console.error(err);
        }
      }
    };

    initProvider();
  }, []);

  const interactWithBackend = async () => {
    const address = "222";
    const url = new URL('/api/get-contract-data', window.location.origin);
    url.searchParams.append('address', address);
  
    console.log("Request URL:", url.toString()); // Виводимо URL запиту в консоль
  
    try {
      const response = await fetch(url.toString(), {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      console.log('Backend response:', data);
    } catch (error) {
      console.error('Error interacting with backend:', error);
    }
  };
  

  return (
    <div className="App">
      <header className="App-header">
        <h1>DeFi Dapp</h1>
        <p>Connected account: {address}</p>
        <p>Balance: {balance} ETH</p>
        <button onClick={interactWithBackend}>Get Contract Data</button>
      </header>
    </div>
  );
}

export default App;
