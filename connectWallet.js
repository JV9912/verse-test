const connectButton = document.querySelector("#connectButton");

let isConnected = false;
let connectedAccount = ""; // To store the connected account

const connectWallet = async () => {
    if (typeof window !== "undefined" && typeof window.ethereum !== "undefined") {
        try {
            const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
            connectedAccount = accounts[0];
            connectButton.innerHTML = `0x...${connectedAccount[39]}${connectedAccount[40]}${connectedAccount[41]}`;
            isConnected = true;
        } catch (err) {
            console.log(err.message);
        }
    } else {
        alert("Please install MetaMask");
    }
}

const disconnectWallet = () => {
    isConnected = false;
    connectedAccount = "";
    connectButton.innerHTML = "Connect";
}

connectButton.addEventListener('click', () => {
    if (!isConnected) {
        connectWallet();
    } else {
        disconnectWallet();
    }
});
