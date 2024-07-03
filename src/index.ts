import "dotenv/config";
import { wallet } from "./wallet";

function main() {
  let wallets = new wallet();
  if (wallet) console.log("wallet initialization");

  let master = wallets.generateMasterWallet();
  if (master) console.log("master initialization");

  let child = wallets.generateChildWallet(master, 0);

  console.log(
    `Generating wallet Address: ${child.address} Private Key: ${child.privateKey}`
  );
}

main();
