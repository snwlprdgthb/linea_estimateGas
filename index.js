// Print the estimated gas values in decimal format
const { ethers, Hex, toBigInt } = require("ethers");
// Load environment variables from the .env file (LINEA_INFURA_RPC_URL)
require("dotenv").config();

// Function to convert hexadecimal values to decimal and print them in console

function printInDecimal(obj) {
  const baseFeePerGasDecimal = toBigInt(obj.baseFeePerGas).toString(); // Convert baseFeePerGas from hex to BigInt
  const gasLimitDecimal = toBigInt(obj.gasLimit).toString(); // Convert gasLimit from hex to BigInt
  const priorityFeePerGasDecimal = toBigInt(obj.priorityFeePerGas).toString(); // Convert priorityFeePerGas from hex to BigInt

  // Print the decimal values to the console
  console.log(`Base Fee Per Gas (decimal): ${baseFeePerGasDecimal}`);
  console.log(`Gas Limit (decimal): ${gasLimitDecimal}`);
  console.log(`Priority Fee Per Gas (decimal): ${priorityFeePerGasDecimal}`);
}

// Asynchronous function to estimate gas cost

async function checkEstimateGas() {
  try {
    // Create a provider to connect to the Linea network via Infura endpoint
    const provider = new ethers.JsonRpcProvider(
      process.env.LINEA_INFURA_RPC_URL
    );

    // Send a request to get the client version (checks the connection)
    const clientVersion = await provider.send("web3_clientVersion", []);
    console.log(`Connected to ${clientVersion}`);

    // The `options` object defines the transaction parameters for the gas estimation.
    // It includes the sender's address (`from`), recipient's address (`to`), the amount of Ether to send (`value`),
    // and optionally, encoded data for interacting with smart contracts (`data`). This object is used by the
    // `linea_estimateGas` method to simulate the transaction and estimate the gas required.
    const options = {
      from: "0x4CE89b748ec2Df9e5e138e4754936A526E9e4a29", // Signer address
      to: "0x1bc6d95F5a30CBbB14a724F749822eCD7AaBfC85", // Recipient address
      value: ethers.parseEther("0.0000000000001").toString(), // Value in wei
      data: "", // Encoded call in case of smart contract interaction
    };

    // Sends a JSON-RPC request to the Linea (Infura Provider) node to estimate the gas required for the transaction.
    // The method `linea_estimateGas` simulates the transaction with the provided options and returns
    // an estimate of the gas needed to complete and publish the transaction on the Linea network.
    // This call does not execute the transaction or modify the blockchain; it only provides an estimation
    // of the necessary gas. The `options` object includes the transaction details such as the sender's
    // address, recipient's address, amount of Ether to send, and optional data for smart contract interaction.
    // The response, stored in `LineaEstimateGasResponse`, contains the estimated gas values that can be used
    // to set the `gas` parameter for the actual transaction submission to ensure it has enough gas to be processed.
    const LineaEstimateGasResponse = await provider.send("linea_estimateGas", [
      options,
    ]);

    // Print the estimated gas values in decimal format
    printInDecimal(LineaEstimateGasResponse);
  } catch (error) {
    // Handle and print any errors that occur during the gas estimation
    console.error(`Error estimating gas: ${error.message}`);
  }
}

// Call the function to perform the gas estimation
checkEstimateGas();
