import { mnemonicToSeedSync } from "bip39";
import { generateMnemonic } from "bip39";
import HDNode from "hdkey";
import Web3 from "web3";
import "dotenv/config";

type walletType = {
  address: string;
  privateKey: string;
};

export class wallet {
  constructor() {}

  public generateMasterWallet(): HDNode {
    const mnemonic = generateMnemonic();
    return HDNode.fromMasterSeed(
      mnemonicToSeedSync(
        process.env.SEED_PHRASE ? process.env.SEED_PHRASE : mnemonic
      )
    );
  }

  public generateChildWallet(master: HDNode, index: number): walletType {
    const web3 = new Web3();
    const child = master.derive(`m/44'/60'/0'/0/${index}`);

    let data: walletType = web3.eth.accounts.privateKeyToAccount(
      child.privateKey
    );

    return {
      address: data.address,
      privateKey: data.privateKey,
    };
  }
}
