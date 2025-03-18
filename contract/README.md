# Twitter Engagement Secret Contract

This is a Secret Network smart contract that handles private storage and retrieval of Twitter engagement metrics.

## Features

- Store encrypted engagement data for Twitter users
- Privacy-preserving access to engagement metrics using viewing keys
- Secure storage of engagement points, tweet IDs, and engagement types

## Prerequisites

- Rust and Cargo
- [Secret Network development tools](https://docs.scrt.network/secret-network-documentation/development/getting-started)
- [Docker](https://docs.docker.com/get-docker/) (optional, for easier build process)

## Build Instructions

### Using Docker (Recommended)

```bash
# Clone the Secret Network contract optimizer
git clone https://github.com/scrtlabs/secret-contract-optimizer.git

# Move to the optimizer directory
cd secret-contract-optimizer

# Build the contract (assuming you're in the contract directory)
docker run --rm -v $(pwd):/contract \
  --mount type=volume,source="$(basename "$(pwd)")_cache",target=/code/target \
  --mount type=volume,source=registry_cache,target=/usr/local/cargo/registry \
  enigmampc/secret-contract-optimizer
```

### Using Cargo directly

```bash
# Build the contract optimized for production
cargo build --release --target wasm32-unknown-unknown

# Create the optimized WebAssembly file
wasm-opt -Oz ./target/wasm32-unknown-unknown/release/twitter_engagement_contract.wasm -o ./contract.wasm
```

## Deployment

1. Install secretcli:

```bash
# Install the Secret Network CLI
curl -sSL https://raw.githubusercontent.com/scrtlabs/SecretNetwork/master/scripts/install-cli.sh | bash
```

2. Configure secretcli:

```bash
# Configure the CLI
secretcli config chain-id secret-4
secretcli config node https://lcd.secret.express
secretcli config output json
```

3. Store and instantiate the contract:

```bash
# Store the contract code on chain
CODE_ID=$(secretcli tx compute store ./contract.wasm --from mykey --gas 5000000 -y --output json | jq -r '.logs[0].events[0].attributes[] | select(.key=="code_id").value')

# Instantiate the contract
secretcli tx compute instantiate $CODE_ID '{}' --from mykey --label "twitter-engagement" -y
```

4. Get the contract address:

```bash
# Get the contract address
CONTRACT_ADDRESS=$(secretcli query compute list-contract-by-code $CODE_ID --output json | jq -r '.contract_infos[0].address')
```

## Contract Usage

### Store Engagement Data

```bash
secretcli tx compute execute $CONTRACT_ADDRESS '{
  "store_engagement": {
    "user_id": "twitter_user_123",
    "tweet_id": "1234567890",
    "points": 10,
    "engagement_type": "like"
  }
}' --from mykey
```

### Create a Viewing Key

```bash
# Generate a viewing key for your account
secretcli tx compute execute $CONTRACT_ADDRESS '{
  "create_viewing_key": {
    "entropy": "some random string"
  }
}' --from mykey
```

### Query Engagement Data

```bash
# Query using your viewing key
secretcli query compute query $CONTRACT_ADDRESS '{
  "get_user_engagement": {
    "user_id": "twitter_user_123",
    "viewing_key": "YOUR_VIEWING_KEY"
  }
}'
```

## Integration with Frontend

In the frontend, use the `secretjs` library to interact with this contract. Make sure to:

1. Connect to the Secret Network using Keplr wallet
2. Generate a viewing key to access encrypted data
3. Store engagement metrics when users interact with tweets
4. Retrieve and display private engagement data only to authenticated users
