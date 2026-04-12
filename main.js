//we need the provider for connecting to the ethereum network
//we need the Signeruser who will sign transactions 
//The contract instance , combines address to  abi to signer 

const contractAddress = "Paste deployed address here"
let stokvelContract;
let signer;

async function init() {
    if (typeof window.ethereum !== "undefined"){
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        
        console.log("Ethers.js is ready!");
    } else {
        alert("Please install MetaMask to use this Stokvel!");
    }
    
}