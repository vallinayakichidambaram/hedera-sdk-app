const { ContractExecuteTransaction, AccountId,PrivateKey,Client,Hbar, TransferTransaction,AccountCreateTransaction,AccountBalanceQuery } = require("@hashgraph/sdk");
const { configDotenv } = require("dotenv");

const contractId = '';

async function executeContract() {
    //Set Operator Account
    configDotenv.apply();
    const operatorAccountId = process.env.MY_ACCOUNT_ID;
    const operatorPrivateKey = process.env.MY_PRIVATE_KEY;
    console.log(`Operator Account -- ${operatorAccountId} --- ${operatorPrivateKey}`);
    const client = Client.forTestnet();
    client.setOperator(operatorAccountId,operatorPrivateKey);
    client.setDefaultMaxTransactionFee(new Hbar(100));
    client.setDefaultMaxQueryPayment(new Hbar(50));
    //Create another account - Account 1
    // const account1PrivateKey = PrivateKey.generateECDSA();
    // const account1PublicKey = account1PrivateKey.publicKey;
    
    // const newAccount1 = await new AccountCreateTransaction().setKey(account1PublicKey).setInitialBalance(new Hbar(1000)).execute(client);
    // const receipt1 = await newAccount1.getReceipt(client);
    // const newAccountId = receipt1.accountId;
    // console.log(`New Account Id --- ${newAccountId}`)
    // console.log(`Private Key --- ${account1PrivateKey}`)
    // const newAccBalance = await new AccountBalanceQuery().setAccountId(newAccountId).execute(client);
    // console.log(`New Account Balance --- ${newAccBalance}`)
   
    //Deposit Hbar into liquidity pool from Account 1
    //Connect Account1 to client
    const AccountId1 = AccountId.fromString('');
    const privateKey1 = PrivateKey.fromStringECDSA('');
    const clientNew = Client.forTestnet();
    clientNew.setOperator(AccountId1,privateKey1);

    //Call the depositToPool in Liquidity Pool contract
    const contractId = '';
    const depositExecuteTx =  new ContractExecuteTransaction().setContractId(contractId)
    .setGas(100_000)
    .setFunction("depositToPool")
    .setPayableAmount(100);
    const depositExecuteSubmit = await depositExecuteTx.execute(clientNew);
    const depositReceipt = await depositExecuteSubmit.getReceipt(clientNew)
    //console.log(`${depositReceipt}`)

    //Get the deposit made by Account 1 (client - Account 1)

    //Create another account- Account 2 and deposit Hbar

    //Connect to admin account and see the deposit made by Account 2

    //Get the balance of liquidity pool smart contract from admin account
    
    process.exit();
}

executeContract();