import { ethers } from 'ethers';
import CounterABI from '../ABIs/Counter.json'; // Імпортуйте ваш ABI JSON файл

export const connectWallet = async () => {
  if (window.ethereum) {
    const provider = new ethers.BrowserProvider(window.ethereum);
    await provider.send("eth_requestAccounts", []);
    const signer = provider.getSigner();
    return signer;
  } else {
    console.error('No Ethereum provider found');
    return null;
  }
};

export const incrementCounter = async (contractAddress) => {
  const signer = await connectWallet();
  if (!signer) return;

  const contract = new ethers.Contract(contractAddress, CounterABI, signer);

  try {
    const tx = await contract.increment();
    return tx;
  } catch (error) {
    console.error('Error interacting with contract:', error);
  }
};

export const getCounterValue = async (contractAddress) => {
  const signer = await connectWallet();
  if (!signer) return;

  const contract = new ethers.Contract(contractAddress, CounterABI, signer);

  try {
    const value = await contract.getCount();
    return value;
  } catch (error) {
    console.error('Error getting counter value:', error);
  }
};
