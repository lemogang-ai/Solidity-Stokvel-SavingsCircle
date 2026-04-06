# 🇿🇦 Solidity Savings Circle (Digital Stokvel)

A decentralized, autonomous implementation of the traditional South African **Stokvel**. This smart contract replaces the need for a central treasurer by using a transparent, code-governed rotation system on the Ethereum blockchain.

## 🚀 Overview
In a traditional Stokvel, members contribute a fixed amount monthly, and the total pool is paid out to one member in rotation. This project digitizes that trust, ensuring:
* **No Central Authority:** The contract—not a person—holds and distributes the funds.
* **Autonomous Payouts:** A payout is automatically triggered the moment the final contribution is received.
* **Immutable Accounting:** Every contribution and payout is recorded on the Sepolia Testnet.

---

## 🛠 Technical Architecture

### 🛡 Security: Checks-Effects-Interactions
To protect user funds, this contract follows the **CEI pattern** to prevent **Reentrancy Attacks**. 
1. **Checks:** Verifies membership and payment status.
2. **Effects:** Updates the internal ledger (`bucketAmount` and `didMemberPay`) before moving any money.
3. **Interactions:** Performs the external ETH transfer only after all internal states are secured.

### Key Components
* **Structs & Mappings:** Efficiently manages member metadata and active status.
* **Automatic Indexing:** A circular queue system (`nextReceiverIndex`) ensures the payout rotation resets once the circle is complete.
* **Payable Functions:** Handles real-time Ether transactions directly through the EVM.

---

## 📖 How It Works

1. **Initialization:** The contract is deployed with a set `maxMembers` limit (e.g., 5 members).
2. **Joining:** Users call `joinCircle()` to register their wallet address.
3. **Contributing:** Members send exactly **0.001 ETH** via the `contribute()` function.
4. **The Payout:** Once the `bucketAmount` matches the `payOutAmount`, the contract identifies the "winner" and pushes the entire balance to their wallet.
5. **Reset:** The contract automatically resets the "Paid" status for all members, moving the rotation to the next person for the following month.

---

## 💻 Deployment Details
* **Network:** Sepolia Testnet
* **Solidity Version:** 0.8.18
* **Contract Address:** 0x0F4e1eC26e39D3D1fB7c497bd13Dd1d1BF9d1BD6
* **Etherscan Link:** https://sepolia.etherscan.io/address/0x0F4e1eC26e39D3D1fB7c497bd13Dd1d1BF9d1BD6#code

---

## 🧪 Testing in Remix
1. Set environment to **Injected Provider - MetaMask** (Sepolia).
2. Deploy with `_maxMembers` set to `2`.
3. Use two different accounts to `joinCircle`.
4. From each account, send **1 Finney** (0.001 ETH) using the `contribute` button.
5. Verify that Account #1 receives the total 0.002 ETH automatically.

---

### 👨‍💻 Author
**Lemogang Ntlhaile**
* **LinkedIn:** https://www.linkedin.com/in/lemogang-ntlhaile-78205a169/
