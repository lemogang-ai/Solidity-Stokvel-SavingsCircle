//we need the provider for connecting to the ethereum network
//we need the Signeruser who will sign transactions 
//The contract instance , combines address to  abi to signer 

const contractAddress = "0x0F4e1eC26e39D3D1fB7c497bd13Dd1d1BF9d1BD6"
const contractABI =[
    {
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_maxMembers",
				"type": "uint256"
			}
		],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"inputs": [],
		"name": "Contribution_amount",
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
				"name": "",
				"type": "address"
			}
		],
		"name": "addressToContributor",
		"outputs": [
			{
				"internalType": "bool",
				"name": "isMemberActive",
				"type": "bool"
			},
			{
				"internalType": "bool",
				"name": "didMemberPay",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "bucketAmount",
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
		"inputs": [],
		"name": "contribute",
		"outputs": [],
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "joinCircle",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "maxMembers",
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
				"name": "",
				"type": "uint256"
			}
		],
		"name": "members",
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
		"name": "nextReceiverIndex",
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
		"inputs": [],
		"name": "payOutAmount",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
]
let stokvelContract;
let signer;

async function init() {
    if (typeof window.ethereum !== "undefined"){
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        
		stokvelContract = new ethers.Contract(contractAddress, contractABI, provider);
        
		try{
		
			//Call your Solidity function 'bucketAmount'
			const balance = await stokvelContract.bucketAmount();

			const ethBalance = ethers.utils.formatEther(balance);
            
            // Display it on the screen
            document.getElementById("poolBalance").innerText = ethBalance;
            
            console.log("Pool Balance Fetched:", ethBalance);
		} catch (err){
		console.error("Error fetching balance;", err);
		}
    } else {
        alert("Please install MetaMask to use this Stokvel!");
    }
    
}

init();

const connectButton = document.getElementById("connectButton");
const walletAddressDisplay = document.getElementById("walletAddress");

async function connectWallet() {
    try {
        // 1. Request account access from MetaMask
        const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
        const walletAddress = accounts[0];

        // 2. Set up the Signer
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        signer = provider.getSigner();

        // 3. Re-initialize the contract with the Signer (so we can send transactions)
        stokvelContract = new ethers.Contract(contractAddress, contractABI, signer);

        // 4. Update the UI
        walletAddressDisplay.innerText = `Connected: ${walletAddress}`;
        connectButton.innerText = "Connected ";
        
        console.log("Signer ready:", walletAddress);
    } catch (error) {
        console.error("User denied account access", error);
    }
}

// Attach the function to your button
connectButton.onclick = connectWallet;