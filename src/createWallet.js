// importando as dependencias
const bip32 = require("bip32")
const bip39 = require("bip39")
const bitcoin = require("bitcoinjs-lib")

//definindo a rede
//se quisessemos rodar na rede de bitocoin real ao inves de ".testnet" colocariamos ".bitcoin"
//bitcoin -> rede principal - mainnet
//testnet -> rede de teste - testnet
const network = bitcoin.networks.testnet

//esse gerador fará carteiras hierárquica determinística
//derivacao de endereço de carteiras HD
//'/1': testnet
//'/0': mainnet
const path = `m/49'/1'/0'/0`

//gerando o mnemônico (palavras para seed - senha)
let mnemonic = bip39.generateMnemonic()
const seed = bip39.mnemonicToSeedSync(mnemonic)

//gerando a raiz da carteira deterministica
let root = bip32.fromSeed(seed, network)

//criando uma conta - par pvt-pub keys
let account = root.derivePath(path)

//gerando uma conta no a partir da raiz
let node = account.derive(0).derive(0)


//gerando um endereço (pay to)
let btcAddress = bitcoin.payments.p2pkh({
    pubkey: node.publicKey,
    network: network,
}).address

//essa etapa servirá para escrever os dados gerados pela minha carteira
console.log("Carteira gerada")
console.log("Endereço: " , btcAddress)
console.log("Chave privada: ", node.toWIF())
console.log("Seed: ", mnemonic)