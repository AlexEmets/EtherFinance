use web3::contract::{Contract, Options};
use web3::transports::Http;
use web3::types::{Address, U256, H256, U64};
use web3::Web3;
use std::str::FromStr;
use tokio::runtime::Runtime;
use std::error::Error;

const WEB_URL:&str = "https://sepolia.infura.io/v3/5baff4d94a624341b63eca02b95a2b1c";

struct CounterContract {
    node_provider_url: String,
}

impl CounterContract {

    pub fn new(self, web_url: &str) -> Self {
        CounterContract{node_provider_url: web_url.to_string()}
    }

    pub async fn get_counter(&self, contract_address: &str) -> Result<U256, Box<dyn std::error::Error>> {
        let http = Http::new(&self.node_provider_url)?;
        let web3 = web3::Web3::new(http);
        
        let abi = include_bytes!("/home/oleksandryemets/Documents/Studying/EtherFinance/ether_finance_contracts/ABIs/Counter.json");
        let contract_address = Address::from_str(contract_address)?;
        let contract = Contract::from_json(web3.eth(), contract_address, abi)?;

        let count: U256 = contract.query("getCount", (), None, Options::default(), None).await?;
        Ok(count)
    }

    pub async fn increment_counter(&self, contract_address: &str) -> Result<H256, Box<dyn std::error::Error>> {
        let http = Http::new(&self.node_provider_url)?;
        let web3 = web3::Web3::new(http);
        
        let abi = include_bytes!("/home/oleksandryemets/Documents/Studying/EtherFinance/ether_finance_contracts/ABIs/Counter.json");
        let contract_address = Address::from_str(contract_address)?;
        let contract = Contract::from_json(web3.eth(), contract_address, abi)?;
        
        let options = Options::default();
        let confirmations = 3; 

        let receipt = contract.signed_call_with_confirmations("increment", (), options,  confirmations, &self.private_key,).await?;
        
        if receipt.status == Some(U64::from(1)) {
            Ok(receipt.transaction_hash)
        } else {
            Err("Transaction failed".into())
        }
    }
}