import Header from "../src/components/header";
import { ethers } from "ethers";
import { useEffect, useState } from "react";

function Home() {
  const connectMetaMask = async () => {
    // A Web3Provider wraps a standard Web3 provider, which is
    // what MetaMask injects as window.ethereum into each page
    const provider = new ethers.providers.Web3Provider(window.ethereum);

    // MetaMask requires requesting permission to connect users accounts
    await provider
      .send("eth_requestAccounts", [])
      .then((accounts) => {
        console.log(accounts);
        if (accounts.length > 0) setUser(accounts[0]);
      })
      .catch(() => {
        console.log("error");
      });

    // The MetaMask plugin also allows signing transactions to
    // send ether and pay to change state within the blockchain.
    // For this, you need the account signer...
    const signer = await provider.getSigner();
  };
  const [user, setUser] = useState(null);
  const [balance, setBalance] = useState(null);
  const [chainId, setChainId] = useState(null);
  const [netName, setNetName] = useState(null);
  useEffect(() => {
    const getAccountBalance = async (currentAccount) => {
      if (currentAccount == null) return null;
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const balance = await provider.getBalance(currentAccount);
      const network = await provider.getNetwork(currentAccount);
      setBalance(ethers.utils.formatEther(balance));
      setChainId(network.chainId);
      setNetName(network.name);
    };
    getAccountBalance(user);
  }, [user]);

  return (
    <>
      <Header />
      <h1>hello Dapp</h1>
      <div>
        {user == null ? (
          <button
            onClick={() => {
              connectMetaMask();
            }}>
            connect
          </button>
        ) : (
          <button>{user}</button>
        )}
      </div>
      <div>
        <h2>account information</h2>
        <h3>Balance: {balance}</h3>
        <h3>chainId : {chainId}</h3>
        <h3>networkName: {netName}</h3>
      </div>
    </>
  );
}
export default Home;
