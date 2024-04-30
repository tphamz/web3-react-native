const envs = {
	polygon: {
		name: "POLYGON MAINNET",
		rpc_endpoint: "https://polygon-rpc.com", 
		node_endpoint: "wss://rpc-mainnet.matic.network",
		explorer_endpoint: "https://polygonscan.com",
		chain_id: 137,
		unit: "MATIC"
	},
	mumbai: {
		name: "MUMBAI TESTNET",
		rpc_endpoint: "https://matic-mumbai.chainstacklabs.com", 
		node_endpoint: "wss://rpc-mumbai.matic.today",
		explorer_endpoint: "https://mumbai.polygonscan.com",
		chain_id: 80001,
		unit: "MATIC"
	}
}

export {envs}