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
        
		console.log("contract intializing")

		try{
		
			//Call your Solidity function 'bucketAmount'
			const balance = await stokvelContract.bucketAmount();
			const ethBalance = ethers.utils.formatEther(balance);
            document.getElementById("poolBalance").innerText = ethBalance;
            
            console.log("Pool Balance Fetched:", ethBalance);
		} catch (readError){
			console.error("Error fetching balance;", readError);
			if(document.getElementById("poolBalance")){
			document.getElementById("pool balance").innerT ="Error loading";

			}
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

const depositButton = document.getElementById("depositButton");
const depositAmountInput = document.getElementById("depositAmount");

async function contribute() {
    try {
        const amount = depositAmountInput.value;
        if (!amount) return alert("Please enter an amount!");

        console.log(`Attempting to deposit ${amount} ETH...`);

        // 1. Convert the input amount to "Wei" (the unit the blockchain uses)
        const amountInWei = ethers.utils.parseEther(amount);

        // 2. Call the 'contribute' function from your Solidity contract

        const tx = await stokvelContract.contribute({ value: amountInWei });

        console.log("Transaction sent! Waiting for confirmation...", tx.hash);
        depositButton.innerText = "Processing...";

        // 3. Wait for the block to be mined
        await tx.wait();

        console.log("Transaction confirmed!");
        depositButton.innerText = "Deposit Successful ";
        
        // Refresh the balance on the screen
        init(); 
        
    } catch (error) {
        console.error("Deposit failed:", error);
        alert("Transaction failed! Check the console.");
        depositButton.innerText = "Deposit to Pool";
    }
}

depositButton.onclick = contribute;

const joinButton = document.getElementById("joinButton");

async function joinCircle() {
    try {
        console.log("Attempting to join the circle...");
        
        // Call the joinCircle function from your Solidity ABI
        const tx = await stokvelContract.joinCircle();
        
        joinButton.innerText = "Joining...";
        console.log("Transaction sent! Hash:", tx.hash);

        await tx.wait(); // Wait for the blockchain to confirm

        joinButton.innerText = "Joined ✅";
        console.log("You are now a member!");
        alert("Welcome to the Stokvel! Now you can deposit.");
        
    } catch (error) {
        console.error("Join failed:", error);
        alert("Failed to join. Check if you are already a member.");
    }
}

joinButton.onclick = joinCircle;