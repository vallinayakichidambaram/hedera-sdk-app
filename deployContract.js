
const { Client, AccountCreateTransaction,TransferTransaction, AccountBalanceQuery, Hbar, AccountInfoQuery, FileCreateTransaction, ContractCreateTransaction } = require("@hashgraph/sdk");
const { configDotenv } = require("dotenv");
const  fs  = require("node:fs/promises")
const { path } = require("node:path")


async function deployContract() {
    configDotenv.apply();
    const myAccount = process.env.MY_ACCOUNT_ID;
    const privKey = process.env.MY_PRIVATE_KEY;
    //console.log(`${myAccount} --- ${privKey}`);
    const client = Client.forTestnet();
    client.setOperator(myAccount,privKey);
    client.setDefaultMaxTransactionFee(new Hbar(100));
    client.setDefaultMaxQueryPayment(new Hbar(50));


    //Create a file in Hedera File Service with contract byte code
    const contractByteCode = await fs.readFile('./contracts/LiquidityPool_sol_LiquidityPool.bin', {encoding: 'utf8'});
    //console.log(contractByteCode)

    const contractFileCreate = new FileCreateTransaction().setContents(contractByteCode.toString())
    .setMaxTransactionFee(new Hbar(2))
    .freezeWith(client);
    const contractFileTx = await contractFileCreate.execute(client);
    const contractFileReceipt = await contractFileTx.getReceipt(client);
    const fileId = contractFileReceipt.fileId;
    console.log(`${fileId}`);

    //Create the contract in Hedera using the file
    const contractCreate = new ContractCreateTransaction()
    .setBytecodeFileId(fileId)
    .setMaxTransactionFee(new Hbar(16))
    .setGas(100_000);

    const contractTxReceipt = await contractCreate.execute(client);
    //console.log(`${contractTxReceipt}`);
    const TxReceipt = await contractTxReceipt.getReceipt(client);
    console.log(`${TxReceipt}`);
    const contractId = TxReceipt.contractId;
    console.log(`${contractId}`);

    process.exit();
}

deployContract();  
