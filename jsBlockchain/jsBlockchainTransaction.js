const SHA256 = require("crypto-js/sha256");

class Transaction{
    constructor(fromAddress, toAddress, amount){
        this.fromAddress = fromAddress;
        this.toAddress = toAddress;
        this.amount = amount;
    }
}

class Block{
    constructor(timestamp, transaction, previousHash = ''){
        this.timestamp = timestamp;
        this.transaction = transaction;
        this.previousHash = previousHash;
        this.Hash = this.calculateHash();
        this.nonce = 0;
    }

    calculateHash(){
            // SHA256 cryptographic function to calculate Hash
        return SHA256(this.timestamp+this.previousHash+JSON.stringify(this.transaction)+this.nonce).toString();
    }

    mineNewBlock(difficulty){
        while(this.Hash.substring(0,difficulty) !== Array(difficulty+1).join("0")){
            this.nonce++;
            this.Hash = this.calculateHash();
        }
            console.log("A new block is mined with hash : " + this.Hash);
    }
}

class Blockchain{
    constructor(){
        this.chain = [this.createGenesisBlock()];
        this.difficulty = 3;
        this.pendingTransaction = [];
        this.miningReward = 10;
    }

    createGenesisBlock(){
        return new Block("28/09/2021" , "This is genesis Block", "0");
    }

    getLatestBlock(){
        return this.chain[this.chain.length-1];
    }

    
    minePendingTransaction(miningRewardAddress){
            let block = new Block(Date.now, this.pendingTransaction, this.getLatestBlock().Hash);
            block.mineNewBlock(this.difficulty);
            console.log("Block Mined Successfully..");

            this.chain.push(block);
            this.pendingTransaction = [
                new Transaction(null, miningRewardAddress, this.miningReward)
            ];
    }

    createTransaction(transaction){
        this.pendingTransaction.push(transaction);
    }

    getBalenceOfAddress(address){
        let balence = 0;

        for(const block of this.chain){
            for(const trans of block.transaction){
                if(trans.fromAddress === address){
                    balence = balence-trans.amount;
                }
                if(trans.toAddress === address){
                    balence = balence+trans.amount;
                }
            }
        }
        return balence;
    }

    checkBlockchainValid(){
        for(var i=1 ; i<this.chain.length; i++){
            let currentBlock = this.chain[i];
            let previousBlock = this.chain[i-1];

            if(currentBlock.Hash !== currentBlock.calculateHash()){
                return false;
            }

            if(currentBlock.previousHash !== previousBlock.Hash){
                return false;
            }
        }
        return true;
    }
}



let myCoin = new Blockchain();

transaction1 = new Transaction("tom", "jerry", 100);
myCoin.createTransaction(transaction1);

transaction2 = new Transaction("jerry", "tom", 40);
myCoin.createTransaction(transaction2);

console.log("Started mining by the miner");
myCoin.minePendingTransaction("donald");

console.log("Balence for Tom is : "+ myCoin.getBalenceOfAddress("tom"));
console.log("Balence for Jerry is : "+ myCoin.getBalenceOfAddress("jerry"));
console.log("Balence for Miner Donald is : "+ myCoin.getBalenceOfAddress("donald"));

console.log("Started mining again by the miner");
myCoin.minePendingTransaction("donald");
console.log("Balence for Miner Donald is : "+ myCoin.getBalenceOfAddress("donald"));

console.log("Started mining again by the miner");
myCoin.minePendingTransaction("donald");
console.log("Balence for Miner Donald is : "+ myCoin.getBalenceOfAddress("donald"));


