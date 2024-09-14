
<div align="center">
  <br>
  <img src="./public/crystal-ball.png" alt="Markdownify" width="120">
  <br>
  <a href="suiseer.walrus.site">
    <h3 align="center">SuiSeer</h3>
  </a>
  <br>
</div>

<p align="center">
  <a href="#about-the-project">About The Project</a> •
  <a href="#features">Features</a> •
  <a href="#getting-started">Getting Started</a> •
  <a href="#usage">Usage</a>
</p>

## About The Project

<h4 align="center">
  SuiSeer is a decentralized application (DApp) that brings the ancient art of tarot card reading to the blockchain. Users can engage in tarot card divination and daily draws, receiving personalized insights to guide their lives. A unique feature allows users to mint their tarot reading results and daily cards as NFTs, preserving their experiences as digital collectibles. Leveraging the power of the SUI blockchain, Mystic Indication ensures fast transactions, secure identity management, and a seamless user experience. Join us on this mystical journey and discover the insights that await you!
</h4>

![screenshot](./public/screenshot.png)

### Built With

![Next.js](https://img.shields.io/badge/next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)

![React.js](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)

![RadixUI](https://img.shields.io/badge/radix%20ui-white?style=for-the-badge&logo=radixui&logoColor=%23161618)

![UnoCss](https://img.shields.io/badge/UnoCss-white?style=for-the-badge&logo=unocss&logoColor=%23333333)


## Features

* Daily tarot card draws
* Tarot card divination readings with personalized insights
* Minting of tarot card readings and daily cards as NFTs
* Community discussion and sharing of tarot card readings
* NFT Gallery to view and manage minted NFTs

## Getting Started

### Prerequisites
- [Sui prerequisites](https://docs.sui.io/build/install#prerequisites) (Sui prerequisites only)
- [Suibase](https://suibase.io/how-to/install.html)
- [Node (>= 20)](https://nodejs.org/en/download/)

### Installation
```bash
git clone https://github.com/Tian-Hun/suiseer.git
cd suiseer
bun install
```

## Usage

#### 1. Run the local Sui network:

```bash
localnet start
```

Local Sui Explorer will be available on [localhost:9001](http://localhost:9001/)

#### 2. Deploy the demo contract to the local network:

```bash
localnet publish --path ${PWD}/move/suiseer
```

#### 3. Switch to the local network in your browser wallet settings.

#### 4. Fund your localnet account/address:

You have a few options here:

a) Use the Faucet button integrated into your wallet (e.g. Sui Wallet).

b) Copy the localnet address from your wallet and run the following in your console:

```bash
localnet faucet 0xYOURADDRESS
```

#### 5. Set up environment variables:

```bash
cp .env.example .env
```

Then open the .env file and set the required variables.

#### 6. Run the app:

```bash
bun dev
```
