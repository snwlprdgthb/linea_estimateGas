# Gas Estimation Script

This Node.js script estimates gas costs for transactions on the Linea network using an RPC provider from Infura.

## Installation

1. Clone the repository: `git clone https://github.com/snwlprdgthb/linea_estimateGas.git` and navigate to the directory: `cd linea_estimateGas`.
2. Install dependencies: `npm install`.

## Configuration

Create a `.env` file in the root directory with the following content: `LINEA_INFURA_RPC_URL=your_infura_rpc_url`, replacing `your_infura_rpc_url` with your actual Infura RPC URL.

## Usage

Run the script using `node script.js`. It connects to the Linea network via Infura RPC, estimates the gas required for a transaction, and prints the estimated gas values in decimal format.
